import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, HelpCircle, CheckCircle2, XCircle, Award, Sparkles, RotateCcw, PenTool } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types';
import { QUIZ_QUESTIONS, TOPICS, BADGES } from '../data/curriculumData';
import { soundManager } from '../utils/audio';
import { recordQuizAttempt } from '../utils/storage';

interface PracticeQuizProps {
  topicId: number | 'all';
  onBack: () => void;
  onFinished?: () => void;
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

  // Load questions
  useEffect(() => {
    let pool: QuizQuestion[] = [];
    if (topicId === 'all') {
      pool = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 8);
    } else {
      pool = QUIZ_QUESTIONS.filter(q => q.topicId === topicId);
      if (pool.length === 0) pool = QUIZ_QUESTIONS.slice(0, 4);
    }
    setQuestions(pool);
    setCurrentIdx(0);
    setUserAnswers([]);
    setIsAnswered(false);
    setSelectedOptionId(null);
    setIsFinished(false);
    setTimeSeconds(0);
  }, [topicId]);

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  if (questions.length === 0) {
    return <div className="p-8 text-center text-slate-600">Đang tải câu hỏi trắc nghiệm...</div>;
  }

  const currentQ = questions[currentIdx];
  const topicObj = TOPICS.find(t => t.id === topicId);
  const topicTitle = topicId === 'all' ? 'Đề Thi Thử Toàn Diện Học Kì 1' : topicObj ? topicObj.title : 'Luyện tập Toán 4';

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
    // Record into profile storage
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
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } else {
      soundManager.playStar();
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setIsFinished(false);
    setTimeSeconds(0);
    setShowHint(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Trở về
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-2xl font-mono font-bold text-sm border border-slate-200">
            <Clock className="w-4 h-4 text-slate-500" />
            {formatTime(timeSeconds)}
          </div>
          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all border ${
              showScratchpad ? 'bg-amber-500 text-white border-amber-600 shadow-sm' : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <PenTool className="w-4 h-4" />
            {showScratchpad ? 'Đóng nháp' : 'Giấy nháp'}
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
            placeholder="Bé có thể ghi nhẩm, đặt tính hoặc tính toán thử ở đây nhé..."
            className="w-full p-3 bg-white rounded-2xl border border-amber-200 font-mono text-sm text-slate-800 focus:outline-none focus:border-amber-400"
          />
        </div>
      )}

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md">
          {/* Progress bar & Question number */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-2">
              <span className="text-emerald-700 font-black uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
                {topicTitle}
              </span>
              <span>
                Câu <strong>{currentIdx + 1}</strong> / {questions.length}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.subText && (
              <p className="text-slate-600 text-sm mt-1">{currentQ.subText}</p>
            )}
          </div>

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
                  className={`w-full p-4 rounded-2xl border-2 font-bold text-left text-base sm:text-lg transition-all flex items-center justify-between shadow-sm ${btnStyle} cursor-pointer`}
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
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 mb-6 animate-fadeIn">
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
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-all"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {showHint ? 'Ẩn gợi ý' : 'Bật mí gợi ý của Rô-bốt'}
                  </button>
                )}
                {showHint && currentQ.hint && (
                  <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded-lg mt-2 border border-amber-200">
                    💡 <strong>Gợi ý:</strong> {currentQ.hint}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-500">
                Hãy đọc kĩ lời giải trước khi sang câu tiếp theo nhé!
              </div>
            )}

            {isAnswered && (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition-all shadow-md hover:scale-105 ml-auto flex items-center gap-2"
              >
                {currentIdx + 1 < questions.length ? 'Câu Tiếp Theo ➜' : 'Xem Kết Quả 🏆'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score & Summary Screen */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-xl text-center">
          <div className="inline-block p-4 bg-emerald-50 rounded-full mb-3">
            <Award className="w-16 h-16 text-emerald-600 mx-auto" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {resultSummary && resultSummary.score === 100
              ? '🎉 Xuất Sắc Điểm 10 Tuyệt Đối!'
              : resultSummary && resultSummary.score >= 80
              ? '🌟 Rất Giỏi! Hoàn Thành Bài Rực Rỡ!'
              : '👍 Làm Rất Tốt! Hãy Tiếp Tục Phát Huy!'}
          </h2>

          <p className="text-slate-600 text-sm mt-1">
            Bé đã hoàn thành bài kiểm tra <strong>{topicTitle}</strong>
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto my-6">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 block">Điểm số</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                {resultSummary?.score}%
              </span>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-800 block">Sao nhận được</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600">
                +{resultSummary?.earnedStars} ⭐
              </span>
            </div>

            <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200">
              <span className="text-xs font-bold text-blue-800 block">Thời gian</span>
              <span className="text-2xl sm:text-3xl font-black text-blue-700">
                {formatTime(timeSeconds)}
              </span>
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
                    <div key={bId} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-sm text-xs font-black text-slate-800">
                      <span className="text-lg">{b?.icon || '🏅'}</span>
                      <span>{b?.title || 'Huy hiệu mới'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Detailed Question Review */}
          <div className="text-left max-w-2xl mx-auto mb-6">
            <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider mb-3">
              📋 Xem lại từng câu hỏi:
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
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
                    <span className="font-bold text-slate-800">Câu {idx + 1}: {ans.questionText}</span>
                    <span className={`block font-bold mt-0.5 ${ans.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {ans.isCorrect ? '✓ Đúng hoàn toàn' : '✗ Cần ôn tập lại câu này'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={restartQuiz}
              className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-black hover:bg-slate-200 transition-all flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại bài này
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-700 transition-all shadow-md text-sm"
            >
              Về Trang Bài Học ➜
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
