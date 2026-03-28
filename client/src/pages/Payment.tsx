import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Payment() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [orderForm, setOrderForm] = useState({
    productName: "",
    productDescription: "",
    quantity: 1,
    price: 0,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  // Fetch bank settings
  const { data: bankSettings } = trpc.payment.getBankSettings.useQuery();
  const createOrderMutation = trpc.orders.create.useMutation();

  const handleCreateOrder = async () => {
    if (!orderForm.productName || orderForm.price <= 0) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const order = await createOrderMutation.mutateAsync({
        productName: orderForm.productName,
        productDescription: orderForm.productDescription,
        quantity: orderForm.quantity,
        price: orderForm.price * 100, // Convert to cents
      });

      toast.success("Tạo đơn hàng thành công");
      setOrderForm({ productName: "", productDescription: "", quantity: 1, price: 0 });
    } catch (error) {
      toast.error("Lỗi tạo đơn hàng");
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (!user) return null;

  const totalAmount = orderForm.price * orderForm.quantity;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-20">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Thanh toán</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Tạo đơn hàng</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                  <Input
                    value={orderForm.productName}
                    onChange={(e) => setOrderForm({ ...orderForm, productName: e.target.value })}
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mô tả</label>
                  <Input
                    value={orderForm.productDescription}
                    onChange={(e) => setOrderForm({ ...orderForm, productDescription: e.target.value })}
                    placeholder="Mô tả sản phẩm (tùy chọn)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Số lượng</label>
                    <Input
                      type="number"
                      value={orderForm.quantity}
                      onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 })}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Giá (₫)</label>
                    <Input
                      type="number"
                      value={orderForm.price}
                      onChange={(e) => setOrderForm({ ...orderForm, price: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <div className="text-sm text-gray-600">Tổng tiền</div>
                  <div className="text-3xl font-bold">{totalAmount.toLocaleString("vi-VN")} ₫</div>
                </div>
                <Button
                  onClick={handleCreateOrder}
                  disabled={createOrderMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {createOrderMutation.isPending ? "Đang tạo..." : "Tạo đơn hàng"}
                </Button>
              </div>
            </Card>

            {/* Bank Transfer Info */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Chuyển khoản ngân hàng</h2>
              {bankSettings ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Ngân hàng</div>
                    <div className="text-lg font-semibold">{bankSettings.bankName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Số tài khoản</div>
                    <div className="text-lg font-semibold">{bankSettings.accountNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Chủ tài khoản</div>
                    <div className="text-lg font-semibold">{bankSettings.accountHolder}</div>
                  </div>

                  {bankSettings.qrCodeUrl && (
                    <div className="mt-6">
                      <div className="text-sm text-gray-600 mb-2">Mã QR</div>
                      <img
                        src={bankSettings.qrCodeUrl}
                        alt="QR Code"
                        className="w-full max-w-xs border rounded"
                      />
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded text-sm">
                    <p className="text-blue-900">
                      Vui lòng chuyển khoản theo thông tin trên. Sau khi chuyển khoản thành công, đơn hàng của bạn sẽ được xử lý trong vòng 24 giờ.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">Thông tin thanh toán chưa được cấu hình</div>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
