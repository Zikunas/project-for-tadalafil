import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Bug fix: if already authenticated as admin, skip login and go straight to dashboard
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && user && user.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Đăng nhập thành công");
        navigate("/admin", { replace: true });
      } else {
        const error = await response.json();
        toast.error(error.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error("Lỗi kết nối");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking auth
  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-navy mb-2">Admin Login</h1>
            <p className="text-gray-600">Đăng nhập tài khoản quản trị</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin19"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy hover:bg-electric-blue text-white font-semibold"
              size="lg"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-blue-900">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>Username: <code className="bg-white px-2 py-1 rounded">admin19</code></p>
            <p>Password: <code className="bg-white px-2 py-1 rounded">admin19</code></p>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
