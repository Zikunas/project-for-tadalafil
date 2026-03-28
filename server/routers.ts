import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  orders: router({
    create: protectedProcedure
      .input(z.object({
        productName: z.string(),
        productDescription: z.string().optional(),
        quantity: z.number().int().positive(),
        price: z.number().int().positive(),
      }))
      .mutation(async ({ ctx, input }) => {
        const totalAmount = input.price * input.quantity;
        return await db.createOrder({
          userId: ctx.user.id,
          productName: input.productName,
          productDescription: input.productDescription,
          quantity: input.quantity,
          price: input.price,
          totalAmount,
          status: "pending",
          paymentMethod: "bank_transfer",
        });
      }),
    
    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserOrders(ctx.user.id);
      }),
    
    updateStatus: adminProcedure
      .input(z.object({
        orderId: z.number().int(),
        status: z.enum(["pending", "paid", "processing", "shipped", "delivered", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        return await db.updateOrderStatus(input.orderId, input.status);
      }),
  }),

  payment: router({
    getBankSettings: publicProcedure
      .query(async () => {
        return await db.getBankSettings();
      }),
    
    updateBankSettings: adminProcedure
      .input(z.object({
        bankName: z.string().optional(),
        accountNumber: z.string().optional(),
        accountHolder: z.string().optional(),
        qrCodeUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const settings = await db.getBankSettings();
        if (!settings) {
          return await db.createBankSettings({
            bankName: input.bankName || "Vietcombank",
            accountNumber: input.accountNumber || "",
            accountHolder: input.accountHolder || "",
            qrCodeUrl: input.qrCodeUrl,
            isActive: 1,
          });
        }
        const success = await db.updateBankSettings(settings.id, input);
        return success ? await db.getBankSettings() : null;
      }),
  }),
});

export type AppRouter = typeof appRouter;
