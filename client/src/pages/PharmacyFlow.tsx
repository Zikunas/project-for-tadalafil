/* ============================================================
   PharmacyFlow Page – Precision Blue Design
   Explains the pharmacy process, legal compliance, and delivery
   ============================================================ */

import { Link } from "wouter";
import {
  Package, CheckCircle2, Shield, Lock, Truck,
  ClipboardList, AlertTriangle, ArrowRight, Award,
  RotateCcw, ThermometerSun, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const orderSteps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Tạo lead & Sàng lọc",
    desc: "Bạn điền form, hệ thống sàng lọc sơ bộ và xác nhận đồng ý.",
    color: "bg-steel",
    textColor: "text-navy",
  },
  {
    step: "02",
    icon: Shield,
    title: "Tư vấn lâm sàng",
    desc: "Bác sĩ/dược sĩ đánh giá, loại trừ chống chỉ định, ghi nhận lý do.",
    color: "bg-steel",
    textColor: "text-navy",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Đơn thuốc hợp lệ",
    desc: "Bác sĩ có thẩm quyền kê đơn điện tử với mã đơn, ngày giờ, số lượng.",
    color: "bg-navy",
    textColor: "text-white",
  },
  {
    step: "04",
    icon: Package,
    title: "Nhà thuốc xử lý",
    desc: "Nhà thuốc GPP so khớp đơn, chọn lô đúng hạn, đóng gói kín đáo.",
    color: "bg-navy",
    textColor: "text-white",
  },
  {
    step: "05",
    icon: Truck,
    title: "Giao hàng kín đáo",
    desc: "Bao bì trung tính, không ghi tên sản phẩm, cập nhật trạng thái.",
    color: "bg-electric-blue",
    textColor: "text-white",
  },
  {
    step: "06",
    icon: CheckCircle2,
    title: "Theo dõi hậu mãi",
    desc: "Nhắc tái khám, theo dõi tác dụng phụ, xử lý khiếu nại nếu có.",
    color: "bg-electric-blue",
    textColor: "text-white",
  },
];

const pharmacyStandards = [
  {
    icon: Award,
    title: "Tiêu chuẩn GPP",
    desc: "Tất cả nhà thuốc đối tác đều đạt tiêu chuẩn Thực hành tốt nhà thuốc (GPP) theo quy định của Bộ Y tế Việt Nam.",
  },
  {
    icon: ThermometerSun,
    title: "Điều kiện bảo quản",
    desc: "Sản phẩm được bảo quản đúng nhiệt độ và độ ẩm theo yêu cầu của nhà sản xuất trong suốt quá trình lưu kho và vận chuyển.",
  },
  {
    icon: BarChart3,
    title: "Quản lý lô hàng",
    desc: "Mọi lô hàng đều được theo dõi theo số lô, hạn sử dụng, và nguồn gốc. Đảm bảo truy xuất nguồn gốc đầy đủ.",
  },
  {
    icon: RotateCcw,
    title: "Quy trình thu hồi",
    desc: "Có quy trình thu hồi rõ ràng trong trường hợp phát hiện vấn đề chất lượng. Khách hàng sẽ được thông báo và hỗ trợ kịp thời.",
  },
  {
    icon: Lock,
    title: "Bảo mật thông tin",
    desc: "Thông tin đơn hàng và người nhận được bảo mật. Nhân viên giao hàng không biết nội dung đơn hàng.",
  },
  {
    icon: AlertTriangle,
    title: "Xử lý tác dụng phụ",
    desc: "Đường dây hỗ trợ 24/7 để xử lý phản ứng có hại. Trường hợp khẩn cấp sẽ được hướng dẫn đến cơ sở y tế gần nhất.",
  },
];

const legalNotes = [
  "Thuốc kê đơn chỉ được cấp phát khi có đơn thuốc hợp lệ từ bác sĩ có thẩm quyền.",
  "Không bán vượt số lượng trên đơn; không bán khi đơn hết hạn.",
  "Không tự ý thay thế hoạt chất hoặc hàm lượng mà không có sự đồng ý của bác sĩ.",
  "Mọi giao dịch đều có audit trail đầy đủ theo quy định.",
  "Chính sách đổi/trả áp dụng theo quy định pháp luật về dược phẩm.",
];

export default function PharmacyFlow() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy pt-24 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(oklch(0.52 0.22 255) 1px, transparent 1px), linear-gradient(90deg, oklch(0.52 0.22 255) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Nhà thuốc & Giao hàng</span>
              <h1 className="font-display text-white text-4xl md:text-5xl font-bold mt-2 mb-4">
                Quy trình nhà thuốc hợp pháp
              </h1>
              <p className="text-white/70 font-body leading-relaxed mb-6">
                Chúng tôi không bán thuốc như hàng tiêu dùng. Mọi đơn hàng đều đi qua quy trình kiểm soát chặt chẽ từ đơn thuốc đến giao hàng, đảm bảo an toàn và hợp pháp.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Award, text: "Nhà thuốc GPP" },
                  { icon: Shield, text: "Đơn thuốc hợp lệ" },
                  { icon: Lock, text: "Giao hàng kín đáo" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <item.icon className="w-4 h-4 text-electric-blue" />
                    <span className="text-white text-sm font-body">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/trust-section-5hkSNiB3fwbP6KPRrtXSAF.webp"
                alt="Nhà thuốc đủ điều kiện"
                className="rounded-2xl w-full object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Order Flow */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Quy trình</span>
            <h2 className="font-display text-navy text-4xl md:text-5xl font-bold mt-2 mb-4">
              Từ đơn thuốc đến tay bạn
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Mỗi đơn hàng đều có trạng thái rõ ràng và được theo dõi đầy đủ trong hệ thống.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orderSteps.map((step, i) => (
              <div
                key={i}
                className={`rounded-xl p-6 card-hover ${step.color}`}
              >
                <div className={`text-5xl font-display font-bold mb-4 opacity-20 ${step.textColor}`}>
                  {step.step}
                </div>
                <step.icon className={`w-8 h-8 mb-3 ${step.textColor === "text-white" ? "text-white/80" : "text-electric-blue"}`} />
                <h3 className={`font-display font-semibold text-lg mb-2 ${step.textColor}`}>
                  {step.title}
                </h3>
                <p className={`text-sm font-body leading-relaxed ${step.textColor === "text-white" ? "text-white/70" : "text-muted-foreground"}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pharmacy Standards */}
      <section className="py-20 bg-steel">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Tiêu chuẩn</span>
            <h2 className="font-display text-navy text-4xl md:text-5xl font-bold mt-2 mb-4">
              Cam kết chất lượng
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacyStandards.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-border card-hover">
                <div className="w-12 h-12 rounded-xl bg-steel flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-electric-blue" />
                </div>
                <h3 className="font-display font-semibold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Giao hàng</span>
              <h2 className="font-display text-navy text-4xl font-bold mt-2 mb-6">
                Kín đáo từ kho đến cửa
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                Sản phẩm được đóng gói trong bao bì trung tính, không có tên thương hiệu hay thông tin sản phẩm bên ngoài. Nhân viên giao hàng không biết nội dung đơn hàng.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { title: "Bao bì trung tính", desc: "Không ghi tên sản phẩm, không logo thương hiệu" },
                  { title: "Giao hàng nhanh", desc: "24–48 giờ sau khi có đơn thuốc hợp lệ" },
                  { title: "Theo dõi đơn hàng", desc: "Cập nhật trạng thái qua SMS/email" },
                  { title: "Hỗ trợ đổi/trả", desc: "Theo chính sách dược phẩm, ưu tiên an toàn" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-electric-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-semibold text-navy text-sm">{item.title}: </span>
                      <span className="text-muted-foreground text-sm font-body">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/pharmacy-delivery-9yo7e3JywGTM5tjGBJjqJA.webp"
                alt="Giao hàng kín đáo"
                className="rounded-2xl w-full object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legal notes */}
      <section className="py-16 bg-navy">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-electric-blue" />
              <h2 className="font-display font-bold text-white text-2xl">
                Quy định pháp lý quan trọng
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {legalNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-electric-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-electric-blue text-xs font-display font-bold">{i + 1}</span>
                  </div>
                  <p className="text-white/80 text-sm font-body leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-steel">
        <div className="container text-center">
          <h2 className="font-display font-bold text-navy text-3xl mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            Kiểm tra triệu chứng miễn phí, sau đó đặt lịch tư vấn với bác sĩ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kiem-tra">
              <Button className="bg-navy hover:bg-electric-blue text-white font-display font-semibold flex items-center gap-2 transition-all duration-200">
                Kiểm tra triệu chứng
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/tu-van">
              <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white font-display font-semibold transition-all duration-200">
                Đặt lịch tư vấn
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
