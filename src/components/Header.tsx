import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldCheck, Star, Flame, Trophy, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  profile: StudentProfile;
  onOpenParentDashboard: () => void;
  onGoHome: () => void;
  onOpenGames: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenParentDashboard,
  onGoHome,
  onOpenGames
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);

  const toggleMute = () => {
    soundManager.isMuted = !soundManager.isMuted;
    setIsMuted(soundManager.isMuted);
    if (!soundManager.isMuted) soundManager.playClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Brand */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-all">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-800 text-lg sm:text-xl tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                Toán 4 Kì 1
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-300">
                GDPT Mới
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 hidden sm:block">
              Kết Nối Tri Thức Với Cuộc Sống
            </p>
          </div>
        </div>

        {/* Right Info Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Games Tab */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenGames();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer"
          >
            <span>🎮</span>
            <span className="hidden sm:inline">Trò Chơi</span>
          </button>

          {/* Stars Pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-2xl font-black text-xs sm:text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
            <span>{profile.stars}</span>
          </div>

          {/* Streak Pill */}
          <div className="flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-2xl font-black text-xs sm:text-sm">
            <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{profile.streakDays} ngày</span>
          </div>

          {/* Student Profile Pill */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
            <span className="text-base">{profile.avatar}</span>
            <span>{profile.name}</span>
          </div>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Parent Mode Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenParentDashboard();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-black text-xs transition-all shadow-xs cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Phụ Huynh</span>
          </button>
        </div>
      </div>
    </header>
  );
};
