import React, { useState } from 'react';
import { ArrowLeft, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import { updateActiveProfile } from '../../utils/storage';

interface UnitChallenge {
  prompt: string;
  options: string[];
  correctAnswer: string;
  tip: string;
}

const UNIT_QUESTIONS: UnitChallenge[] = [
  { prompt: '1 yến bằng bao nhiêu ki-lô-gam (kg)?', options: ['10 kg', '100 kg', '1000 kg'], correctAnswer: '10 kg', tip: '1 yến = 10 kg' },
  { prompt: '1 tạ bằng bao nhiêu yến?', options: ['10 yến', '100 yến', '5 yến'], correctAnswer: '10 yến', tip: '1 tạ = 10 yến = 100 kg' },
  { prompt: '1 tấn bằng bao nhiêu tạ?', options: ['10 tạ', '100 tạ', '1000 tạ'], correctAnswer: '10 tạ', tip: '1 tấn = 10 tạ = 1000 kg' },
  { prompt: '1 m² bằng bao nhiêu đề-xi-mét vuông (dm²)?', options: ['100 dm²', '10 dm²', '1000 dm²'], correctAnswer: '100 dm²', tip: '1 m² = 100 dm²' },
  { prompt: '1 dm² bằng bao nhiêu xăng-ti-mét vuông (cm²)?', options: ['100 cm²', '10 cm²', '1000 cm²'], correctAnswer: '100 cm²', tip: '1 dm² = 100 cm²' },
  { prompt: '1 thế kỉ có bao nhiêu năm?', options: ['100 năm', '10 năm', '1000 năm'], correctAnswer: '100 năm', tip: '1 thế kỉ = 100 năm' },
  { prompt: '3 phút bằng bao nhiêu giây?', options: ['180 giây', '120 giây', '300 giây'], correctAnswer: '180 giây', tip: '3 × 60 = 180 giây' },
  { prompt: '2 tấn 5 tạ bằng bao nhiêu tạ?', options: ['25 tạ', '205 tạ', '250 tạ'], correctAnswer: '25 tạ', tip: '2 tấn = 20 tạ; 20 + 5 = 25 tạ' },
  { prompt: 'Năm 2026 thuộc thế kỉ nào?', options: ['Thế kỉ XXI', 'Thế kỉ XX', 'Thế kỉ XIX'], correctAnswer: 'Thế kỉ XXI', tip: 'Từ 2001 đến 2100 là thế kỉ XXI' }
];

export const UnitRacerGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(0); // 0 to 6
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isWon, setIsWon] = useState(false);

  const totalSteps = 6;
  const currentQ = UNIT_QUESTIONS[currentQIndex % UNIT_QUESTIONS.length];

  const handleSelectOption = (opt: string) => {
    if (feedback || isWon) return;

    if (opt === currentQ.correctAnswer) {
      soundManager.playCorrect();
      setFeedback('Chính xác! Chú voi con tiến lên 1 bước! 🐘💨');
      const nextStep = step + 1;
      setStep(nextStep);

      if (nextStep >= totalSteps) {
        soundManager.playFanfare();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setIsWon(true);
        updateActiveProfile(p => ({
          ...p,
          stars: p.stars + 15,
          gameHighScores: {
            ...p.gameHighScores,
            unitRacer: Math.max(p.gameHighScores.unitRacer, 100)
          }
        }));
      } else {
        setTimeout(() => {
          setFeedback(null);
          setCurrentQIndex(prev => prev + 1);
        }, 1200);
      }
    } else {
      soundManager.playWrong();
      setFeedback(`Chưa đúng rồi! Gợi ý: ${currentQ.tip}`);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const restart = () => {
    setStep(0);
    setCurrentQIndex(0);
    setFeedback(null);
    setIsWon(false);
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

        <div className="flex items-center gap-2 bg-violet-100 text-violet-900 px-4 py-1.5 rounded-2xl font-black text-sm border border-violet-300">
          <Trophy className="w-4 h-4 text-violet-600" />
          Tiến trình: {step}/{totalSteps} chặng
        </div>
      </div>

      <div className="bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 border-4 border-indigo-200 shadow-md">
        <div className="text-center mb-6">
          <span className="text-xs font-black uppercase tracking-wider bg-indigo-600 text-white px-3 py-1 rounded-full">
            Trò chơi SGK Toán 4 - Trang 65
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
            🐘 Đường Đua Số Đo & Đại Lượng
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Giúp chú voi con vượt qua 6 chặng thử thách đổi đơn vị khối lượng, diện tích, thời gian để về đích!
          </p>
        </div>

        {/* Track visualization */}
        <div className="bg-white p-4 rounded-3xl border-2 border-indigo-200 mb-6 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px] relative px-4 py-3">
            {/* Connecting line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-2.5 bg-slate-200 rounded-full z-0">
              <div
                style={{ width: `${(step / totalSteps) * 100}%` }}
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              ></div>
            </div>

            {/* Checkpoints */}
            {[...Array(totalSteps + 1)].map((_, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all ${
                    i <= step
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-110'
                      : 'bg-white text-slate-400 border-slate-300'
                  }`}
                >
                  {i === totalSteps ? '🏆' : i + 1}
                </div>
                {i === step && !isWon && (
                  <span className="absolute -top-7 text-2xl animate-bounce">
                    🐘
                  </span>
                )}
                <span className="text-[11px] font-bold text-slate-500 mt-1">
                  {i === 0 ? 'Xuất phát' : i === totalSteps ? 'Đích' : `Trạm ${i}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Question Area */}
        {!isWon ? (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl border-2 border-indigo-200 shadow-lg text-center">
            <span className="text-xs font-bold text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
              Thử thách trạm {step + 1}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-3 mb-6">
              {currentQ.prompt}
            </h3>

            {feedback && (
              <div className="mb-4 p-3 rounded-2xl bg-indigo-500 text-white font-bold text-sm shadow-md animate-pulse">
                {feedback}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className="py-3.5 px-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 font-black text-indigo-950 text-base transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-auto shadow-xl border-2 border-indigo-300">
            <div className="text-6xl mb-3">🏆 🐘 🥇</div>
            <h3 className="text-2xl font-black text-indigo-800">Cúp Vàng Về Tay Bé!</h3>
            <p className="text-slate-600 text-sm mt-2">
              Bé đã xuất sắc chinh phục toàn bộ các đơn vị đại lượng (Yến, Tạ, Tấn, m², dm², Thế kỉ)! Nhận ngay <strong>+15 Sao Thưởng</strong> ⭐!
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={restart}
                className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 shadow-lg flex items-center gap-2 transition-all hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" /> Đua Tiếp Vòng Mới
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
