import React, { useState } from 'react';
import { ArrowLeft, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import { updateActiveProfile } from '../../utils/storage';

interface ShapeItem {
  id: string;
  question: string;
  diagramSvg: React.ReactNode;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const AngleHunterGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [rescuedDinos, setRescuedDinos] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const ITEMS: ShapeItem[] = [
    {
      id: 'g1',
      question: 'Góc tạo bởi hai tia dưới đây (số đo 45°) là góc gì?',
      diagramSvg: (
        <svg width="180" height="120" viewBox="0 0 180 120" className="mx-auto">
          <line x1="30" y1="100" x2="160" y2="100" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="100" x2="120" y2="25" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="100" r="5" fill="#0284C7" />
          <path d="M 60 100 A 30 30 0 0 0 52 75" fill="none" stroke="#E11D48" strokeWidth="2" />
          <text x="68" y="85" fontSize="12" fontWeight="bold" fill="#E11D48">45°</text>
        </svg>
      ),
      options: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      correctAnswer: 'Góc nhọn',
      explanation: 'Số đo 45° nhỏ hơn 90° nên là góc nhọn!'
    },
    {
      id: 'g2',
      question: 'Khi đồng hồ chỉ đúng 3 giờ, hai kim tạo thành góc gì?',
      diagramSvg: (
        <svg width="140" height="140" viewBox="0 0 140 140" className="mx-auto">
          <circle cx="70" cy="70" r="60" fill="#F8FAFC" stroke="#334155" strokeWidth="3" />
          <circle cx="70" cy="70" r="4" fill="#0F172A" />
          {/* 12 o'clock minute hand */}
          <line x1="70" y1="70" x2="70" y2="25" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
          {/* 3 o'clock hour hand */}
          <line x1="70" y1="70" x2="110" y2="70" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />
          <rect x="70" y="55" width="15" height="15" fill="none" stroke="#2563EB" strokeWidth="2" />
          <text x="66" y="22" fontSize="11" fontWeight="bold" fill="#64748B">12</text>
          <text x="116" y="74" fontSize="11" fontWeight="bold" fill="#64748B">3</text>
        </svg>
      ),
      options: ['Góc vuông (90°)', 'Góc nhọn', 'Góc tù', 'Góc bẹt'],
      correctAnswer: 'Góc vuông (90°)',
      explanation: 'Lúc 3 giờ, kim phút chỉ số 12 và kim giờ chỉ số 3 tạo thành một góc vuông 90°!'
    },
    {
      id: 'g3',
      question: 'Góc có số đo 125° dưới đây là góc gì?',
      diagramSvg: (
        <svg width="180" height="120" viewBox="0 0 180 120" className="mx-auto">
          <line x1="90" y1="100" x2="170" y2="100" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <line x1="90" y1="100" x2="30" y2="40" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
          <circle cx="90" cy="100" r="5" fill="#0284C7" />
          <path d="M 120 100 A 30 30 0 0 0 65 72" fill="none" stroke="#E11D48" strokeWidth="2" />
          <text x="80" y="70" fontSize="12" fontWeight="bold" fill="#E11D48">125°</text>
        </svg>
      ),
      options: ['Góc tù', 'Góc nhọn', 'Góc vuông', 'Góc bẹt'],
      correctAnswer: 'Góc tù',
      explanation: '125° lớn hơn 90° và nhỏ hơn 180° nên là góc tù!'
    },
    {
      id: 'g4',
      question: 'Hình dưới đây có 4 cạnh bằng nhau và 2 đường chéo vuông góc. Đó là hình gì?',
      diagramSvg: (
        <svg width="160" height="120" viewBox="0 0 160 120" className="mx-auto">
          <polygon points="80,15 145,60 80,105 15,60" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" />
          <line x1="80" y1="15" x2="80" y2="105" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="15" y1="60" x2="145" y2="60" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="4,4" />
        </svg>
      ),
      options: ['Hình thoi', 'Hình thang', 'Hình chữ nhật', 'Hình bình hành không đều'],
      correctAnswer: 'Hình thoi',
      explanation: 'Hình thoi có bốn cạnh bằng nhau và 2 cặp cạnh đối diện song song, hai đường chéo vuông góc!'
    },
    {
      id: 'g5',
      question: 'Hình dưới đây có 2 cặp cạnh đối diện song song và bằng nhau. Đó là hình gì?',
      diagramSvg: (
        <svg width="180" height="100" viewBox="0 0 180 100" className="mx-auto">
          <polygon points="50,20 160,20 130,80 20,80" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
        </svg>
      ),
      options: ['Hình bình hành', 'Hình tam giác', 'Hình vuông', 'Hình ngũ giác'],
      correctAnswer: 'Hình bình hành',
      explanation: 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau!'
    }
  ];

  const currentItem = ITEMS[currentIdx];

  const handleAnswer = (opt: string) => {
    if (feedback || isFinished) return;

    if (opt === currentItem.correctAnswer) {
      soundManager.playCorrect();
      const newScore = score + 25;
      const newRescued = rescuedDinos + 1;
      setScore(newScore);
      setRescuedDinos(newRescued);
      setFeedback({ text: `Xuất sắc! ${currentItem.explanation} 🦕 Giải cứu thành công!`, isCorrect: true });

      if (currentIdx + 1 >= ITEMS.length) {
        soundManager.playFanfare();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setIsFinished(true);
        updateActiveProfile(p => ({
          ...p,
          stars: p.stars + 15,
          gameHighScores: {
            ...p.gameHighScores,
            angleHunter: Math.max(p.gameHighScores.angleHunter, newScore)
          }
        }));
      } else {
        setTimeout(() => {
          setFeedback(null);
          setCurrentIdx(prev => prev + 1);
        }, 1300);
      }
    } else {
      soundManager.playWrong();
      setFeedback({ text: `Chưa đúng! ${currentItem.explanation}`, isCorrect: false });
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setScore(0);
    setRescuedDinos(0);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Trở về
        </button>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-900 px-4 py-1.5 rounded-2xl font-black text-sm border border-amber-300 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-600" />
            Điểm: {score}
          </div>
          <div className="bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-2xl font-black text-sm border border-emerald-300">
            🦕 Đã cứu: {rescuedDinos}/{ITEMS.length} bạn
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-teal-50 via-emerald-50 to-amber-50 rounded-3xl p-6 border-4 border-teal-200 shadow-md">
        <div className="text-center mb-6">
          <span className="text-xs font-black uppercase tracking-wider bg-teal-600 text-white px-3 py-1 rounded-full">
            Trò chơi SGK Toán 4 - Trang 29
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
            🦕 Giải Cứu Khủng Long: Thợ Săn Góc & Hình Học
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Nhận diện đúng góc nhọn, góc vuông, góc tù, góc bẹt, hình thoi, hình bình hành để giải cứu những chú khủng long đáng yêu!
          </p>
        </div>

        {!isFinished ? (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl border-2 border-teal-200 shadow-lg text-center">
            <span className="text-xs font-bold text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full">
              Câu {currentIdx + 1} / {ITEMS.length}
            </span>

            <h3 className="text-lg sm:text-xl font-black text-slate-800 mt-3 mb-4">
              {currentItem.question}
            </h3>

            {/* Diagram */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6 flex justify-center items-center">
              {currentItem.diagramSvg}
            </div>

            {feedback && (
              <div className={`mb-4 p-3 rounded-2xl text-white font-bold text-sm shadow-md animate-bounce ${
                feedback.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
              }`}>
                {feedback.text}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {currentItem.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="py-3 px-4 rounded-2xl bg-slate-50 hover:bg-teal-50 border-2 border-slate-200 hover:border-teal-400 font-black text-teal-950 text-sm sm:text-base transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-auto shadow-xl border-2 border-teal-300">
            <div className="text-6xl mb-3">🦕 🦖 🌟</div>
            <h3 className="text-2xl font-black text-teal-800">Bé Là Bậc Thầy Hình Học!</h3>
            <p className="text-slate-600 text-sm mt-2">
              Bé đã giải cứu toàn bộ <strong>{ITEMS.length} chú khủng long</strong> và nắm vững các loại góc & hình học Kì 1! Nhận ngay <strong>+15 Sao Thưởng</strong> ⭐!
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={restart}
                className="px-6 py-3 rounded-2xl bg-teal-600 text-white font-black hover:bg-teal-700 shadow-lg flex items-center gap-2 transition-all hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" /> Thử Thách Lại
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
      </div>
    </div>
  );
};
