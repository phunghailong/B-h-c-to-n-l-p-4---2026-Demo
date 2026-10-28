import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Sparkles, CheckCircle2, Play, Image as ImageIcon } from 'lucide-react';
import { Topic, Lesson } from '../types';
import { AngleToolWidget } from './widgets/AngleToolWidget';
import { PlaceValueTable } from './widgets/PlaceValueTable';
import { SumDiffVisualizer } from './widgets/SumDiffVisualizer';
import { soundManager } from '../utils/audio';

interface TheorySectionProps {
  topic: Topic;
  onBack: () => void;
  onStartQuiz: (topicId: number) => void;
}

export const TheorySection: React.FC<TheorySectionProps> = ({ topic, onBack, onStartQuiz }) => {
  const [activeLessonId, setActiveLessonId] = useState<number>(topic.lessons[0]?.id || 1);

  const currentLesson = topic.lessons.find(l => l.id === activeLessonId) || topic.lessons[0];

  // Visual SVG Diagram for Lesson
  const renderLessonIllustration = (lessonId: number) => {
    switch (lessonId) {
      // Bài 1 & 2: Ôn tập các số đến 100 000
      case 1:
        return (
          <div className="my-5 p-4 bg-amber-50/70 rounded-3xl border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🧮</span>
              <h4 className="font-black text-amber-900 text-sm">Hình Minh Họa: Phân Tích Cấu Tạo Số Đến 100 000</h4>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-col md:flex-row items-center justify-around gap-4 text-center">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Số mẫu SGK</span>
                <div className="font-mono text-3xl font-black text-amber-600">36 515</div>
              </div>
              <div className="text-2xl font-black text-amber-400">➜</div>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2 bg-amber-100/60 rounded-xl border border-amber-300">
                  <span className="text-[10px] text-slate-500 block">Chục nghìn</span>
                  <strong className="text-base text-amber-900">3</strong>
                  <span className="text-[10px] text-slate-400 block">(30 000)</span>
                </div>
                <div className="p-2 bg-blue-100/60 rounded-xl border border-blue-300">
                  <span className="text-[10px] text-slate-500 block">Nghìn</span>
                  <strong className="text-base text-blue-900">6</strong>
                  <span className="text-[10px] text-slate-400 block">(6 000)</span>
                </div>
                <div className="p-2 bg-emerald-100/60 rounded-xl border border-emerald-300">
                  <span className="text-[10px] text-slate-500 block">Trăm</span>
                  <strong className="text-base text-emerald-900">5</strong>
                  <span className="text-[10px] text-slate-400 block">(500)</span>
                </div>
                <div className="p-2 bg-purple-100/60 rounded-xl border border-purple-300">
                  <span className="text-[10px] text-slate-500 block">Chục</span>
                  <strong className="text-base text-purple-900">1</strong>
                  <span className="text-[10px] text-slate-400 block">(10)</span>
                </div>
                <div className="p-2 bg-rose-100/60 rounded-xl border border-rose-300">
                  <span className="text-[10px] text-slate-500 block">Đơn vị</span>
                  <strong className="text-base text-rose-900">5</strong>
                  <span className="text-[10px] text-slate-400 block">(5)</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-amber-900/80 mt-2 text-center font-bold">
              Viết thành tổng: 36 515 = 30 000 + 6 000 + 500 + 10 + 5
            </p>
          </div>
        );

      // Bài 3: Số chẵn, số lẻ (Dãy nhà phố SGK trang 12)
      case 2:
        return (
          <div className="my-5 p-4 bg-emerald-50/70 rounded-3xl border-2 border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏡</span>
              <h4 className="font-black text-emerald-900 text-sm">Hình Minh Họa: Dãy Nhà Phố Số Chẵn & Số Lẻ (SGK trang 12)</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
              {/* Dãy số chẵn */}
              <div className="bg-white p-3 rounded-2xl border border-blue-200">
                <span className="text-xs font-black text-blue-800 bg-blue-100 px-3 py-1 rounded-full uppercase">
                  Bên dãy số CHẴN (Tận cùng 0, 2, 4, 6, 8)
                </span>
                <div className="flex justify-around items-center gap-2 mt-3">
                  {['10', '12', '14', '16', '18'].map(num => (
                    <div key={num} className="flex flex-col items-center">
                      <span className="text-2xl">🏠</span>
                      <span className="font-black text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Số {num}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dãy số lẻ */}
              <div className="bg-white p-3 rounded-2xl border border-amber-200">
                <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase">
                  Bên dãy số LẺ (Tận cùng 1, 3, 5, 7, 9)
                </span>
                <div className="flex justify-around items-center gap-2 mt-3">
                  {['11', '13', '15', '17', '19'].map(num => (
                    <div key={num} className="flex flex-col items-center">
                      <span className="text-2xl">🏡</span>
                      <span className="font-black text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Số {num}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // Bài 4: Biểu thức chứa chữ (Gấp thuyền giấy SGK trang 14)
      case 3:
        return (
          <div className="my-5 p-4 bg-sky-50/70 rounded-3xl border-2 border-sky-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⛵</span>
              <h4 className="font-black text-sky-900 text-sm">Hình Minh Họa: Gấp Thuyền Giấy & Biểu Thức Chứa Chữ (SGK trang 14)</h4>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-3xl block">⛵ ⛵</span>
                <span className="text-xs font-black text-blue-900">Nam gấp: 2 cái thuyền</span>
              </div>
              <span className="text-2xl font-black text-sky-500">+</span>
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-3xl block">⛵❓</span>
                <span className="text-xs font-black text-amber-900">Mai gấp: a cái thuyền</span>
              </div>
              <span className="text-2xl font-black text-sky-500">=</span>
              <div className="p-3 bg-emerald-50 rounded-xl border-2 border-emerald-300">
                <span className="text-xs font-bold text-emerald-700 block">Biểu thức chứa 1 chữ:</span>
                <span className="text-xl font-black text-emerald-800 font-mono">2 + a</span>
              </div>
            </div>
          </div>
        );

      // Bài 7 & 8: Góc nhọn, góc vuông, góc tù, góc bẹt
      case 5:
      case 6:
        return (
          <div className="my-5 p-4 bg-teal-50/70 rounded-3xl border-2 border-teal-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📐</span>
              <h4 className="font-black text-teal-900 text-sm">Hình Minh Họa: 4 Loại Góc Chuẩn SGK Toán 4</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-2xl border border-teal-200">
                <svg width="100" height="70" viewBox="0 0 100 70" className="mx-auto mb-1">
                  <line x1="15" y1="55" x2="85" y2="55" stroke="#0F172A" strokeWidth="2.5" />
                  <line x1="15" y1="55" x2="65" y2="15" stroke="#0D9488" strokeWidth="2.5" />
                  <path d="M 35 55 A 20 20 0 0 0 30 40" fill="none" stroke="#0D9488" strokeWidth="2" />
                </svg>
                <span className="font-black text-xs text-teal-800 block">Góc nhọn</span>
                <span className="text-[10px] text-slate-500 font-bold">&lt; 90°</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-blue-200">
                <svg width="100" height="70" viewBox="0 0 100 70" className="mx-auto mb-1">
                  <line x1="20" y1="55" x2="85" y2="55" stroke="#0F172A" strokeWidth="2.5" />
                  <line x1="20" y1="55" x2="20" y2="10" stroke="#2563EB" strokeWidth="2.5" />
                  <rect x="20" y="40" width="15" height="15" fill="none" stroke="#2563EB" strokeWidth="2" />
                </svg>
                <span className="font-black text-xs text-blue-800 block">Góc vuông</span>
                <span className="text-[10px] text-slate-500 font-bold">= 90° (Ê-ke)</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-amber-200">
                <svg width="100" height="70" viewBox="0 0 100 70" className="mx-auto mb-1">
                  <line x1="50" y1="55" x2="90" y2="55" stroke="#0F172A" strokeWidth="2.5" />
                  <line x1="50" y1="55" x2="10" y2="20" stroke="#D97706" strokeWidth="2.5" />
                  <path d="M 70 55 A 20 20 0 0 0 35 40" fill="none" stroke="#D97706" strokeWidth="2" />
                </svg>
                <span className="font-black text-xs text-amber-800 block">Góc tù</span>
                <span className="text-[10px] text-slate-500 font-bold">&gt; 90° và &lt; 180°</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-purple-200">
                <svg width="100" height="70" viewBox="0 0 100 70" className="mx-auto mb-1">
                  <line x1="10" y1="45" x2="90" y2="45" stroke="#7C3AED" strokeWidth="3" />
                  <circle cx="50" cy="45" r="4" fill="#0F172A" />
                  <path d="M 65 45 A 15 15 0 0 0 35 45" fill="none" stroke="#7C3AED" strokeWidth="2" />
                </svg>
                <span className="font-black text-xs text-purple-800 block">Góc bẹt</span>
                <span className="text-[10px] text-slate-500 font-bold">= 180° (6 giờ đúng)</span>
              </div>
            </div>
          </div>
        );

      // Bài 17: Yến, tạ, tấn (SGK trang 56)
      case 10:
        return (
          <div className="my-5 p-4 bg-violet-50/70 rounded-3xl border-2 border-violet-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⚖️</span>
              <h4 className="font-black text-violet-900 text-sm">Hình Minh Họa: Bảng Quy Đổi Khối Lượng Thực Tế (SGK trang 56)</h4>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-3 rounded-2xl border border-violet-200 shadow-2xs">
                <span className="text-3xl block mb-1">🌾</span>
                <span className="text-xs font-black text-violet-950">1 Yến</span>
                <span className="text-sm font-black text-violet-600 block">= 10 kg</span>
                <span className="text-[10px] text-slate-400">1 bao gạo nhỏ</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-violet-200 shadow-2xs">
                <span className="text-3xl block mb-1">🐂</span>
                <span className="text-xs font-black text-violet-950">1 Tạ</span>
                <span className="text-sm font-black text-violet-600 block">= 10 yến = 100 kg</span>
                <span className="text-[10px] text-slate-400">1 con lợn lớn / con bê</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-violet-200 shadow-2xs">
                <span className="text-3xl block mb-1">🐘</span>
                <span className="text-xs font-black text-violet-950">1 Tấn</span>
                <span className="text-sm font-black text-violet-600 block">= 10 tạ = 1 000 kg</span>
                <span className="text-[10px] text-slate-400">1 chú voi con / ô tô</span>
              </div>
            </div>
          </div>
        );

      // Bài 27, 29, 31: Vuông góc, song song, hình bình hành, hình thoi (SGK trang 91-108)
      case 16:
      case 17:
        return (
          <div className="my-5 p-4 bg-cyan-50/70 rounded-3xl border-2 border-cyan-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🪁</span>
              <h4 className="font-black text-cyan-900 text-sm">Hình Minh Họa: Vuông Góc & Khung Diều Hình Thoi (SGK trang 97 & 108)</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-2xl border border-cyan-200 text-center">
                <svg width="140" height="90" viewBox="0 0 140 90" className="mx-auto">
                  <line x1="20" y1="45" x2="120" y2="45" stroke="#0284C7" strokeWidth="3" />
                  <line x1="70" y1="10" x2="70" y2="80" stroke="#E11D48" strokeWidth="3" />
                  <rect x="70" y="35" width="10" height="10" fill="none" stroke="#0284C7" strokeWidth="1.5" />
                </svg>
                <span className="text-xs font-black text-slate-800 block">Hai thanh tre vuông góc</span>
                <span className="text-[10px] text-slate-500">Tạo thành 4 góc vuông chung đỉnh</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-cyan-200 text-center">
                <svg width="140" height="90" viewBox="0 0 140 90" className="mx-auto">
                  <polygon points="70,10 120,45 70,80 20,45" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
                  <line x1="70" y1="10" x2="70" y2="80" stroke="#E11D48" strokeWidth="1" strokeDasharray="3 2" />
                  <line x1="20" y1="45" x2="120" y2="45" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 2" />
                </svg>
                <span className="text-xs font-black text-slate-800 block">Khung diều: Hình thoi</span>
                <span className="text-[10px] text-slate-500">4 cạnh bằng nhau, 2 đường chéo vuông góc</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Trở về danh sách chủ đề
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onStartQuiz(topic.id);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" /> Làm Đề Trắc Nghiệm 10 Câu ➜
        </button>
      </div>

      {/* Topic Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${topic.color} text-white shadow-lg mb-8 relative overflow-hidden`}>
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-white inline-block mb-2">
            Kiến thức trọng tâm SGK Toán 4 Kì 1
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">{topic.title}</h1>
          <p className="text-white/90 text-sm sm:text-base mt-2 font-medium">
            {topic.subtitle}
          </p>
        </div>

        <div className="absolute -right-4 -bottom-4 text-7xl sm:text-8xl opacity-30 pointer-events-none">
          🤖
        </div>
      </div>

      {/* Lesson Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {topic.lessons.map(lesson => (
          <button
            key={lesson.id}
            onClick={() => {
              setActiveLessonId(lesson.id);
              soundManager.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all border cursor-pointer ${
              activeLessonId === lesson.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {lesson.title}
          </button>
        ))}
      </div>

      {/* Active Lesson Content */}
      {currentLesson && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                {currentLesson.title}
              </h2>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {currentLesson.pageRange}
              </span>
            </div>

            {/* Visual SVG Illustration for Lesson */}
            {renderLessonIllustration(currentLesson.id)}

            {/* Robot Secret Bullet Points */}
            <div className="mb-6 p-4 sm:p-5 bg-amber-50 rounded-2xl border border-amber-200">
              <h3 className="font-black text-amber-900 text-sm sm:text-base flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                Bí Kíp Ghi Nhớ Của Rô-bốt:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {currentLesson.summary.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Rules / Formulas */}
            {currentLesson.keyRules && currentLesson.keyRules.length > 0 && (
              <div className="mb-6 p-4 sm:p-5 bg-blue-50 rounded-2xl border border-blue-200">
                <h3 className="font-black text-blue-900 text-sm sm:text-base flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Công Thức & Quy Tắc Cần Thuộc Lòng:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {currentLesson.keyRules.map((rule, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-blue-200 text-xs sm:text-sm font-bold text-blue-950 font-mono shadow-2xs">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-step Example Problem */}
            {currentLesson.examples && currentLesson.examples.length > 0 && (
              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-black text-slate-800 text-sm sm:text-base mb-3">
                  💡 Ví Dụ Thực Hành Mẫu:
                </h3>
                {currentLesson.examples.map((ex, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="font-bold text-slate-800 text-sm">
                      Đề bài: <span className="text-indigo-700">{ex.problem}</span>
                    </p>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs sm:text-sm text-slate-700">
                      <strong className="text-emerald-700">Cách giải: </strong>
                      {ex.solution}
                      {ex.note && <span className="block text-slate-500 italic mt-1">{ex.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contextual Interactive Widget */}
          {topic.id === 2 && (
            <AngleToolWidget />
          )}

          {topic.id === 3 && (
            <PlaceValueTable />
          )}

          {(topic.id === 5 || (topic.id === 1 && activeLessonId === 3)) && (
            <SumDiffVisualizer />
          )}

          {/* Call to Action at bottom */}
          <div className="text-center p-6 bg-emerald-50 rounded-3xl border-2 border-emerald-200">
            <h3 className="text-lg font-black text-emerald-900">Bé đã nắm vững kiến thức chưa?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-4">
              Làm ngay bài kiểm tra 10 câu trắc nghiệm sinh động có hình minh họa để nhận sao thưởng và huy hiệu nhé!
            </p>
            <button
              onClick={() => {
                soundManager.playClick();
                onStartQuiz(topic.id);
              }}
              className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" /> Bắt Đầu Làm Đề 10 Câu Ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
