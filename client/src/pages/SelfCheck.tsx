/* ============================================================
   SelfCheck Page – Symptom Screening Quiz
   Multi-step quiz with progress bar and result classification
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const questions = [
  {
    id: 1,
    question: "Bạn thuộc nhóm tuổi nào?",
    options: ["18–25 tuổi", "26–35 tuổi", "36–45 tuổi", "46–55 tuổi", "Trên 55 tuổi"],
  },
  {
    id: 2,
    question: "Bạn đang gặp vấn đề gì khiến bạn tìm kiếm thông tin?",
    options: [
      "Khó đạt hoặc duy trì cương dương",
      "Xuất tinh sớm hoặc không kiểm soát được",
      "Giảm ham muốn tình dục",
      "Mệt mỏi, giảm năng lượng kéo dài",
      "Tôi chỉ muốn tìm hiểu thêm",
    ],
  },
  {
    id: 3,
    question: "Tình trạng này kéo dài bao lâu?",
    options: [
      "Dưới 1 tháng",
      "1–3 tháng",
      "3–6 tháng",
      "Hơn 6 tháng",
      "Tôi không chắc",
    ],
  },
  {
    id: 4,
    question: "Bạn có mắc các bệnh nền nào sau đây không?",
    options: [
      "Tiểu đường",
      "Huyết áp cao",
      "Bệnh tim mạch",
      "Không có bệnh nền",
      "Tôi không biết",
    ],
    multiSelect: true,
  },
  {
    id: 5,
    question: "Bạn đã từng tự mua thuốc để điều trị tình trạng này chưa?",
    options: [
      "Chưa bao giờ",
      "Đã thử nhưng không hiệu quả",
      "Đã thử và có hiệu quả một phần",
      "Đang dùng thuốc theo đơn bác sĩ",
    ],
  },
];

type Result = "self-care" | "consult" | "urgent";

function getResult(answers: Record<number, string[]>): Result {
  const hasUrgent = answers[4]?.some(a =>
    ["Bệnh tim mạch", "Tiểu đường"].includes(a)
  );
  const longDuration = answers[3]?.some(a =>
    ["3–6 tháng", "Hơn 6 tháng"].includes(a)
  );
  if (hasUrgent || longDuration) return "consult";
  if (answers[2]?.includes("Tôi chỉ muốn tìm hiểu thêm")) return "self-care";
  return "consult";
}

const resultConfig = {
  "self-care": {
    icon: Info,
    color: "text-electric-blue",
    bgColor: "bg-steel",
    borderColor: "border-electric-blue/30",
    title: "Bạn có thể tự chăm sóc",
    desc: "Dựa trên thông tin bạn cung cấp, tình trạng của bạn có thể được cải thiện qua thay đổi lối sống và theo dõi. Tuy nhiên, chúng tôi khuyến nghị đọc thêm nội dung giáo dục và tham khảo ý kiến bác sĩ nếu triệu chứng kéo dài.",
    cta: "Đọc kiến thức sức khỏe",
    ctaHref: "/giao-duc",
    secondary: "Đặt lịch tư vấn",
    secondaryHref: "/tu-van",
  },
  "consult": {
    icon: CheckCircle2,
    color: "text-electric-blue",
    bgColor: "bg-steel",
    borderColor: "border-electric-blue/30",
    title: "Nên tư vấn với bác sĩ",
    desc: "Dựa trên thông tin bạn cung cấp, chúng tôi khuyến nghị bạn nên tư vấn với bác sĩ để được đánh giá chính xác hơn. Đây không phải chẩn đoán y khoa — chỉ là bước sàng lọc ban đầu.",
    cta: "Đặt lịch tư vấn ngay",
    ctaHref: "/tu-van",
    secondary: "Tìm hiểu thêm",
    secondaryHref: "/giao-duc",
  },
  "urgent": {
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/30",
    title: "Cần gặp bác sĩ sớm",
    desc: "Dựa trên thông tin bạn cung cấp, chúng tôi khuyến nghị bạn nên gặp bác sĩ trong thời gian sớm nhất. Nếu có triệu chứng cấp tính, hãy đến cơ sở y tế gần nhất.",
    cta: "Đặt lịch tư vấn khẩn",
    ctaHref: "/tu-van",
    secondary: "Gọi hỗ trợ: 1800 xxxx",
    secondaryHref: "tel:1800xxxx",
  },
};

export default function SelfCheck() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [completed, setCompleted] = useState(false);

  const question = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;
  const currentAnswers = answers[question?.id] || [];

  const handleSelect = (option: string) => {
    if (!question) return;
    if (question.multiSelect) {
      const current = answers[question.id] || [];
      const updated = current.includes(option)
        ? current.filter(a => a !== option)
        : [...current, option];
      setAnswers({ ...answers, [question.id]: updated });
    } else {
      setAnswers({ ...answers, [question.id]: [option] });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const result = completed ? getResult(answers) : null;
  const resultData = result ? resultConfig[result] : null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-electric-blue text-sm font-semibold uppercase tracking-widest font-body">Sàng lọc triệu chứng</span>
            <h1 className="font-display text-navy text-3xl md:text-4xl font-bold mt-2 mb-3">
              Kiểm tra sức khỏe
            </h1>
            <p className="text-muted-foreground font-body">
              Bài quiz 2–4 phút để phân loại tình trạng và hướng dẫn bước tiếp theo phù hợp.
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Shield className="w-4 h-4 text-electric-blue" />
              <span className="text-xs text-muted-foreground font-body">Thông tin không được lưu trữ</span>
            </div>
          </div>

          {!completed ? (
            <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
              {/* Progress */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-body text-muted-foreground">
                    Câu {currentStep + 1} / {questions.length}
                  </span>
                  <span className="text-sm font-body text-electric-blue font-medium">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-steel rounded-full h-2">
                  <div
                    className="bg-electric-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="p-6">
                <h2 className="font-display font-semibold text-navy text-xl mb-6">
                  {question.question}
                </h2>
                {question.multiSelect && (
                  <p className="text-xs text-muted-foreground font-body mb-4">
                    Có thể chọn nhiều đáp án
                  </p>
                )}
                <div className="flex flex-col gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      className={`quiz-option text-left font-body text-sm ${
                        currentAnswers.includes(option) ? "selected" : ""
                      }`}
                      onClick={() => handleSelect(option)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          currentAnswers.includes(option)
                            ? "border-electric-blue bg-electric-blue"
                            : "border-border"
                        }`}>
                          {currentAnswers.includes(option) && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-navy">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="p-6 border-t border-border flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 font-body"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentAnswers.length === 0}
                  className="bg-navy hover:bg-electric-blue text-white font-display font-semibold flex items-center gap-2 transition-all duration-200"
                >
                  {currentStep === questions.length - 1 ? "Xem kết quả" : "Tiếp theo"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : resultData && result ? (
            <div className={`border-2 ${resultData.borderColor} ${resultData.bgColor} rounded-2xl p-8`}>
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                  <resultData.icon className={`w-8 h-8 ${resultData.color}`} />
                </div>
                <h2 className="font-display font-bold text-navy text-2xl mb-3">
                  {resultData.title}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {resultData.desc}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 mb-6 border border-border">
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  <span className="font-semibold text-navy">Lưu ý quan trọng:</span> Đây không phải chẩn đoán y khoa. Kết quả chỉ mang tính định hướng dựa trên thông tin bạn cung cấp. Chỉ bác sĩ có thẩm quyền mới có thể đưa ra chẩn đoán và đơn thuốc hợp lệ.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={resultData.ctaHref} className="flex-1">
                  <Button className="w-full bg-navy hover:bg-electric-blue text-white font-display font-semibold flex items-center justify-center gap-2 transition-all duration-200">
                    {resultData.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={resultData.secondaryHref} className="flex-1">
                  <Button variant="outline" className="w-full border-navy text-navy hover:bg-navy hover:text-white font-display font-semibold transition-all duration-200">
                    {resultData.secondary}
                  </Button>
                </Link>
              </div>

              <button
                className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-navy font-body transition-colors"
                onClick={() => { setCompleted(false); setCurrentStep(0); setAnswers({}); }}
              >
                Làm lại từ đầu
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
