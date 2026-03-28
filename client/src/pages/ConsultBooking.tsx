/* ============================================================
   ConsultBooking Page – Precision Blue Design
   Consultation booking flow with doctor profiles and time slots
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import {
  Video, Calendar, Clock, Shield, CheckCircle2,
  Star, ArrowRight, User, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const doctors = [
  {
    id: 1,
    name: "BS. Nguyễn Văn A",
    specialty: "Chuyên khoa Nam học",
    experience: "15 năm kinh nghiệm",
    rating: 4.9,
    reviews: 234,
    available: true,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "DS. Trần Thị B",
    specialty: "Dược sĩ lâm sàng",
    experience: "10 năm kinh nghiệm",
    rating: 4.8,
    reviews: 189,
    available: true,
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "BS. Lê Văn C",
    specialty: "Nội tiết & Hormone",
    experience: "12 năm kinh nghiệm",
    rating: 4.7,
    reviews: 156,
    available: false,
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
  },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "19:00", "19:30", "20:00",
];

const consultTypes = [
  {
    id: "video",
    icon: Video,
    title: "Tư vấn video",
    desc: "Gặp trực tiếp qua video call bảo mật",
    price: "350.000đ",
    duration: "30 phút",
  },
  {
    id: "chat",
    icon: Phone,
    title: "Tư vấn chat",
    desc: "Nhắn tin với bác sĩ/dược sĩ",
    price: "150.000đ",
    duration: "24 giờ phản hồi",
  },
];

export default function ConsultBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", concern: "" });
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  const formatDate = (d: Date) => {
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return {
      day: days[d.getDay()],
      date: d.getDate(),
      month: d.getMonth() + 1,
      full: d.toISOString().split("T")[0],
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setSubmitted(true);
    toast.success("Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy pt-24 pb-12">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Tư vấn lâm sàng</span>
            <h1 className="font-display text-white text-4xl md:text-5xl font-bold mt-2 mb-4">
              Đặt lịch tư vấn kín đáo
            </h1>
            <p className="text-white/70 font-body leading-relaxed">
              Gặp bác sĩ hoặc dược sĩ có chứng chỉ qua hình thức bảo mật. Mọi thông tin được mã hóa và không được chia sẻ.
            </p>
          </div>
        </div>
      </section>

      {/* Progress steps */}
      <div className="bg-steel border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {["Chọn hình thức", "Chọn bác sĩ", "Chọn lịch", "Thông tin"].map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${
                  step > i + 1 ? "bg-electric-blue text-white" :
                  step === i + 1 ? "bg-navy text-white" :
                  "bg-border text-muted-foreground"
                }`}>
                  {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-body ${step === i + 1 ? "text-navy font-medium" : "text-muted-foreground"}`}>
                  {s}
                </span>
                {i < 3 && <div className="w-8 h-px bg-border mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="container max-w-3xl">
          {submitted ? (
            <div className="bg-steel rounded-2xl p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-electric-blue flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display font-bold text-navy text-2xl mb-3">
                Đặt lịch thành công!
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Chúng tôi sẽ liên hệ xác nhận lịch hẹn trong vòng 30 phút qua số điện thoại bạn đã cung cấp.
              </p>
              <div className="bg-white rounded-xl p-4 mb-6 text-left border border-border">
                <div className="grid grid-cols-2 gap-3 text-sm font-body">
                  <div>
                    <span className="text-muted-foreground">Hình thức:</span>
                    <span className="text-navy font-medium ml-2">{selectedType === "video" ? "Video call" : "Chat"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ngày:</span>
                    <span className="text-navy font-medium ml-2">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Giờ:</span>
                    <span className="text-navy font-medium ml-2">{selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tên:</span>
                    <span className="text-navy font-medium ml-2">{formData.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground font-body mb-6">
                <Shield className="w-4 h-4 text-electric-blue" />
                Thông tin của bạn được bảo mật hoàn toàn
              </div>
              <Link href="/">
                <Button className="bg-navy hover:bg-electric-blue text-white font-display font-semibold">
                  Về trang chủ
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Step 1: Consult Type */}
              {step === 1 && (
                <div>
                  <h2 className="font-display font-bold text-navy text-2xl mb-6">
                    Chọn hình thức tư vấn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {consultTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                          selectedType === type.id
                            ? "border-electric-blue bg-steel"
                            : "border-border hover:border-electric-blue/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            selectedType === type.id ? "bg-electric-blue" : "bg-steel"
                          }`}>
                            <type.icon className={`w-6 h-6 ${selectedType === type.id ? "text-white" : "text-navy"}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-navy text-lg">{type.title}</h3>
                            <p className="text-muted-foreground text-sm font-body mb-3">{type.desc}</p>
                            <div className="flex items-center gap-3">
                              <span className="font-display font-bold text-electric-blue">{type.price}</span>
                              <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {type.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedType}
                    className="bg-navy hover:bg-electric-blue text-white font-display font-semibold flex items-center gap-2 transition-all duration-200"
                  >
                    Tiếp theo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Step 2: Doctor */}
              {step === 2 && (
                <div>
                  <h2 className="font-display font-bold text-navy text-2xl mb-6">
                    Chọn bác sĩ / dược sĩ
                  </h2>
                  <div className="flex flex-col gap-4 mb-8">
                    {doctors.map(doc => (
                      <button
                        key={doc.id}
                        onClick={() => doc.available && setSelectedDoctor(doc.id)}
                        disabled={!doc.available}
                        className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                          !doc.available ? "opacity-50 cursor-not-allowed border-border" :
                          selectedDoctor === doc.id
                            ? "border-electric-blue bg-steel"
                            : "border-border hover:border-electric-blue/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={doc.img}
                            alt={doc.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-border"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-display font-semibold text-navy">{doc.name}</h3>
                              {!doc.available && (
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded font-body">
                                  Đã đầy lịch
                                </span>
                              )}
                            </div>
                            <p className="text-electric-blue text-sm font-body">{doc.specialty}</p>
                            <p className="text-muted-foreground text-xs font-body">{doc.experience}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm font-body">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium text-navy">{doc.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground font-body">{doc.reviews} đánh giá</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="font-body">
                      Quay lại
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!selectedDoctor}
                      className="bg-navy hover:bg-electric-blue text-white font-display font-semibold flex items-center gap-2 transition-all duration-200"
                    >
                      Tiếp theo
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <div>
                  <h2 className="font-display font-bold text-navy text-2xl mb-6">
                    Chọn ngày và giờ
                  </h2>
                  {/* Date picker */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-navy font-body mb-3">Chọn ngày:</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {dates.map(d => {
                        const fd = formatDate(d);
                        return (
                          <button
                            key={fd.full}
                            onClick={() => setSelectedDate(fd.full)}
                            className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border-2 w-16 transition-all duration-200 ${
                              selectedDate === fd.full
                                ? "border-electric-blue bg-electric-blue text-white"
                                : "border-border hover:border-electric-blue/50"
                            }`}
                          >
                            <span className={`text-xs font-body ${selectedDate === fd.full ? "text-white/80" : "text-muted-foreground"}`}>
                              {fd.day}
                            </span>
                            <span className={`font-display font-bold text-lg ${selectedDate === fd.full ? "text-white" : "text-navy"}`}>
                              {fd.date}
                            </span>
                            <span className={`text-xs font-body ${selectedDate === fd.full ? "text-white/80" : "text-muted-foreground"}`}>
                              Th{fd.month}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {/* Time slots */}
                  {selectedDate && (
                    <div className="mb-8">
                      <p className="text-sm font-medium text-navy font-body mb-3">Chọn giờ:</p>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2.5 rounded-lg border-2 text-sm font-body font-medium transition-all duration-200 ${
                              selectedTime === slot
                                ? "border-electric-blue bg-electric-blue text-white"
                                : "border-border hover:border-electric-blue/50 text-navy"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(2)} className="font-body">
                      Quay lại
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      disabled={!selectedDate || !selectedTime}
                      className="bg-navy hover:bg-electric-blue text-white font-display font-semibold flex items-center gap-2 transition-all duration-200"
                    >
                      Tiếp theo
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Personal info */}
              {step === 4 && (
                <div>
                  <h2 className="font-display font-bold text-navy text-2xl mb-2">
                    Thông tin liên hệ
                  </h2>
                  <p className="text-muted-foreground font-body text-sm mb-6">
                    Thông tin chỉ dùng để xác nhận lịch hẹn. Không được lưu trữ lâu dài.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy font-body mb-1.5">
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Tên của bạn (có thể dùng tên giả)"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border font-body text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric-blue/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy font-body mb-1.5">
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          placeholder="Số điện thoại để xác nhận lịch"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border font-body text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric-blue/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy font-body mb-1.5">
                        Mô tả ngắn về vấn đề (tùy chọn)
                      </label>
                      <textarea
                        placeholder="Mô tả ngắn để bác sĩ chuẩn bị tốt hơn..."
                        value={formData.concern}
                        onChange={e => setFormData({ ...formData, concern: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border font-body text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric-blue/30 resize-none"
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-steel rounded-xl p-4 border border-border">
                      <h4 className="font-display font-semibold text-navy text-sm mb-3">Tóm tắt lịch hẹn:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm font-body">
                        <div className="text-muted-foreground">Hình thức:</div>
                        <div className="text-navy font-medium">{selectedType === "video" ? "Video call" : "Chat"}</div>
                        <div className="text-muted-foreground">Ngày:</div>
                        <div className="text-navy font-medium">{selectedDate}</div>
                        <div className="text-muted-foreground">Giờ:</div>
                        <div className="text-navy font-medium">{selectedTime}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground font-body">
                        Bằng cách đặt lịch, bạn đồng ý với điều khoản sử dụng và chính sách bảo mật của chúng tôi. Thông tin của bạn được bảo mật và không chia sẻ với bên thứ ba.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(3)} className="font-body">
                        Quay lại
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-navy hover:bg-electric-blue text-white font-display font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                      >
                        Xác nhận đặt lịch
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
