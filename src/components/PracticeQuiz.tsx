import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Clock,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  RotateCcw,
  PenTool,
  RefreshCw,
  Shuffle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types';
import { QUIZ_QUESTIONS, TOPICS, BADGES } from '../data/curriculumData';
import { soundManager } from '../utils/audio';
import { recordQuizAttempt } from '../utils/storage';
import { DiagramRenderer } from './DiagramRenderer';

interface PracticeQuizProps {
  topicId: number | 'all';
  onBack: () => void;
  onFinished?: () => void;
}

// Generate dynamic question variants to ensure 10 questions per quiz
function generateTenQuestions(topicId: number | 'all'): QuizQuestion[] {
  let initialPool = QUIZ_QUESTIONS.filter(q => (topicId === 'all' ? true : q.topicId === topicId));

  // If pool has fewer than 10, generate dynamic math variants
  const generated: QuizQuestion[] = [...initialPool];

  // Dynamic templates for variety
  const dynamicTemplates = [
    () => {
      const a = Math.floor(Math.random() * 50 + 10) * 1000;
      const b = Math.floor(Math.random() * 40 + 5) * 1000;
      const sum = a + b;
      return {
        id: `dyn_add_${Date.now()}_${Math.random()}`,
        topicId: typeof topicId === 'number' ? topicId : 5,
        lessonId: 13,
        question: `Tính nhẩm kết quả của phép tính: ${new Intl.NumberFormat('vi-VN').format(a)} + ${new Intl.NumberFormat('vi-VN').format(b)} = ?`,
        options: [
          { id: 'a', text: new Intl.NumberFormat('vi-VN').format(sum), isCorrect: true },
          { id: 'b', text: new Intl.NumberFormat('vi-VN').format(sum + 10000), isCorrect: false },
          { id: 'c', text: new Intl.NumberFormat('vi-VN').format(sum - 10000), isCorrect: false },
          { id: 'd', text: new Intl.NumberFormat('vi-VN').format(sum + 5000), isCorrect: false }
        ].sort(() => Math.random() - 0.5),
        explanation: `Cộng số tròn nghìn: ${new Intl.NumberFormat('vi-VN').format(a)} + ${new Intl.NumberFormat('vi-VN').format(b)} = ${new Intl.NumberFormat('vi-VN').format(sum)}.`,
        hint: 'Cộng các chữ số ở hàng chục nghìn và nghìn.',
        difficulty: 'easy' as const
      };
    },
    () => {
      const hours = [2, 4, 5, 8, 10];
      const h = hours[Math.floor(Math.random() * hours.length)];
      const isObtuse = h >= 4 && h <= 8;
      const isAcute = h === 1 || h === 2 || h === 10 || h === 11;
      const angleType = isObtuse ? 'Góc tù' : isAcute ? 'Góc nhọn' : 'Góc vuông';
      return {
        id: `dyn_clock_${Date.now()}_${Math.random()}`,
        topicId: typeof topicId === 'number' ? topicId : 2,
        lessonId: 6,
        question: `Quan sát đồng hồ chỉ đúng ${h} giờ. Hai kim đồng hồ tạo thành góc gì?`,
        diagramType: 'clock' as const,
        diagramData: { hour: h, minute: 0, caption: `Đồng hồ chỉ đúng ${h} giờ` },
        options: [
          { id: 'a', text: angleType, isCorrect: true },
          { id: 'b', text: angleType === 'Góc nhọn' ? 'Góc tù' : 'Góc nhọn', isCorrect: false },
          { id: 'c', text: 'Góc bẹt (180°)', isCorrect: false },
          { id: 'd', text: 'Góc vuông (90°)', isCorrect: false }
        ].sort(() => Math.random() - 0.5),
        explanation: `Lúc ${h} giờ, góc giữa hai kim là ${angleType}. (Góc nhọn < 90°, góc vuông = 90°, góc tù > 90° và < 180°, góc bẹt = 180°).`,
        hint: `So sánh góc lúc ${h} giờ với góc vuông của thước ê-ke.`,
        difficulty: 'medium' as const
      };
    },
    () => {
      const tons = Math.floor(Math.random() * 5 + 2);
      const ta = Math.floor(Math.random() * 8 + 1);
      const totalKg = tons * 1000 + ta * 100;
      return {
        id: `dyn_weight_${Date.now()}_${Math.random()}`,
        topicId: typeof topicId === 'number' ? topicId : 4,
        lessonId: 10,
        question: `Đổi ${tons} tấn ${ta} tạ ra đơn vị ki-lô-gam (kg):`,
        diagramType: 'weights' as const,
        options: [
          { id: 'a', text: `${new Intl.NumberFormat('vi-VN').format(totalKg)} kg`, isCorrect: true },
          { id: 'b', text: `${new Intl.NumberFormat('vi-VN').format(totalKg + 500)} kg`, isCorrect: false },
          { id: 'c', text: `${new Intl.NumberFormat('vi-VN').format(totalKg - 100)} kg`, isCorrect: false },
          { id: 'd', text: `${tons * 100 + ta} kg`, isCorrect: false }
        ].sort(() => Math.random() - 0.5),
        explanation: `1 tấn = 1 000 kg nên ${tons} tấn = ${tons * 1000} kg. 1 tạ = 100 kg nên ${ta} tạ = ${ta * 100} kg. Tổng = ${totalKg} kg.`,
        hint: '1 tấn = 1000 kg, 1 tạ = 100 kg.',
        difficulty: 'easy' as const
      };
    },
    () => {
      const diff = Math.floor(Math.random() * 6 + 2) * 2;
      const small = Math.floor(Math.random() * 15 + 5);
      const large = small + diff;
      const total = small + large;
      return {
        id: `dyn_sumdiff_${Date.now()}_${Math.random()}`,
        topicId: typeof topicId === 'number' ? topicId : 5,
        lessonId: 15,
        question: `Hai số có tổng bằng ${total} và hiệu bằng ${diff}. Số bé là:`,
        diagramType: 'tape_diagram' as const,
        diagramData: { smallLabel: 'Số bé', largeLabel: 'Số lớn', diffVal: diff, totalVal: total, unit: 'đơn vị' },
        options: [
          { id: 'a', text: `${small}`, isCorrect: true },
          { id: 'b', text: `${large}`, isCorrect: false },
          { id: 'c', text: `${small + 1}`, isCorrect: false },
          { id: 'd', text: `${total - diff}`, isCorrect: false }
        ].sort(() => Math.random() - 0.5),
        explanation: `Áp dụng công thức: Số bé = (Tổng - Hiệu) : 2 = (${total} - ${diff}) : 2 = ${total - diff} : 2 = ${small}.`,
        hint: 'Số bé = (Tổng - Hiệu) : 2.',
        difficulty: 'medium' as const
      };
    },
    () => {
      const deg = [30, 45, 60, 120, 135, 150][Math.floor(Math.random() * 6)];
      const isA = deg < 90;
      return {
        id: `dyn_angle_${Date.now()}_${Math.random()}`,
        topicId: typeof topicId === 'number' ? topicId : 2,
        lessonId: 6,
        question: `Góc trong hình dưới đây có số đo bằng ${deg}°. Đó là góc gì?`,
        diagramType: 'angle' as const,
        diagramData: { degrees: deg, note: `Số đo góc: ${deg}°` },
        options: [
          { id: 'a', text: isA ? 'Góc nhọn' : 'Góc tù', isCorrect: true },
          { id: 'b', text: isA ? 'Góc tù' : 'Góc nhọn', isCorrect: false },
          { id: 'c', text: 'Góc vuông', isCorrect: false },
          { id: 'd', text: 'Góc bẹt', isCorrect: false }
        ].sort(() => Math.random() - 0.5),
        explanation: `${deg}° ${isA ? '< 90° nên là góc nhọn' : '> 90° và < 180° nên là góc tù'}.`,
        hint: `${deg}° so với 90° như thế nào?`,
        difficulty: 'easy' as const
      };
    },
    () => {
      const year = [1782, 1864, 1945, 1975, 2026, 938][Math.floor(Math.random() * 6)];
      let century = '';
      if (year === 1782) century = 'Thế kỉ XVIII (18)';
      else if (year === 1864) century = 'Thế kỉ XIX (19)';
      else if (year === 1945 || year === 1975) century = 'Thế kỉ XX (20)';
      else if (year === 2026) century = 'Thế kỉ XXI (21)';
      else century = 'Thế kỉ X (10)';

      return {
        id: `dyn_century_${Date.now()}_${Math.random()}`,
        topicId: typeof topicId === 'number' ? topicId : 4,
        lessonId: 12,
        question: `Năm ${year} thuộc thế kỉ nào?`,
        options: [
          { id: 'a', text: century, isCorrect: true },
          { id: 'b', text: 'Thế kỉ XV (15)', isCorrect: false },
          { id: 'c', text: 'Thế kỉ XVI (16)', isCorrect: false },
          { id: 'd', text: 'Thế kỉ XXII (22)', isCorrect: false }
        ].sort(() => Math.random() - 0.5),
        explanation: `Năm ${year} thuộc ${century}. (1 thế kỉ = 100 năm).`,
        hint: '1 thế kỉ = 100 năm.',
        difficulty: 'medium' as const
      };
    }
  ];

  // Fill up until we reach 10 questions
  let templateIndex = 0;
  while (generated.length < 10) {
    const fn = dynamicTemplates[templateIndex % dynamicTemplates.length];
    generated.push(fn());
    templateIndex++;
  }

  // Shuffle and pick exactly 10 questions
  return generated.sort(() => Math.random() - 0.5).slice(0, 10);
}

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({ topicId, onBack, onFinished }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [quizAttemptCount, setQuizAttemptCount] = useState(1);

  // Stored answers
  const [userAnswers, setUserAnswers] = useState<{
    questionId: string;
    questionText: string;
    userSelectedId: string;
    correctOptionId: string;
    isCorrect: boolean;
  }[]>([]);

  const [resultSummary, setResultSummary] = useState<{
    score: number;
    earnedStars: number;
    newBadges: string[];
  } | null>(null);

  // Function to generate and load a fresh 10-question quiz
  const loadFreshQuiz = useCallback(() => {
    const setOf10 = generateTenQuestions(topicId);
    setQuestions(setOf10);
    setCurrentIdx(0);
    setUserAnswers([]);
    setIsAnswered(false);
    setSelectedOptionId(null);
    setIsFinished(false);
    setTimeSeconds(0);
    setShowHint(false);
    setResultSummary(null);
  }, [topicId]);

  useEffect(() => {
    loadFreshQuiz();
  }, [loadFreshQuiz]);

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  if (questions.length === 0) {
    return (
      <div className="p-12 text-center text-slate-600 font-bold">
        <Sparkles className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-2" />
        Đang khởi tạo bộ đề 10 câu trắc nghiệm sinh động...
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const topicObj = TOPICS.find(t => t.id === topicId);
  const topicTitle =
    topicId === 'all'
      ? 'Đề Thi Thử Toàn Diện Học Kì 1 (10 Câu)'
      : topicObj
      ? `${topicObj.title} (10 Câu)`
      : 'Luyện tập Toán 4 (10 Câu)';

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optId);
    setIsAnswered(true);

    const correctOpt = currentQ.options.find(o => o.isCorrect);
    const isCorrect = correctOpt ? correctOpt.id === optId : false;

    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    const answerRecord = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      userSelectedId: optId,
      correctOptionId: correctOpt ? correctOpt.id : '',
      isCorrect
    };

    setUserAnswers(prev => [...prev, answerRecord]);
  };

  const handleNext = () => {
    soundManager.playClick();
    setShowHint(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const finalAnswers = [...userAnswers];
    const { attempt, earnedStars, newBadges } = recordQuizAttempt(
      topicId,
      topicTitle,
      finalAnswers,
      timeSeconds
    );

    setResultSummary({
      score: attempt.score,
      earnedStars,
      newBadges
    });

    if (attempt.score >= 80) {
      soundManager.playFanfare();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } else {
      soundManager.playStar();
    }

    if (onFinished) {
      onFinished();
    }
  };

  // Reset to a brand new 10-question set
  const handleResetToNewQuiz = () => {
    soundManager.playClick();
    setQuizAttemptCount(c => c + 1);
    loadFreshQuiz();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Trở về
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Reset / Tạo đề mới button */}
          <button
            onClick={handleResetToNewQuiz}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black shadow-sm hover:opacity-95 transition-all cursor-pointer"
            title="Đổi bộ 10 câu hỏi ngẫu nhiên mới"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Tạo Đề Mới (10 Câu)</span>
          </button>

          {/* Timer Display */}
          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-2xl font-mono font-bold text-xs sm:text-sm border border-slate-200">
            <Clock className="w-4 h-4 text-slate-500" />
            {formatTime(timeSeconds)}
          </div>

          {/* Scratchpad Toggle */}
          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all border ${
              showScratchpad
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{showScratchpad ? 'Đóng nháp' : 'Giấy nháp'}</span>
          </button>
        </div>
      </div>

      {/* Optional Scratchpad Drawer */}
      {showScratchpad && (
        <div className="mb-6 p-4 bg-amber-50 rounded-3xl border-2 border-amber-300 shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
              📝 Giấy nháp tính toán của bé:
            </span>
            <button
              onClick={() => setScratchpadText('')}
              className="text-[11px] font-bold text-amber-700 hover:underline"
            >
              Xóa sạch
            </button>
          </div>
          <textarea
            value={scratchpadText}
            onChange={(e) => setScratchpadText(e.target.value)}
            rows={3}
            placeholder="Bé có thể đặt tính rồi tính hoặc ghi nhẩm ở đây nhé..."
            className="w-full p-3 bg-white rounded-2xl border border-amber-200 font-mono text-sm text-slate-800 focus:outline-none focus:border-amber-400"
          />
        </div>
      )}

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md">
          {/* Progress bar & Question number */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-2">
              <span className="text-emerald-700 font-black uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {topicTitle}
              </span>
              <span className="font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                Câu <strong className="text-emerald-700 text-sm">{currentIdx + 1}</strong> / 10 câu
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${((currentIdx + 1) / 10) * 100}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.subText && (
              <p className="text-slate-600 text-sm mt-1">{currentQ.subText}</p>
            )}
          </div>

          {/* Interactive SVG Diagram for question (if applicable) */}
          {currentQ.diagramType && (
            <div className="my-4">
              <DiagramRenderer type={currentQ.diagramType} data={currentQ.diagramData} />
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i); // A, B, C, D
              const isSelected = selectedOptionId === opt.id;
              const showResult = isAnswered;

              let btnStyle = 'bg-slate-50 hover:bg-emerald-50/50 border-slate-200 text-slate-800';
              let badgeStyle = 'bg-white text-slate-600 border-slate-300';

              if (showResult) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                  badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                  badgeStyle = 'bg-rose-600 text-white border-rose-600';
                } else {
                  btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-2xl border-2 font-bold text-left text-base sm:text-lg transition-all flex items-center justify-between shadow-xs ${btnStyle} cursor-pointer`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm border-2 shrink-0 ${badgeStyle}`}>
                      {letter}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {showResult && opt.isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  )}
                  {showResult && isSelected && !opt.isCorrect && (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint / Explanation Section */}
          {isAnswered && (
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 mb-6 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <span className="text-xl">🤖</span>
                <div className="text-sm">
                  <span className="font-black text-emerald-900 block mb-0.5">
                    Lời giải chi tiết của Rô-bốt:
                  </span>
                  <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2">
            {!isAnswered ? (
              <div>
                {currentQ.hint && (
                  <button
                    onClick={() => {
                      setShowHint(!showHint);
                      soundManager.playClick();
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-all cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {showHint ? 'Ẩn gợi ý' : 'Bật mí gợi ý của Rô-bốt'}
                  </button>
                )}
                {showHint && currentQ.hint && (
                  <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl mt-2 border border-amber-200">
                    💡 <strong>Gợi ý:</strong> {currentQ.hint}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-500">
                Hãy đọc kĩ lời giải trước khi bấm tiếp tục nhé!
              </div>
            )}

            {isAnswered && (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition-all shadow-md hover:scale-105 ml-auto flex items-center gap-2 cursor-pointer"
              >
                {currentIdx + 1 < 10 ? 'Câu Tiếp Theo ➜' : 'Xem Kết Quả Đề 10 Câu 🏆'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score & Summary Screen with Reset New Quiz Button */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-xl text-center">
          <div className="inline-block p-4 bg-emerald-50 rounded-full mb-3">
            <Award className="w-16 h-16 text-emerald-600 mx-auto" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {resultSummary && resultSummary.score === 100
              ? '🎉 Xuất Sắc 10/10 Câu Tuyệt Đối!'
              : resultSummary && resultSummary.score >= 80
              ? '🌟 Rất Giỏi! Hoàn Thành Bài Kiểm Tra 10 Câu!'
              : '👍 Làm Rất Tốt! Hãy Tiếp Tục Rèn Luyện!'}
          </h2>

          <p className="text-slate-600 text-sm mt-1">
            Bé đã hoàn thành bài kiểm tra 10 câu <strong>{topicTitle}</strong>
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto my-6">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 block">Điểm số</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                {resultSummary?.score}%
              </span>
              <span className="text-[11px] font-bold text-slate-500 block">
                {userAnswers.filter(a => a.isCorrect).length}/10 câu đúng
              </span>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-800 block">Sao thưởng</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600">
                +{resultSummary?.earnedStars} ⭐
              </span>
              <span className="text-[11px] font-bold text-slate-500 block">Tích lũy hồ sơ</span>
            </div>

            <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200">
              <span className="text-xs font-bold text-blue-800 block">Thời gian</span>
              <span className="text-2xl sm:text-3xl font-black text-blue-700">
                {formatTime(timeSeconds)}
              </span>
              <span className="text-[11px] font-bold text-slate-500 block">Hoàn thành 10 câu</span>
            </div>
          </div>

          {/* Unlocked Badges celebration */}
          {resultSummary && resultSummary.newBadges.length > 0 && (
            <div className="bg-amber-100/70 p-4 rounded-2xl border-2 border-amber-300 max-w-lg mx-auto mb-6 text-left">
              <h4 className="font-black text-amber-950 text-sm flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Mở khóa huy hiệu vinh danh mới:
              </h4>
              <div className="flex flex-wrap gap-2">
                {resultSummary.newBadges.map(bId => {
                  const b = BADGES.find(item => item.id === bId);
                  return (
                    <div
                      key={bId}
                      className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-xs text-xs font-black text-slate-800"
                    >
                      <span className="text-lg">{b?.icon || '🏅'}</span>
                      <span>{b?.title || 'Huy hiệu mới'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action buttons: Reset to new quiz & return */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto mb-6">
            <button
              onClick={handleResetToNewQuiz}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Tạo Đề Mới (10 Câu Ngẫu Nhiên Mới)
            </button>

            <button
              onClick={onBack}
              className="px-6 py-3.5 rounded-2xl bg-slate-100 text-slate-700 font-black hover:bg-slate-200 transition-all text-sm cursor-pointer"
            >
              Về Danh Sách Bài Học ➜
            </button>
          </div>

          {/* Detailed Question Review */}
          <div className="text-left max-w-2xl mx-auto border-t border-slate-100 pt-5">
            <h4 className="font-black text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-3">
              📋 Xem lại 10 câu bé vừa làm:
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {userAnswers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm ${
                    ans.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  {ans.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-slate-800">
                      Câu {idx + 1}: {ans.questionText}
                    </span>
                    <span className={`block font-bold mt-0.5 ${ans.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {ans.isCorrect ? '✓ Đúng hoàn toàn' : '✗ Cần ôn tập lại câu này'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
