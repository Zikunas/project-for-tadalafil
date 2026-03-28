import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    qrCodeUrl: "",
  });

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/admin-login", { replace: true });
    }
  }, [user, loading, navigate]);

  // Fetch bank settings
  const { data: bankSettings, isLoading: bankLoading } = trpc.payment.getBankSettings.useQuery();
  const updateBankMutation = trpc.payment.updateBankSettings.useMutation();

  // Bug fix: use orders.listAll (admin-scoped, returns ALL orders) instead of orders.list (user-scoped)
  const { data: allOrders = [] } = trpc.orders.listAll.useQuery();
  const updateOrderMutation = trpc.orders.updateStatus.useMutation();

  useEffect(() => {
    if (bankSettings) {
      setBankForm({
        bankName: bankSettings.bankName || "",
        accountNumber: bankSettings.accountNumber || "",
        accountHolder: bankSettings.accountHolder || "",
        qrCodeUrl: bankSettings.qrCodeUrl || "",
      });
    }
  }, [bankSettings]);

  const handleBankUpdate = async () => {
    try {
      await updateBankMutation.mutateAsync(bankForm);
      toast.success("Cập nhật thông tin ngân hàng thành công");
    } catch (error) {
      toast.error("Lỗi cập nhật thông tin ngân hàng");
    }
  };

  const handleOrderStatusChange = async (orderId: number, newStatus: any) => {
    try {
      await updateOrderMutation.mutateAsync({ orderId, status: newStatus });
      toast.success("Cập nhật trạng thái đơn hàng thành công");
    } catch (error) {
      toast.error("Lỗi cập nhật trạng thái");
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (!user || user.role !== "admin") return null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Payment Settings */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Cài đặt thanh toán</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên ngân hàng</label>
              <Input
                value={bankForm.bankName}
                onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                placeholder="Vietcombank"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Số tài khoản</label>
              <Input
                value={bankForm.accountNumber}
                onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                placeholder="1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chủ tài khoản</label>
              <Input
                value={bankForm.accountHolder}
                onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                placeholder="Tên chủ tài khoản"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL QR Code</label>
              <Input
                value={bankForm.qrCodeUrl}
                onChange={(e) => setBankForm({ ...bankForm, qrCodeUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <Button
              onClick={handleBankUpdate}
              disabled={updateBankMutation.isPending}
              className="w-full"
            >
              {updateBankMutation.isPending ? "Đang cập nhật..." : "Lưu thông tin"}
            </Button>
          </div>
        </Card>

        {/* Orders Management */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h2>
          {allOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Chưa có đơn hàng nào</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">ID</th>
                    <th className="text-left py-2">Sản phẩm</th>
                    <th className="text-left py-2">Số lượng</th>
                    <th className="text-left py-2">Giá</th>
                    <th className="text-left py-2">Trạng thái</th>
                    <th className="text-left py-2">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2">{order.id}</td>
                      <td className="py-2">{order.productName}</td>
                      <td className="py-2">{order.quantity}</td>
                      <td className="py-2">{(order.totalAmount / 100).toLocaleString("vi-VN")} ₫</td>
                      <td className="py-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="paid">Đã thanh toán</option>
                          <option value="processing">Đang xử lý</option>
                          <option value="shipped">Đã gửi</option>
                          <option value="delivered">Đã giao</option>
                          <option value="cancelled">Hủy</option>
                        </select>
                      </td>
                      <td className="py-2">
                        <Button size="sm" variant="outline">
                          Chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
