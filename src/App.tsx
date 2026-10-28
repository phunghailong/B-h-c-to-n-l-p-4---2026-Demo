import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StudentHome } from './components/StudentHome';
import { TheorySection } from './components/TheorySection';
import { PracticeQuiz } from './components/PracticeQuiz';
import { GamesHub } from './components/GamesHub';
import { ParentDashboard } from './components/ParentDashboard';
import { getActiveProfile, getProfiles } from './utils/storage';
import { StudentProfile, Topic } from './types';
import { TOPICS } from './data/curriculumData';
import { BookOpen, Search, X, Sparkles } from 'lucide-react';
import { soundManager } from './utils/audio';

// Glossary from SGK Trang 131
const GLOSSARY_TERMS = [
  { term: 'Biểu thức chứa chữ', desc: 'Biểu thức có chứa các chữ cái thay cho số (ví dụ: a + 4, (a + b) x 2). Thay chữ bằng số sẽ tính được một giá trị của biểu thức.' },
  { term: 'Dãy số tự nhiên', desc: 'Dãy số 0, 1, 2, 3, 4, 5... Số tự nhiên bé nhất là 0. Không có số tự nhiên lớn nhất. Hai số liên tiếp hơn kém nhau 1 đơn vị.' },
  { term: 'Số chẵn', desc: 'Số chia hết cho 2, có chữ số tận cùng là 0, 2, 4, 6, 8.' },
  { term: 'Số lẻ', desc: 'Số không chia hết cho 2, có chữ số tận cùng là 1, 3, 5, 7, 9.' },
  { term: 'Góc nhọn', desc: 'Góc có số đo lớn hơn 0° và bé hơn 90° (bé hơn góc vuông).' },
  { term: 'Góc vuông', desc: 'Góc có số đo bằng đúng 90°.' },
  { term: 'Góc tù', desc: 'Góc có số đo lớn hơn 90° và bé hơn 180° (lớn hơn góc vuông).' },
  { term: 'Góc bẹt', desc: 'Góc có số đo bằng đúng 180° (bằng 2 góc vuông, hai cạnh tạo thành một đường thẳng).' },
  { term: 'Hai đường thẳng vuông góc', desc: 'Hai đường thẳng cắt nhau tạo thành bốn góc vuông có chung một đỉnh.' },
  { term: 'Hai đường thẳng song song', desc: 'Hai đường thẳng không bao giờ cắt nhau dù kéo dài mãi về cả hai phía.' },
  { term: 'Hình bình hành', desc: 'Hình có hai cặp cạnh đối diện song song và bằng nhau.' },
  { term: 'Hình thoi', desc: 'Hình có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau. Hai đường chéo vuông góc tại trung điểm.' },
  { term: 'Hàng và Lớp', desc: 'Lớp đơn vị (đơn vị, chục, trăm); Lớp nghìn (nghìn, chục nghìn, trăm nghìn); Lớp triệu (triệu, chục triệu, trăm triệu).' },
  { term: 'Yến, Tạ, Tấn', desc: '1 yến = 10 kg; 1 tạ = 100 kg = 10 yến; 1 tấn = 1 000 kg = 10 tạ.' },
  { term: 'Đơn vị đo diện tích (m², dm², mm²)', desc: '1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².' },
  { term: 'Giây, Thế kỉ', desc: '1 phút = 60 giây; 1 thế kỉ = 100 năm. Từ năm 2001 đến năm 2100 là thế kỉ XXI.' },
  { term: 'Tính chất giao hoán', desc: 'Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi: a + b = b + a.' },
  { term: 'Tính chất kết hợp', desc: 'Khi cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba: (a + b) + c = a + (b + c).' },
  { term: 'Tìm hai số biết Tổng và Hiệu', desc: 'Số bé = (Tổng - Hiệu) : 2. Số lớn = (Tổng + Hiệu) : 2.' }
];

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(getActiveProfile());
  const [activeView, setActiveView] = useState<'home' | 'theory' | 'quiz' | 'games' | 'parent'>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic>(TOPICS[0]);
  const [selectedQuizTopicId, setSelectedQuizTopicId] = useState<number | 'all'>(1);
  const [showGlossary, setShowGlossary] = useState<boolean>(false);
  const [glossaryFilter, setGlossaryFilter] = useState<string>('');

  const refreshProfile = () => {
    setProfile(getActiveProfile());
  };

  // Switch views
  const handleSelectTopicTheory = (topic: Topic) => {
    setSelectedTopic(topic);
    setActiveView('theory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopicQuiz = (topicId: number | 'all') => {
    setSelectedQuizTopicId(topicId);
    setActiveView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredGlossary = GLOSSARY_TERMS.filter(item =>
    item.term.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
    item.desc.toLowerCase().includes(glossaryFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      {/* Top Header */}
      <Header
        profile={profile}
        onOpenParentDashboard={() => setActiveView('parent')}
        onGoHome={() => setActiveView('home')}
        onOpenGames={() => setActiveView('games')}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeView === 'home' && (
          <StudentHome
            profile={profile}
            onSelectTopicTheory={handleSelectTopicTheory}
            onSelectTopicQuiz={handleSelectTopicQuiz}
            onOpenGames={() => setActiveView('games')}
            onOpenParent={() => setActiveView('parent')}
          />
        )}

        {activeView === 'theory' && (
          <TheorySection
            topic={selectedTopic}
            onBack={() => setActiveView('home')}
            onStartQuiz={(topicId) => handleSelectTopicQuiz(topicId)}
          />
        )}

        {activeView === 'quiz' && (
          <PracticeQuiz
            topicId={selectedQuizTopicId}
            onBack={() => {
              refreshProfile();
              setActiveView('home');
            }}
            onFinished={() => refreshProfile()}
          />
        )}

        {activeView === 'games' && (
          <GamesHub
            profile={profile}
            onBack={() => {
              refreshProfile();
              setActiveView('home');
            }}
          />
        )}

        {activeView === 'parent' && (
          <ParentDashboard
            profile={profile}
            onClose={() => {
              refreshProfile();
              setActiveView('home');
            }}
            onRefreshProfile={refreshProfile}
          />
        )}
      </main>

      {/* Floating Glossary Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => {
            soundManager.playClick();
            setShowGlossary(true);
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-white font-black text-xs sm:text-sm shadow-xl hover:bg-slate-800 hover:scale-105 transition-all cursor-pointer border-2 border-slate-700"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Từ Điển Toán 4</span>
        </button>
      </div>

      {/* Glossary Modal */}
      {showGlossary && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl max-h-[85vh] flex flex-col border-2 border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Từ Điển Thuật Ngữ Toán 4 Kì 1
                  </h3>
                  <p className="text-xs text-slate-500">
                    Theo mục lục thuật ngữ SGK trang 131 - Kết nối tri thức
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGlossary(false)}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter */}
            <div className="my-3 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={glossaryFilter}
                onChange={(e) => setGlossaryFilter(e.target.value)}
                placeholder="Tìm thuật ngữ (ví dụ: góc tù, yến, hình thoi, số chẵn)..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>

            {/* List */}
            <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
              {filteredGlossary.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                  <h4 className="font-black text-emerald-800 mb-0.5">{item.term}</h4>
                  <p className="text-slate-700 leading-relaxed">{item.desc}</p>
                </div>
              ))}
              {filteredGlossary.length === 0 && (
                <div className="p-6 text-center text-slate-500 text-sm">
                  Không tìm thấy thuật ngữ phù hợp.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-bold text-slate-700">
            Ứng Dụng Vui Học Toán 4 - Ôn Tập Học Kì 1 (Chương Trình GDPT 2018 / 2026 Hiện Hành)
          </p>
          <p className="text-[11px] text-slate-400">
            Dựa trên bộ sách giáo khoa &quot;Kết nối tri thức với cuộc sống&quot; - Nhà xuất bản Giáo dục Việt Nam.
          </p>
        </div>
      </footer>
    </div>
  );
}
