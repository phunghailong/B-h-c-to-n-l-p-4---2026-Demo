import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  BookOpen,
  Award,
  Gamepad2,
  ChevronRight,
  Flame,
  CheckCircle2,
  Lightbulb,
  Compass,
  Layers,
  HelpCircle
} from 'lucide-react';
import { StudentProfile, Topic } from '../types';
import { TOPICS, BADGES } from '../data/curriculumData';
import { computeTopicMastery } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface StudentHomeProps {
  profile: StudentProfile;
  onSelectTopicTheory: (topic: Topic) => void;
  onSelectTopicQuiz: (topicId: number | 'all') => void;
  onOpenGames: () => void;
  onOpenParent: () => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  profile,
  onSelectTopicTheory,
  onSelectTopicQuiz,
  onOpenGames,
  onOpenParent
}) => {
  const [selectedTipIndex, setSelectedTipIndex] = useState(0);
  const topicMasteries = computeTopicMastery(profile);

  const tips = [
    { title: 'Bí kíp dạng Tổng - Hiệu', content: 'Số bé = (Tổng - Hiệu) : 2. Số lớn = (Tổng + Hiệu) : 2. Luôn nhớ chia 2 trước nhé!', icon: '🍬' },
    { title: 'Nhớ nhanh góc bẹt', content: 'Lúc 6 giờ đúng, kim giờ và kim phút tạo thành một đường thẳng tắp có số đo đúng 180° = Góc bẹt!', icon: '⏰' },
    { title: 'Mẹo đổi Yến - Tạ - Tấn', content: '1 tấn = 10 tạ = 100 yến = 1000 kg. Cứ mỗi đơn vị liền kề gấp nhau 10 lần!', icon: '🐘' },
    { title: 'Làm tròn đến hàng trăm nghìn', content: 'Nhìn chữ số hàng chục nghìn: nếu từ 5 trở lên thì làm tròn lên, dưới 5 thì làm tròn xuống.', icon: '🎯' },
    { title: 'Tính chất giao hoán & kết hợp', content: 'a + b = b + a. Hãy ghép các số có tận cùng cộng lại tròn chục hoặc tròn trăm để tính siêu nhanh!', icon: '⚡' }
  ];

  const currentTip = tips[selectedTipIndex];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Friendly Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Glow circle */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Đồng hành cùng bé lớp 4 • Học kì 1
            </div>
            <h1 className="text-2xl sm:text-4xl font-black leading-tight">
              Chào {profile.name}! Sẵn sàng rinh điểm 10 Toán 4 chưa nào? 🚀
            </h1>
            <p className="text-white/90 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
              Ôn luyện kiến thức chuẩn SGK mới 2026, tham gia thử thách trắc nghiệm sinh động và chơi các trò chơi thú vị cùng Rô-bốt!
            </p>

            {/* Quick Actions in Hero */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onSelectTopicQuiz('all');
                }}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-amber-950" />
                Thi Thử Toàn Diện Kì 1 🎯
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenGames();
                }}
                className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4" />
                Vào Khu Trò Chơi 🎮
              </button>
            </div>
          </div>

          {/* Mascot Speech Card */}
          <div className="bg-white/95 text-slate-800 p-4 rounded-3xl shadow-xl max-w-xs w-full text-center border-2 border-emerald-200">
            <div className="text-5xl mb-1">🤖</div>
            <span className="font-black text-emerald-800 text-xs uppercase tracking-wider block">
              Bạn Rô-bốt Nhắc Bé:
            </span>
            <p className="text-xs text-slate-600 mt-1 font-bold leading-relaxed">
              &quot;Hôm nay chúng mình cùng giải bài toán Tổng - Hiệu và khám phá góc bẹt 180° nhé!&quot;
            </p>

            {/* Daily Goal Bar */}
            <div className="mt-3 pt-3 border-t border-slate-100 text-left">
              <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                <span>Mục tiêu học hôm nay</span>
                <span className="text-emerald-700 font-black">{profile.todayMinutes}/{profile.dailyGoalMinutes} phút</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.min(100, (profile.todayMinutes / profile.dailyGoalMinutes) * 100)}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Robot Math Tip of the Day */}
      <div className="bg-amber-50 rounded-3xl p-4 sm:p-5 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shrink-0 shadow-sm">
            {currentTip.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Mẹo Toán Nhanh Của Rô-bốt
              </span>
              <span className="font-black text-slate-800 text-sm">{currentTip.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed font-semibold">
              {currentTip.content}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setSelectedTipIndex((prev) => (prev + 1) % tips.length);
          }}
          className="shrink-0 px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-black hover:bg-amber-100 transition-all cursor-pointer shadow-xs"
        >
          Đổi mẹo khác ➜
        </button>
      </div>

      {/* 7 Curriculum Topics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Khung Chương Trình Chuẩn
            </span>
            <h2 className="text-2xl font-black text-slate-800 mt-1">
              7 Chủ Đề Trọng Tâm Toán 4 - Học Kì 1
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOPICS.map((topic) => {
            const mastery = topicMasteries.find((m) => m.topicId === topic.id);
            const percentage = mastery ? mastery.percentage : 0;
            const attempted = mastery ? mastery.attempted : 0;

            return (
              <div
                key={topic.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-300"
              >
                <div>
                  {/* Topic badge & stats */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white font-black flex items-center justify-center text-sm shadow-xs">
                      #{topic.id}
                    </span>
                    <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {topic.lessons.length} bài học
                    </span>
                  </div>

                  <h3 className="font-black text-slate-800 text-lg group-hover:text-emerald-700 transition-colors leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 mt-1 leading-relaxed">
                    {topic.subtitle}
                  </p>

                  {/* Mastery mini progress */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                      <span>Độ thành thạo</span>
                      <span className="text-emerald-700 font-black">
                        {attempted > 0 ? `${percentage}% (${mastery?.correct}/${attempted} câu)` : 'Chưa luyện tập'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="h-full bg-emerald-500 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2 mt-5 pt-3">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectTopicTheory(topic);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-black text-xs transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Lý Thuyết
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectTopicQuiz(topic.id);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Luyện Tập
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges & Hall of Fame */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              Thành Tích Của Bé
            </span>
            <h2 className="text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Bảng Vàng Danh Dự & Huy Hiệu Đã Đạt
            </h2>
          </div>
          <div className="text-xs font-bold text-slate-500">
            Đã mở khóa: <strong className="text-amber-600">{profile.unlockedBadges.length} / {BADGES.length}</strong> huy hiệu
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {BADGES.map((badge) => {
            const isUnlocked = profile.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/50 border-amber-300 shadow-xs scale-102'
                    : 'bg-slate-50 border-slate-200 opacity-40 grayscale'
                }`}
              >
                <div className="text-3xl mb-1.5">{badge.icon}</div>
                <h4 className="font-black text-xs text-slate-800 leading-snug line-clamp-1">{badge.title}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">{badge.description}</p>
                <span
                  className={`inline-block mt-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isUnlocked ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isUnlocked ? 'Đã đạt ✓' : 'Chưa mở'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
