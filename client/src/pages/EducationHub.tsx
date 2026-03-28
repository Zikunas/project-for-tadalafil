/* ============================================================
   Education Hub Page – Precision Blue Design
   4 content pillars: Education, Privacy, Science, Social Proof
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Shield, FlaskConical, Users, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { id: "all", label: "Tất cả", icon: BookOpen },
  { id: "education", label: "Giáo dục", icon: BookOpen },
  { id: "privacy", label: "Kín đáo & Tiện lợi", icon: Shield },
  { id: "science", label: "Khoa học & An toàn", icon: FlaskConical },
  { id: "social", label: "Câu chuyện thực tế", icon: Users },
];

const articles = [
  {
    id: 1,
    category: "education",
    categoryLabel: "Giáo dục",
    title: "Rối loạn cương dương: Nguyên nhân, yếu tố rủi ro và khi nào cần gặp bác sĩ",
    excerpt: "Rối loạn cương dương (ED) ảnh hưởng đến khoảng 30–40% nam giới ở độ tuổi trung niên. Đây là tình trạng y tế có thể điều trị được, không phải dấu hiệu của sự yếu đuối. Hiểu đúng để chọn đúng.",
    readTime: "6 phút đọc",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/hero-main-gqqS3muoUtxPwdwLsvmsRG.webp",
    tags: ["ED", "Tư vấn y khoa", "Sức khỏe nam giới"],
  },
  {
    id: 2,
    category: "science",
    categoryLabel: "Khoa học",
    title: "Testosterone và sức khỏe nam giới: Những điều khoa học nói gì?",
    excerpt: "Testosterone không chỉ ảnh hưởng đến ham muốn tình dục. Nó liên quan đến năng lượng, tâm trạng, khối lượng cơ, và sức khỏe tim mạch. Tìm hiểu khi nào cần xét nghiệm.",
    readTime: "8 phút đọc",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/education-hub-UoGXWWEFpjcHhU4o4cP47z.webp",
    tags: ["Testosterone", "Hormone", "Xét nghiệm"],
  },
  {
    id: 3,
    category: "privacy",
    categoryLabel: "Kín đáo",
    title: "Quy trình tư vấn kín đáo hoạt động như thế nào?",
    excerpt: "Từ lúc bạn điền form đến khi nhận hàng — mọi bước đều được thiết kế để bảo vệ sự riêng tư của bạn. Không ai biết bạn đang điều trị gì, kể cả người thân.",
    readTime: "4 phút đọc",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/consult-section-hMoYAkWiMsNaBA4xpymcqQ.webp",
    tags: ["Bảo mật", "Quy trình", "Giao hàng"],
  },
  {
    id: 4,
    category: "education",
    categoryLabel: "Giáo dục",
    title: "Xuất tinh sớm: Định nghĩa lâm sàng và các phương pháp điều trị có bằng chứng",
    excerpt: "Xuất tinh sớm là tình trạng phổ biến nhất trong các vấn đề tình dục nam giới. Có nhiều phương pháp điều trị hiệu quả — từ kỹ thuật hành vi đến dược lý — tùy thuộc vào nguyên nhân.",
    readTime: "7 phút đọc",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/trust-section-5hkSNiB3fwbP6KPRrtXSAF.webp",
    tags: ["PE", "Điều trị", "Lâm sàng"],
  },
  {
    id: 5,
    category: "science",
    categoryLabel: "Khoa học",
    title: "5 sai lầm phổ biến khi tự mua thuốc điều trị rối loạn cương dương",
    excerpt: "Mua thuốc không rõ nguồn gốc, dùng sai liều, bỏ qua chống chỉ định — những sai lầm này không chỉ không hiệu quả mà còn có thể gây nguy hiểm. Đây là những gì bạn cần biết.",
    readTime: "5 phút đọc",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/pharmacy-delivery-9yo7e3JywGTM5tjGBJjqJA.webp",
    tags: ["An toàn", "Thuốc", "Cảnh báo"],
  },
  {
    id: 6,
    category: "social",
    categoryLabel: "Câu chuyện thực tế",
    title: "\"Tôi đã chờ 3 năm trước khi tìm kiếm giúp đỡ\" — Câu chuyện ẩn danh",
    excerpt: "Một khách hàng chia sẻ hành trình từ lo lắng, xấu hổ đến quyết định tìm kiếm tư vấn chuyên nghiệp. Câu chuyện được chia sẻ với sự đồng ý, tên và chi tiết đã được thay đổi.",
    readTime: "5 phút đọc",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663487046192/ZWVTLRHfv6ykA55PzP5wz2/hero-main-gqqS3muoUtxPwdwLsvmsRG.webp",
    tags: ["Câu chuyện", "Ẩn danh", "Hành trình"],
  },
];

export default function EducationHub() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter(a => {
    const matchCategory = activeCategory === "all" || a.category === activeCategory;
    const matchSearch = searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy pt-24 pb-16">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Kiến thức sức khỏe</span>
            <h1 className="font-display text-white text-4xl md:text-5xl font-bold mt-2 mb-4">
              Hiểu đúng để chọn đúng
            </h1>
            <p className="text-white/70 font-body leading-relaxed mb-6">
              Nội dung giáo dục được biên soạn và duyệt bởi đội ngũ y tế. Không phóng đại, không hứa hẹn — chỉ thông tin khoa học chính xác.
            </p>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-border font-body text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric-blue/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-body transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-navy text-white"
                    : "bg-steel text-navy hover:bg-navy/10"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <div
                  key={article.id}
                  className="group bg-white rounded-xl overflow-hidden border border-border card-hover cursor-pointer"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block bg-steel text-electric-blue text-xs font-semibold px-3 py-1 rounded-full font-body">
                        {article.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-navy text-lg mb-2 leading-tight group-hover:text-electric-blue transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-xs bg-steel/60 text-navy/70 px-2 py-0.5 rounded font-body">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-electric-blue text-sm font-medium font-body group-hover:underline">
                        Đọc thêm
                      </span>
                      <ArrowRight className="w-4 h-4 text-electric-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">Không tìm thấy bài viết phù hợp.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-navy rounded-2xl p-8 text-center">
            <h3 className="font-display font-bold text-white text-2xl mb-3">
              Sẵn sàng tư vấn với bác sĩ?
            </h3>
            <p className="text-white/70 font-body mb-6">
              Sau khi đọc và hiểu rõ tình trạng của mình, bước tiếp theo là tư vấn với chuyên gia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kiem-tra">
                <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white font-display font-semibold flex items-center gap-2">
                  Kiểm tra triệu chứng
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tu-van">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display font-semibold">
                  Đặt lịch tư vấn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
