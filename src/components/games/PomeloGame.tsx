import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import { updateActiveProfile } from '../../utils/storage';

interface QuestionChallenge {
  expression: string;
  answer: number;
  explain: string;
}

const CHALLENGES: QuestionChallenge[] = [
  { expression: '4 × (7 - 2)', answer: 20, explain: '4 × 5 = 20' },
  { expression: 'a × 4 (với a = 7)', answer: 28, explain: '7 × 4 = 28' },
  { expression: '33 - (13 - 10)', answer: 30, explain: '33 - 3 = 30' },
  { expression: '24 : (8 - 5)', answer: 8, explain: '24 : 3 = 8' },
  { expression: 'a × a (với a = 5)', answer: 25, explain: '5 × 5 = 25' },
  { expression: '4 + 3 × 2', answer: 10, explain: 'Nhân trước: 4 + 6 = 10' },
  { expression: 'a + b + c (với a=15, b=5, c=7)', answer: 27, explain: '15 + 5 + 7 = 27' },
  { expression: '60 : (7 - 5)', answer: 30, explain: '60 : 2 = 30' },
  { expression: '(m - 3) × 9 (với m = 8)', answer: 45, explain: '(8 - 3) × 9 = 5 × 9 = 45' },
  { expression: 'a × 2 + b × 2 (với a=7, b=3)', answer: 20, explain: '14 + 6 = 20' },
  { expression: '27 - (7 + 2)', answer: 18, explain: '27 - 9 = 18' },
  { expression: 'a + b (với a = 8, b = 6)', answer: 14, explain: '8 + 6 = 14' }
];

const POMELO_NUMBERS = [8, 10, 14, 18, 20, 25, 27, 28, 30, 45];

export const PomeloGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [basket, setBasket] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [shuffledChallenges, setShuffledChallenges] = useState<QuestionChallenge[]>([]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...CHALLENGES].sort(() => Math.random() - 0.5);
    setShuffledChallenges(shuffled);
    setCurrentIndex(0);
    setBasket([]);
    setScore(0);
    setFeedback(null);
    setIsGameOver(false);
  };

  const currentQ = shuffledChallenges[currentIndex] || CHALLENGES[0];

  const handlePickPomelo = (val: number) => {
    if (feedback || isGameOver) return;

    if (val === currentQ.answer) {
      soundManager.playCorrect();
      const newScore = score + 20;
      setScore(newScore);
      setBasket(prev => [...prev, val]);
      setFeedback({ text: `Chính xác! ${currentQ.expression} = ${val} (${currentQ.explain})`, isCorrect: true });

      if (basket.length + 1 >= 5) {
        // Win condition!
        soundManager.playFanfare();
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        setIsGameOver(true);
        // Save high score
        updateActiveProfile(p => ({
          ...p,
          stars: p.stars + 10,
          gameHighScores: {
            ...p.gameHighScores,
            pomeloHarvest: Math.max(p.gameHighScores.pomeloHarvest, newScore)
          }
        }));
      } else {
        setTimeout(() => {
          setFeedback(null);
          setCurrentIndex(prev => (prev + 1) % shuffledChallenges.length);
        }, 1200);
      }
    } else {
      soundManager.playWrong();
      setFeedback({ text: `Chưa đúng rồi! Bé thử tính lại biểu thức nhé: ${currentQ.expression}`, isCorrect: false });
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Trở về
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-2xl font-black text-sm border border-amber-300">
            <Trophy className="w-4 h-4 text-amber-600" />
            Điểm: {score}
          </div>
          <div className="bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-2xl font-black text-sm border border-emerald-300">
            🧺 Giỏ bưởi: {basket.length}/5 quả
          </div>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 rounded-3xl p-6 border-4 border-emerald-200 shadow-md relative overflow-hidden">
        {/* Title */}
        <div className="text-center mb-6">
          <span className="text-xs font-black uppercase tracking-wider bg-emerald-600 text-white px-3 py-1 rounded-full">
            Trò chơi SGK Toán 4 - Trang 18
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
            🌳 Trò Chơi: Hái Bưởi Cùng Rô-bốt
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Bé hãy tính nhẩm giá trị biểu thức và hái đúng quả bưởi mang kết quả đó vào giỏ nhé!
          </p>
        </div>

        {/* Robot Question Billboard */}
        {!isGameOver && (
          <div className="max-w-md mx-auto mb-6 bg-white p-4 rounded-3xl border-2 border-emerald-300 shadow-lg text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black text-xs px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Biểu thức cần tính
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono tracking-wide py-2">
              {currentQ.expression} = ?
            </div>
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div className={`max-w-md mx-auto mb-4 p-3 rounded-2xl text-center text-sm font-bold shadow-md animate-bounce ${
            feedback.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
          }`}>
            {feedback.text}
          </div>
        )}

        {/* Tree & Pomelos Area */}
        {!isGameOver ? (
          <div className="relative min-h-[360px] flex flex-col items-center justify-center">
            {/* SVG Tree Trunk & Foliage */}
            <svg viewBox="0 0 600 340" className="w-full max-w-xl h-auto pointer-events-none">
              {/* Trunk */}
              <path d="M 270 340 L 290 200 L 310 200 L 330 340 Z" fill="#854D0E" />
              <path d="M 285 240 Q 240 220 200 240" stroke="#854D0E" strokeWidth="14" fill="none" strokeLinecap="round" />
              <path d="M 315 240 Q 360 220 400 240" stroke="#854D0E" strokeWidth="14" fill="none" strokeLinecap="round" />
              {/* Foliage Clouds */}
              <circle cx="300" cy="140" r="110" fill="#22C55E" opacity="0.9" />
              <circle cx="210" cy="160" r="85" fill="#16A34A" opacity="0.9" />
              <circle cx="390" cy="160" r="85" fill="#16A34A" opacity="0.9" />
              <circle cx="260" cy="80" r="75" fill="#4ADE80" opacity="0.9" />
              <circle cx="340" cy="80" r="75" fill="#4ADE80" opacity="0.9" />
            </svg>

            {/* Clickable Pomelos distributed nicely on the tree */}
            <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 p-4 max-w-lg mx-auto">
              {POMELO_NUMBERS.map((num) => {
                const isTarget = currentQ && currentQ.answer === num;
                return (
                  <button
                    key={num}
                    onClick={() => handlePickPomelo(num)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-500 border-2 border-yellow-600 text-amber-950 font-black text-lg sm:text-xl shadow-lg hover:scale-115 active:scale-95 transition-all flex flex-col items-center justify-center relative cursor-pointer"
                  >
                    {/* Pomelo stem */}
                    <div className="w-1.5 h-3 bg-emerald-800 rounded -mt-2 mb-0.5"></div>
                    <span>{num}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Game Over Victory Screen */
          <div className="bg-white/95 rounded-3xl p-8 text-center max-w-md mx-auto shadow-xl border-2 border-emerald-300 my-6">
            <div className="text-6xl mb-3">🎉 🧺</div>
            <h3 className="text-2xl font-black text-emerald-700">Chúc Mừng Bé Xuất Sắc!</h3>
            <p className="text-slate-600 text-sm mt-2">
              Bé đã hái đủ <strong>5 quả bưởi chín ngọt</strong> cho giỏ của Rô-bốt! Nhận ngay <strong>+10 Sao Thưởng</strong> ⭐!
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={startNewGame}
                className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-700 shadow-lg flex items-center gap-2 transition-all hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" /> Chơi Lại Vòng Mới
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
              >
                Chọn Trò Chơi Khác
              </button>
            </div>
          </div>
        )}

        {/* Collected Basket at Bottom */}
        <div className="mt-4 pt-4 border-t border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              Rô-bốt bảo: Hãy nhớ tính trong ngoặc trước, nhân chia trước cộng trừ sau nhé!
            </span>
          </div>

          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  basket[i] !== undefined
                    ? 'bg-amber-400 text-amber-950 border border-amber-600 shadow-sm scale-110'
                    : 'bg-slate-200/80 text-slate-400 border border-slate-300'
                }`}
              >
                {basket[i] !== undefined ? basket[i] : (i + 1)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
