import { InsertUser, User, Order, InsertOrder, BankSettings, InsertBankSettings } from "../drizzle/schema";
import bcrypt from "bcryptjs";

/**
 * MOCK DATABASE IMPLEMENTATION
 * This replaces the live MySQL connection with an in-memory store 
 * so the website is fully functional in the preview environment.
 */

const mockStore = {
  users: [] as User[],
  orders: [] as Order[],
  bankSettings: [] as BankSettings[],
};

// Initialize with demo admin
// Bug fix: Ensure the password hash is correctly generated for 'admin19'
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync("admin19", salt);

const demoAdmin: User = {
  id: 1,
  openId: "admin19",
  name: "Admin Demo",
  email: "admin@example.com",
  role: "admin",
  loginMethod: "password",
  passwordHash: passwordHash,
  lastSignedIn: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
mockStore.users.push(demoAdmin);

// Initialize with demo bank settings
const demoBank: BankSettings = {
  id: 1,
  bankName: "Vietcombank",
  accountNumber: "1234567890",
  accountHolder: "NGUYEN VAN A",
  qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DemoPayment",
  isActive: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
mockStore.bankSettings.push(demoBank);

export async function getDb() {
  return true; // Return truthy to indicate "connected"
}

export async function upsertUser(user: InsertUser): Promise<void> {
  const existing = mockStore.users.find(u => u.openId === user.openId);
  if (existing) {
    Object.assign(existing, { ...user, updatedAt: new Date() });
  } else {
    const newUser: User = {
      id: mockStore.users.length + 1,
      openId: user.openId!,
      name: user.name ?? null,
      email: user.email ?? null,
      role: user.role ?? "user",
      loginMethod: user.loginMethod ?? null,
      passwordHash: user.passwordHash ?? null,
      lastSignedIn: user.lastSignedIn ?? new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockStore.users.push(newUser);
  }
}

export async function getUserByOpenId(openId: string) {
  return mockStore.users.find(u => u.openId === openId);
}

export async function createOrder(order: InsertOrder): Promise<Order | null> {
  const newOrder: Order = {
    id: mockStore.orders.length + 1,
    userId: order.userId!,
    productName: order.productName!,
    productDescription: order.productDescription ?? null,
    quantity: order.quantity!,
    price: order.price!,
    totalAmount: order.totalAmount!,
    status: order.status ?? "pending",
    paymentMethod: order.paymentMethod ?? "bank_transfer",
    notes: order.notes ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockStore.orders.push(newOrder);
  return newOrder;
}

export async function getUserOrders(userId: number): Promise<Order[]> {
  return mockStore.orders
    .filter(o => o.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getAllOrders(): Promise<Order[]> {
  return [...mockStore.orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function updateOrderStatus(orderId: number, status: Order["status"]): Promise<boolean> {
  const order = mockStore.orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date();
    return true;
  }
  return false;
}

export async function getBankSettings(): Promise<BankSettings | null> {
  return mockStore.bankSettings.find(s => s.isActive === 1) || null;
}

export async function updateBankSettings(id: number, data: Partial<InsertBankSettings>): Promise<boolean> {
  const settings = mockStore.bankSettings.find(s => s.id === id);
  if (settings) {
    Object.assign(settings, { ...data, updatedAt: new Date() });
    return true;
  }
  return false;
}

export async function createBankSettings(data: InsertBankSettings): Promise<BankSettings | null> {
  const newSettings: BankSettings = {
    id: mockStore.bankSettings.length + 1,
    bankName: data.bankName ?? "",
    accountNumber: data.accountNumber ?? "",
    accountHolder: data.accountHolder ?? "",
    qrCodeUrl: data.qrCodeUrl ?? null,
    isActive: data.isActive ?? 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockStore.bankSettings.push(newSettings);
  return newSettings;
}
