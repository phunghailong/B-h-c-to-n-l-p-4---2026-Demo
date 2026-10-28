import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Sparkles, CheckCircle2, Play } from 'lucide-react';
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

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
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
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
        >
          <Play className="w-4 h-4 fill-white" /> Làm Bài Trắc Nghiệm Ngay ➜
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

        {/* Mascot decoration */}
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
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all border ${
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
          {/* Summary Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                {currentLesson.title}
              </h2>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {currentLesson.pageRange}
              </span>
            </div>

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
                    <div key={idx} className="p-3 bg-white rounded-xl border border-blue-200 text-xs sm:text-sm font-bold text-blue-950 font-mono shadow-xs">
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
              Hãy thử sức ngay với các câu hỏi trắc nghiệm sinh động để nhận sao thưởng và huy hiệu danh dự nhé!
            </p>
            <button
              onClick={() => {
                soundManager.playClick();
                onStartQuiz(topic.id);
              }}
              className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" /> Bắt Đầu Luyện Trắc Nghiệm Ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
