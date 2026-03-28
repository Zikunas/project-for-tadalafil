/* ============================================================
   Navbar – Precision Blue Design
   Sticky top navigation with brand logo and primary nav links
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/giao-duc", label: "Kiến thức sức khỏe" },
  { href: "/tu-van", label: "Đặt lịch tư vấn" },
  { href: "/nha-thuoc", label: "Nhà thuốc" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">V</span>
            </div>
            <div>
              <span className="font-display font-bold text-navy text-lg leading-none block">
                VietMen's
              </span>
              <span className="text-electric-blue text-xs font-medium tracking-wider uppercase">
                Health
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 font-body ${
                  location === link.href
                    ? "text-electric-blue bg-steel"
                    : scrolled
                    ? "text-navy hover:text-electric-blue hover:bg-steel"
                    : "text-navy hover:text-electric-blue hover:bg-steel"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:1800xxxx"
              className="flex items-center gap-2 text-sm text-navy font-medium hover:text-electric-blue transition-colors"
            >
              <Phone className="w-4 h-4" />
              1800 xxxx
            </a>
            {user ? (
              <>
                <Link href="/tai-khoan">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-sm"
                  >
                    <User className="w-4 h-4" />
                    {user.name || "Tài khoản"}
                  </Button>
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button
                      className="bg-electric-blue hover:bg-electric-blue/90 text-white font-display font-semibold text-sm px-5 py-2 rounded-lg"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={logout}
                  variant="ghost"
                  className="flex items-center gap-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button
                  className="bg-navy hover:bg-electric-blue text-white font-display font-semibold text-sm px-5 py-2 rounded-lg transition-all duration-200"
                >
                  Đăng nhập
                </Button>
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-navy hover:bg-steel transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors font-body ${
                  location === link.href
                    ? "text-electric-blue bg-steel"
                    : "text-navy hover:text-electric-blue hover:bg-steel"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              <a
                href="tel:1800xxxx"
                className="flex items-center gap-2 px-4 py-2 text-sm text-navy font-medium"
              >
                <Phone className="w-4 h-4" />
                1800 xxxx
              </a>
              {user ? (
                <>
                  <Link href="/tai-khoan">
                    <Button className="w-full" variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      {user.name || "Tài khoản"}
                    </Button>
                  </Link>
                  {user.role === "admin" && (
                    <Link href="/admin">
                      <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white font-display font-semibold">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={logout}
                    className="w-full"
                    variant="destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <a href={getLoginUrl()} className="w-full">
                  <Button className="w-full bg-navy hover:bg-electric-blue text-white font-display font-semibold">
                    Đăng nhập
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
