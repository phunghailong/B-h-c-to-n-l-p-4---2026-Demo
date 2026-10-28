import React, { useState } from 'react';
import { Gamepad2, Trophy, Star, Sparkles, Play, Flame, ArrowLeft } from 'lucide-react';
import { PomeloGame } from './games/PomeloGame';
import { UnitRacerGame } from './games/UnitRacerGame';
import { AngleHunterGame } from './games/AngleHunterGame';
import { StudentProfile } from '../types';
import { soundManager } from '../utils/audio';

interface GamesHubProps {
  profile: StudentProfile;
  onBack: () => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ profile, onBack }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'pomelo') {
    return <PomeloGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'unit_racer') {
    return <UnitRacerGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'angle_hunter') {
    return <AngleHunterGame onBack={() => setActiveGame(null)} />;
  }

  const games = [
    {
      id: 'pomelo',
      title: 'Hái Bưởi Cùng Rô-bốt',
      subtitle: 'SGK Trang 18 • Biểu thức chứa chữ & thứ tự tính',
      icon: '🌳 🧺',
      badge: 'Được yêu thích nhất',
      color: 'from-amber-400 to-orange-500',
      border: 'border-amber-300',
      bgLight: 'bg-amber-50',
      highScore: profile.gameHighScores?.pomeloHarvest || 0,
      description: 'Tính nhẩm nhanh giá trị biểu thức và hái đúng quả bưởi chín trên cây để ghi điểm cao!'
    },
    {
      id: 'unit_racer',
      title: 'Đường Đua Số Đo & Cân Voi',
      subtitle: 'SGK Trang 65 & 72 • Yến, tạ, tấn, m², thế kỉ',
      icon: '🐘 🏎️',
      badge: 'Chinh phục đại lượng',
      color: 'from-indigo-500 to-purple-600',
      border: 'border-indigo-300',
      bgLight: 'bg-indigo-50',
      highScore: profile.gameHighScores?.unitRacer || 0,
      description: 'Giúp chú voi con vượt qua 6 chặng cầu số đo bằng cách đổi đúng các đơn vị khối lượng và diện tích!'
    },
    {
      id: 'angle_hunter',
      title: 'Giải Cứu Khủng Long: Thợ Săn Góc',
      subtitle: 'SGK Trang 29 & 107 • Góc nhọn, tù, bẹt, hình thoi',
      icon: '🦕 📐',
      badge: 'Bậc thầy hình học',
      color: 'from-teal-500 to-emerald-600',
      border: 'border-teal-300',
      bgLight: 'bg-teal-50',
      highScore: profile.gameHighScores?.angleHunter || 0,
      description: 'Xác định nhanh số đo góc trên mặt đồng hồ và nhận diện hình bình hành, hình thoi để giải cứu đàn khủng long!'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Trở về Trang Học
        </button>

        <div className="flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-4 py-1.5 rounded-2xl font-black text-sm">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          Tổng sao tích lũy: {profile.stars} ⭐
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-black text-xs uppercase tracking-wider mb-2">
          <Gamepad2 className="w-4 h-4" /> Vừa Học Vừa Chơi - Củng Cố Kiến Thức
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800">
          🎮 Khu Vườn Trò Chơi Toán Học 4
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Các trò chơi tương tác sinh động được chuyển thể trực tiếp từ các hoạt động vui học trong Sách giáo khoa Toán 4 mới nhất!
        </p>
      </div>

      {/* Grid of Games */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((g) => (
          <div
            key={g.id}
            className={`rounded-3xl border-2 ${g.border} ${g.bgLight} p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:-translate-y-1`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{g.icon.split(' ')[0]}</span>
                <span className="text-[11px] font-black uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-slate-200 text-slate-700 shadow-xs">
                  {g.badge}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-800 mb-1">{g.title}</h3>
              <p className="text-xs font-bold text-slate-500 mb-3">{g.subtitle}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {g.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-4">
                <span className="flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" /> Kỉ lục:
                </span>
                <span className="font-black text-slate-800 text-sm">{g.highScore} điểm</span>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveGame(g.id);
                }}
                className={`w-full py-3 rounded-2xl bg-gradient-to-r ${g.color} text-white font-black text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer`}
              >
                <Play className="w-4 h-4 fill-white" /> Bắt Đầu Chơi Ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
