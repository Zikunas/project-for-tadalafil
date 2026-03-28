/* ============================================================
   Footer – Precision Blue Design
   Dark navy footer with links, legal disclaimer, and contact
   ============================================================ */

import { Link } from "wouter";
import { Phone, Mail, MapPin, Shield, FileText, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Legal disclaimer banner */}
      <div className="bg-navy border-b border-white/10">
        <div className="container py-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-electric-blue flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/70 font-body leading-relaxed">
              <span className="text-white font-semibold">Lưu ý pháp lý:</span> Nội dung trên website chỉ mang tính giáo dục và thông tin. Không thay thế tư vấn y khoa chuyên nghiệp. Mọi quyết định điều trị cần có sự tham khảo của bác sĩ có thẩm quyền. Thuốc kê đơn chỉ được cấp phát khi có đơn thuốc hợp lệ từ bác sĩ được cấp phép.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-electric-blue flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">V</span>
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg leading-none block">
                  VietMen's
                </span>
                <span className="text-electric-blue text-xs font-medium tracking-wider uppercase">
                  Health
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
              Chăm sóc sức khỏe nam giới toàn diện — giáo dục, tư vấn lâm sàng, và giao thuốc kín đáo theo quy trình hợp pháp.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:1800xxxx" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                <Phone className="w-4 h-4 text-electric-blue" />
                1800 xxxx (Miễn phí)
              </a>
              <a href="mailto:support@vietmenshealth.vn" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-electric-blue" />
                support@vietmenshealth.vn
              </a>
              <div className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                TP. Hồ Chí Minh, Việt Nam
              </div>
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Dịch vụ
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/kiem-tra", label: "Kiểm tra triệu chứng" },
                { href: "/tu-van", label: "Đặt lịch tư vấn" },
                { href: "/nha-thuoc", label: "Quy trình nhà thuốc" },
                { href: "/giao-duc", label: "Kiến thức sức khỏe" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Thông tin
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/giao-duc", label: "Rối loạn cương dương" },
                { href: "/giao-duc", label: "Xuất tinh sớm" },
                { href: "/giao-duc", label: "Sức khỏe hormone" },
                { href: "/giao-duc", label: "Câu hỏi thường gặp" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pháp lý & Bảo mật */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Pháp lý & Bảo mật
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { icon: FileText, label: "Điều khoản sử dụng" },
                { icon: Lock, label: "Chính sách bảo mật" },
                { icon: Shield, label: "Giấy phép hoạt động" },
                { icon: FileText, label: "Quy định kê đơn" },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors font-body"
                    onClick={() => {}}
                  >
                    <item.icon className="w-3.5 h-3.5 text-electric-blue" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <Shield className="w-4 h-4 text-electric-blue" />
                <span className="text-xs text-white/70">Tuân thủ Luật Dược Việt Nam</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <Lock className="w-4 h-4 text-electric-blue" />
                <span className="text-xs text-white/70">Bảo mật dữ liệu cá nhân</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-body">
            © 2024 VietMen's Health. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-white/40 text-xs font-body text-center md:text-right">
            Nội dung chỉ mang tính giáo dục. Không thay thế tư vấn y khoa chuyên nghiệp.
          </p>
        </div>
      </div>
    </footer>
  );
}
