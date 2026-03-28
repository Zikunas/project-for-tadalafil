import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLoginUrl } from "@/const";

export default function Account() {
  const { user, loading, logout } = useAuth();
  const [, navigate] = useLocation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  // Fetch user orders
  const { data: orders = [] } = trpc.orders.list.useQuery();

  const handleLogout = async () => {
    await logout();
    toast.success("Đã đăng xuất");
    navigate("/", { replace: true });
  };

  if (loading) return <div>Đang tải...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-20">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Tài khoản của tôi</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <Card className="p-6 lg:col-span-1">
              <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Tên</div>
                  <div className="text-lg font-semibold">{user.name || "Chưa cập nhật"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="text-lg font-semibold">{user.email || "Chưa cập nhật"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Vai trò</div>
                  <div className="text-lg font-semibold">
                    {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Ngày tham gia</div>
                  <div className="text-lg font-semibold">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  {user.role === "admin" && (
                    <Button
                      onClick={() => navigate("/admin")}
                      className="w-full"
                      variant="outline"
                    >
                      Bảng điều khiển Admin
                    </Button>
                  )}
                  <Button onClick={handleLogout} className="w-full" variant="destructive">
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </Card>

            {/* Orders List */}
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Lịch sử đơn hàng</h2>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Bạn chưa có đơn hàng nào</p>
                  <Button
                    onClick={() => navigate("/thanh-toan")}
                    className="mt-4"
                  >
                    Tạo đơn hàng
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold">{order.productName}</div>
                          <div className="text-sm text-gray-600">Đơn hàng #{order.id}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {(order.totalAmount / 100).toLocaleString("vi-VN")} ₫
                          </div>
                          <div className="text-sm">
                            <span
                              className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                                order.status === "delivered"
                                  ? "bg-green-500"
                                  : order.status === "cancelled"
                                  ? "bg-red-500"
                                  : order.status === "shipped"
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                              }`}
                            >
                              {order.status === "pending"
                                ? "Chờ xử lý"
                                : order.status === "paid"
                                ? "Đã thanh toán"
                                : order.status === "processing"
                                ? "Đang xử lý"
                                : order.status === "shipped"
                                ? "Đã gửi"
                                : order.status === "delivered"
                                ? "Đã giao"
                                : "Hủy"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Số lượng: {order.quantity} | Ngày tạo:{" "}
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                      {order.productDescription && (
                        <div className="text-sm text-gray-700 mt-2">{order.productDescription}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
