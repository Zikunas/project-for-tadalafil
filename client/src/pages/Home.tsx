/* ============================================================
   Home Page – Precision Blue Design
   Sections: Hero, Stats, How It Works, Services, Education, 
             Consult Preview, Pharmacy, Trust, FAQ, CTA
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Shield, Lock, Star,
  ChevronDown, BookOpen, Video, Package, HeartPulse,
  Clock, Users, Award, Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Intersection observer hook for entrance animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Animated counter
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString("vi-VN")}{suffix}</span>;
}

const faqData = [
  {
    q: "Quy trình tư vấn có kín đáo không?",
    a: "Hoàn toàn kín đáo. Mọi thông tin cá nhân và lịch sử tư vấn được mã hóa và bảo mật theo tiêu chuẩn y tế. Giao hàng được thực hiện trong bao bì trung tính, không ghi tên sản phẩm."
  },
  {
    q: "Tôi có thể tự mua thuốc kê đơn không?",
    a: "Không. Thuốc kê đơn chỉ được cấp phát khi có đơn thuốc hợp lệ từ bác sĩ có thẩm quyền. Quy trình của chúng tôi đảm bảo mọi đơn thuốc đều đi qua bước tư vấn và xét duyệt y khoa."
  },
  {
    q: "Bác sĩ tư vấn có được cấp phép không?",
    a: "Tất cả bác sĩ và dược sĩ trong hệ thống đều có giấy phép hành nghề hợp lệ tại Việt Nam và được kiểm tra định kỳ về năng lực chuyên môn."
  },
  {
    q: "Thời gian từ tư vấn đến nhận hàng là bao lâu?",
    a: "Thông thường 24–48 giờ sau khi có đơn thuốc hợp lệ. Giao hàng nhanh trong ngày có thể áp dụng tại TP.HCM và Hà Nội."
  },
  {
    q: "Nếu có tác dụng phụ, tôi phải làm gì?",
    a: "Liên hệ ngay đường dây hỗ trợ 24/7. Đội ngũ y tế sẽ đánh giá và hướng dẫn xử lý. Trong trường hợp khẩn cấp, gọi 115 hoặc đến cơ sở y tế gần nhất."
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsSection = useInView();
  const howItWorksSection = useInView();
  const servicesSection = useInView();
  const educationSection = useInView();
  const trustSection = useInView();
  const faqSection = useInView();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-navy-dark"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/hero-main-gqqS3muoUtxPwdwLsvmsRG.webp"
            alt="Bác sĩ tư vấn"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-navy-dark/40" />
        </div>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(oklch(0.52 0.22 255) 1px, transparent 1px), linear-gradient(90deg, oklch(0.52 0.22 255) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-electric-blue/20 border border-electric-blue/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
              <span className="text-electric-blue text-sm font-medium font-body">
                Chăm sóc sức khỏe nam giới — Kín đáo & Chuyên nghiệp
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
              Sức khỏe của bạn,
              <br />
              <span className="gradient-text">quyền riêng tư</span>
              <br />
              của bạn.
            </h1>

            <p className="text-white/70 text-lg md:text-xl font-body leading-relaxed mb-8 max-w-xl animate-fade-in-up delay-100">
              Hệ thống chăm sóc sức khỏe nam giới toàn diện: giáo dục, sàng lọc triệu chứng, tư vấn lâm sàng kín đáo, và giao thuốc hợp lệ đến tận tay bạn.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up delay-200">
              {[
                { icon: Shield, text: "Tuân thủ pháp luật Việt Nam" },
                { icon: Lock, text: "Bảo mật tuyệt đối" },
                { icon: CheckCircle2, text: "Bác sĩ có chứng chỉ" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80 text-sm font-body">
                  <item.icon className="w-4 h-4 text-electric-blue" />
                  {item.text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <Link href="/kiem-tra">
                <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white font-display font-semibold px-8 py-3 text-base rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-electric-blue/30">
                  Kiểm tra triệu chứng miễn phí
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tu-van">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-display font-semibold px-8 py-3 text-base rounded-lg"
                >
                  Đặt lịch tư vấn
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-xs font-body">Cuộn xuống</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-navy py-14" ref={statsSection.ref}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: 10000, suffix: "+", label: "Khách hàng tin tưởng" },
            { value: 50, suffix: "+", label: "Bác sĩ & Dược sĩ" },
            { value: 98, suffix: "%", label: "Hài lòng dịch vụ" },
            { value: 24, suffix: "/7", label: "Hỗ trợ liên tục" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${statsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/60 text-sm font-body">{stat.label}</div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-white" ref={howItWorksSection.ref}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Quy trình</span>
            <h2 className="font-display text-navy text-4xl md:text-5xl font-bold mt-2 mb-4">
              Từ sàng lọc đến nhận thuốc
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Quy trình được thiết kế như một phễu y tế, không phải cửa hàng thương mại điện tử.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                icon: HeartPulse,
                title: "Kiểm tra triệu chứng",
                desc: "Bài quiz 2–4 phút để phân loại tình trạng sức khỏe của bạn.",
                color: "bg-steel",
                textColor: "text-navy"
              },
              {
                step: "02",
                icon: BookOpen,
                title: "Giáo dục & Hiểu rõ",
                desc: "Tìm hiểu nguyên nhân, yếu tố rủi ro và khi nào cần gặp bác sĩ.",
                color: "bg-steel",
                textColor: "text-navy"
              },
              {
                step: "03",
                icon: Video,
                title: "Tư vấn lâm sàng",
                desc: "Gặp bác sĩ/dược sĩ có thẩm quyền qua hình thức kín đáo.",
                color: "bg-navy",
                textColor: "text-white"
              },
              {
                step: "04",
                icon: Stethoscope,
                title: "Đơn thuốc hợp lệ",
                desc: "Nhận đơn thuốc điện tử đúng chỉ định, đúng liều, đúng thời hạn.",
                color: "bg-navy",
                textColor: "text-white"
              },
              {
                step: "05",
                icon: Package,
                title: "Giao hàng kín đáo",
                desc: "Nhà thuốc đủ điều kiện xử lý và giao hàng trong bao bì trung tính.",
                color: "bg-electric-blue",
                textColor: "text-white"
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-xl p-6 card-hover transition-all duration-700 ${item.color} ${
                  howItWorksSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`text-5xl font-display font-bold mb-4 opacity-20 ${item.textColor}`}>
                  {item.step}
                </div>
                <item.icon className={`w-8 h-8 mb-3 ${item.textColor === "text-white" ? "text-white/80" : "text-electric-blue"}`} />
                <h3 className={`font-display font-semibold text-lg mb-2 ${item.textColor}`}>
                  {item.title}
                </h3>
                <p className={`text-sm font-body leading-relaxed ${item.textColor === "text-white" ? "text-white/70" : "text-muted-foreground"}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20 bg-steel" ref={servicesSection.ref}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Dịch vụ</span>
              <h2 className="font-display text-navy text-4xl md:text-5xl font-bold mt-2 mb-6">
                Chăm sóc toàn diện,
                <br />kín đáo tuyệt đối
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Chúng tôi không bán thuốc như hàng tiêu dùng. Chúng tôi xây dựng một hệ thống y tế hoàn chỉnh — từ giáo dục đến tư vấn, từ đơn thuốc đến giao hàng — đảm bảo an toàn và hợp pháp ở mọi bước.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: BookOpen, title: "Giáo dục sức khỏe", desc: "Nội dung khoa học, được duyệt bởi chuyên gia y tế" },
                  { icon: Video, title: "Teleconsult kín đáo", desc: "Tư vấn trực tuyến với bác sĩ có chứng chỉ" },
                  { icon: Package, title: "Giao thuốc an toàn", desc: "Qua nhà thuốc đủ điều kiện, bao bì trung tính" },
                  { icon: Clock, title: "Theo dõi hậu mãi", desc: "Nhắc tái khám, xử lý tác dụng phụ 24/7" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 transition-all duration-500 ${
                      servicesSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-navy text-base">{item.title}</h4>
                      <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/tu-van">
                  <Button className="bg-navy hover:bg-electric-blue text-white font-display font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-200">
                    Bắt đầu ngay
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/consult-section-hMoYAkWiMsNaBA4xpymcqQ.webp"
                alt="Tư vấn trực tuyến kín đáo"
                className="rounded-2xl w-full object-cover shadow-2xl"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-navy text-sm">Bảo mật tuyệt đối</div>
                    <div className="text-muted-foreground text-xs font-body">Dữ liệu được mã hóa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDUCATION HUB PREVIEW ===== */}
      <section className="py-20 bg-white" ref={educationSection.ref}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Kiến thức</span>
              <h2 className="font-display text-navy text-4xl md:text-5xl font-bold mt-2">
                Hiểu đúng để chọn đúng
              </h2>
            </div>
            <Link href="/giao-duc">
              <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white font-display font-semibold flex items-center gap-2 transition-all duration-200">
                Xem tất cả bài viết
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: "Giáo dục",
                title: "Rối loạn cương dương: Nguyên nhân và khi nào cần gặp bác sĩ",
                desc: "Hiểu đúng về tình trạng phổ biến nhưng ít được nói đến này. Nguyên nhân, yếu tố rủi ro và các bước đánh giá lâm sàng.",
                readTime: "5 phút đọc",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/education-hub-UoGXWWEFpjcHhU4o4cP47z.webp"
              },
              {
                category: "Khoa học",
                title: "Testosterone và sức khỏe nam giới: Những điều bạn cần biết",
                desc: "Vai trò của testosterone, dấu hiệu thiếu hụt, và khi nào cần xét nghiệm. Thông tin khoa học, không phóng đại.",
                readTime: "7 phút đọc",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/hero-main-gqqS3muoUtxPwdwLsvmsRG.webp"
              },
              {
                category: "Kín đáo",
                title: "Quy trình tư vấn kín đáo hoạt động như thế nào?",
                desc: "Từ lúc bạn điền form đến khi nhận hàng — mọi bước đều được thiết kế để bảo vệ sự riêng tư của bạn.",
                readTime: "4 phút đọc",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/pharmacy-delivery-9yo7e3JywGTM5tjGBJjqJA.webp"
              },
            ].map((article, i) => (
              <Link href="/giao-duc" key={i}>
                <div
                  className={`group bg-white rounded-xl overflow-hidden border border-border card-hover cursor-pointer transition-all duration-700 ${
                    educationSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-steel text-electric-blue text-xs font-semibold px-3 py-1 rounded-full mb-3 font-body">
                      {article.category}
                    </span>
                    <h3 className="font-display font-semibold text-navy text-lg mb-2 leading-tight group-hover:text-electric-blue transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
                      {article.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-body">{article.readTime}</span>
                      <ArrowRight className="w-4 h-4 text-electric-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHARMACY SECTION ===== */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, oklch(0.52 0.22 255) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/trust-section-5hkSNiB3fwbP6KPRrtXSAF.webp"
                alt="Nhà thuốc đủ điều kiện"
                className="rounded-2xl w-full object-cover shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-electric-blue rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-white" />
                  <div>
                    <div className="font-display font-bold text-white text-sm">GPP Certified</div>
                    <div className="text-white/70 text-xs font-body">Nhà thuốc đủ điều kiện</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Nhà thuốc</span>
              <h2 className="font-display text-white text-4xl md:text-5xl font-bold mt-2 mb-6">
                Giao hàng qua nhà thuốc đủ điều kiện
              </h2>
              <p className="text-white/70 font-body leading-relaxed mb-8">
                Mọi đơn thuốc đều được xử lý bởi nhà thuốc có giấy phép GPP, đảm bảo chất lượng sản phẩm, điều kiện bảo quản, và truy xuất nguồn gốc đầy đủ.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Kiểm tra đơn thuốc hợp lệ",
                  "Quản lý lô hàng & hạn dùng",
                  "Đóng gói kín đáo, trung tính",
                  "Theo dõi trạng thái giao hàng",
                  "Quy trình thu hồi nếu cần",
                  "Hỗ trợ đổi/trả theo quy định",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0" />
                    <span className="text-white/80 text-sm font-body">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/nha-thuoc">
                <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white font-display font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-200">
                  Tìm hiểu quy trình
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="py-20 bg-white" ref={trustSection.ref}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Tin tưởng</span>
            <h2 className="font-display text-navy text-4xl md:text-5xl font-bold mt-2 mb-4">
              Tại sao chọn VietMen's Health?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Shield,
                title: "Tuân thủ pháp luật",
                desc: "Hoạt động trong khuôn khổ Luật Dược Việt Nam. Mọi quy trình đều có kiểm soát pháp lý và audit trail đầy đủ."
              },
              {
                icon: Users,
                title: "Đội ngũ y tế chuyên nghiệp",
                desc: "Bác sĩ và dược sĩ có chứng chỉ hành nghề hợp lệ, được đào tạo chuyên sâu về sức khỏe nam giới."
              },
              {
                icon: Lock,
                title: "Bảo mật dữ liệu",
                desc: "Thông tin cá nhân và lịch sử y tế được mã hóa, không chia sẻ với bên thứ ba nếu không có sự đồng ý."
              },
              {
                icon: Award,
                title: "Nhà thuốc đạt chuẩn GPP",
                desc: "Đối tác nhà thuốc đều đạt tiêu chuẩn GPP, đảm bảo chất lượng sản phẩm và điều kiện bảo quản."
              },
              {
                icon: Clock,
                title: "Hỗ trợ 24/7",
                desc: "Đội ngũ hỗ trợ sẵn sàng 24/7 để giải đáp thắc mắc và xử lý các tình huống khẩn cấp."
              },
              {
                icon: Star,
                title: "Trải nghiệm kín đáo",
                desc: "Từ tư vấn đến giao hàng, mọi bước đều được thiết kế để bảo vệ sự riêng tư của bạn."
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white border border-border rounded-xl p-6 card-hover transition-all duration-700 ${
                  trustSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-steel flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-electric-blue" />
                </div>
                <h3 className="font-display font-semibold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="bg-steel rounded-2xl p-8">
            <h3 className="font-display font-semibold text-navy text-xl mb-6 text-center">
              Phản hồi từ khách hàng (ẩn danh)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  text: "Quy trình rất chuyên nghiệp và kín đáo. Bác sĩ giải thích rõ ràng, không vội vàng. Tôi cảm thấy được tôn trọng.",
                  role: "Khách hàng tại TP.HCM, 38 tuổi"
                },
                {
                  text: "Tôi đã lo lắng về sự riêng tư, nhưng quy trình từ đầu đến cuối rất bảo mật. Giao hàng đúng hẹn, bao bì không ghi gì.",
                  role: "Khách hàng tại Hà Nội, 44 tuổi"
                },
                {
                  text: "Nội dung giáo dục giúp tôi hiểu rõ tình trạng của mình trước khi tư vấn. Không cảm thấy bị bán hàng.",
                  role: "Khách hàng tại Đà Nẵng, 35 tuổi"
                },
              ].map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-electric-blue text-electric-blue" />
                    ))}
                  </div>
                  <p className="text-navy text-sm font-body leading-relaxed mb-3 italic">"{t.text}"</p>
                  <p className="text-muted-foreground text-xs font-body">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 bg-steel" ref={faqSection.ref}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">FAQ</span>
              <h2 className="font-display text-navy text-4xl md:text-5xl font-bold mt-2 mb-4">
                Câu hỏi thường gặp
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {faqData.map((item, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl border border-border overflow-hidden transition-all duration-700 ${
                    faqSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-display font-semibold text-navy text-base">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-electric-blue flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/education-hub-UoGXWWEFpjcHhU4o4cP47z.webp"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="container relative z-10 text-center">
          <h2 className="font-display text-white text-4xl md:text-5xl font-bold mb-4">
            Bắt đầu hành trình sức khỏe của bạn
          </h2>
          <p className="text-white/70 font-body text-lg max-w-xl mx-auto mb-8">
            Kiểm tra triệu chứng miễn phí trong 3 phút. Không cần đăng ký, không lưu thông tin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kiem-tra">
              <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white font-display font-semibold px-8 py-3 text-base rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-electric-blue/30">
                Kiểm tra triệu chứng ngay
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/tu-van">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display font-semibold px-8 py-3 text-base rounded-lg">
                Đặt lịch tư vấn
              </Button>
            </Link>
          </div>
          <p className="text-white/40 text-xs font-body mt-6">
            Nội dung chỉ mang tính giáo dục. Không thay thế tư vấn y khoa chuyên nghiệp.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
