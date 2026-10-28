import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Award,
  Printer,
  Settings,
  Lock,
  ChevronRight,
  RefreshCw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { StudentProfile, TopicMastery, QuizAttempt } from '../types';
import { TOPICS, BADGES } from '../data/curriculumData';
import { computeTopicMastery, getParentPin, setParentPin, updateActiveProfile, saveProfiles, getProfiles } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface ParentDashboardProps {
  profile: StudentProfile;
  onClose: () => void;
  onRefreshProfile: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ profile, onClose, onRefreshProfile }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'mastery' | 'history' | 'settings'>('overview');
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(null);

  // Settings state
  const [targetMinutes, setTargetMinutes] = useState<number>(profile.dailyGoalMinutes || 15);
  const [newStudentName, setNewStudentName] = useState<string>(profile.name);
  const [newGrade, setNewGrade] = useState<string>(profile.grade);
  const [newPin, setNewPin] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Print mode
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);

  const topicMasteryList = computeTopicMastery(profile);

  // Aggregate stats
  const totalAttempts = profile.history.length;
  const totalAnsweredQuestions = profile.history.reduce((acc, h) => acc + h.totalQuestions, 0);
  const totalCorrectQuestions = profile.history.reduce(
    (acc, h) => acc + h.answers.filter(a => a.isCorrect).length,
    0
  );
  const avgAccuracy = totalAnsweredQuestions > 0 ? Math.round((totalCorrectQuestions / totalAnsweredQuestions) * 100) : 0;

  // Grade classification
  const getOverallRanking = (acc: number) => {
    if (acc >= 90) return { label: 'Xuất sắc', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (acc >= 75) return { label: 'Khá Giỏi', color: 'text-blue-700 bg-blue-100 border-blue-300' };
    if (acc >= 50) return { label: 'Trung Bình Khá', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    return { label: 'Cần Luyện Thêm', color: 'text-rose-700 bg-rose-100 border-rose-300' };
  };

  const ranking = getOverallRanking(avgAccuracy);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = getParentPin();
    if (pinInput === storedPin || pinInput === '2026') {
      setIsAuthenticated(true);
      setPinError(false);
      soundManager.playCorrect();
    } else {
      setPinError(true);
      soundManager.playWrong();
    }
  };

  const handleSaveSettings = () => {
    updateActiveProfile(prev => ({
      ...prev,
      name: newStudentName.trim() || prev.name,
      grade: newGrade.trim() || prev.grade,
      dailyGoalMinutes: Number(targetMinutes) || 15
    }));
    if (newPin.trim().length >= 4) {
      setParentPin(newPin.trim());
    }
    setSaveSuccessMsg('Đã lưu cấu hình học tập thành công!');
    soundManager.playCorrect();
    onRefreshProfile();
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  // If PIN protection modal is not yet passed:
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Cổng Dành Cho Phụ Huynh</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Nhập mã bảo vệ để theo dõi tiến độ, phân tích năng lực và quản lý kế hoạch học tập của con.
            </p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Mã PIN Phụ Huynh (Mặc định: <code className="text-blue-700 bg-blue-50 px-1 rounded">2026</code>)
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Nhập mã PIN..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-blue-500"
                autoFocus
              />
              {pinError && (
                <p className="text-rose-600 text-xs font-bold mt-1 text-center">
                  Mã PIN không đúng. Gợi ý: nhập <span className="underline">2026</span>
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all text-sm"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-all shadow-md text-sm"
              >
                Mở Bảng Điều Khiển
              </button>
            </div>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setPinInput('2026');
                setIsAuthenticated(true);
              }}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              👉 Vào nhanh bằng mã mặc định 2026
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If in Print/Certificate mode
  if (isPrintMode) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6 no-print">
          <button
            onClick={() => setIsPrintMode(false)}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm"
          >
            ← Quay lại Bảng điều khiển
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl font-black text-sm flex items-center gap-2 shadow-md"
          >
            <Printer className="w-4 h-4" /> In Báo Cáo / Lưu PDF
          </button>
        </div>

        {/* Printable Certificate & Report Card */}
        <div className="border-8 border-double border-amber-400 p-8 rounded-3xl bg-amber-50/20 text-center relative shadow-lg">
          <div className="text-5xl mb-2">⭐ 🎓 🏆</div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-4 py-1 rounded-full">
            BỘ GIÁO DỤC VÀ ĐÀO TẠO • CHƯƠNG TRÌNH GDPT MỚI
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3 uppercase tracking-wide">
            PHIẾU ĐÁNH GIÁ NĂNG LỰC TOÁN 4 - HỌC KÌ 1
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Theo khung chương trình Sách Giáo Khoa Toán 4 Tập 1 - Kết nối tri thức với cuộc sống
          </p>

          <div className="my-6 p-4 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Họ và tên học sinh:</span>
              <strong className="text-slate-900 text-base">{profile.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Lớp học:</span>
              <strong className="text-slate-800">{profile.grade}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tổng thời gian học tập:</span>
              <strong className="text-slate-800">{profile.totalTimeMinutes} phút</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tổng số sao tích lũy:</span>
              <strong className="text-amber-600">{profile.stars} ⭐</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tỷ lệ chính xác trung bình:</span>
              <strong className="text-emerald-700 text-base">{avgAccuracy}% ({ranking.label})</strong>
            </div>
          </div>

          {/* Topics status table */}
          <div className="text-left max-w-2xl mx-auto my-6">
            <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-2">
              KẾT QUẢ ĐẠT ĐƯỢC THEO TỪNG CHỦ ĐỀ:
            </h4>
            <table className="w-full text-xs border-collapse bg-white rounded-xl overflow-hidden border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5 text-left">Chủ đề</th>
                  <th className="p-2.5 text-center">Đã làm</th>
                  <th className="p-2.5 text-center">Tỷ lệ đúng</th>
                  <th className="p-2.5 text-right">Đánh giá năng lực</th>
                </tr>
              </thead>
              <tbody>
                {topicMasteryList.map(tm => (
                  <tr key={tm.topicId} className="border-b border-slate-100">
                    <td className="p-2 font-bold text-slate-800">{tm.topicTitle}</td>
                    <td className="p-2 text-center text-slate-600">{tm.attempted} câu</td>
                    <td className="p-2 text-center font-bold text-emerald-700">{tm.percentage}%</td>
                    <td className="p-2 text-right">
                      <span className={`px-2 py-0.5 rounded font-black text-[11px] ${
                        tm.status === 'mastered' ? 'bg-emerald-100 text-emerald-800' :
                        tm.status === 'improving' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tm.status === 'mastered' ? 'Đã thành thạo' : tm.status === 'improving' ? 'Đang tiến bộ' : 'Cần ôn thêm'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between text-xs text-slate-500 px-8">
            <div>
              <p>Ngày đánh giá: {new Date().toLocaleDateString('vi-VN')}</p>
              <p className="mt-8 font-bold text-slate-700">Chữ kí Phụ huynh</p>
            </div>
            <div>
              <p>Hệ thống Vui Học Toán 4 (GDPT 2026)</p>
              <p className="mt-8 font-bold text-slate-700">Giáo viên / Rô-bốt Đồng hành</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
              👨‍👩‍👧
            </span>
            <h1 className="text-2xl font-black text-slate-800">
              Góc Phụ Huynh: Theo Dõi & Phân Tích Tiến Độ Học Tập
            </h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Báo cáo chi tiết theo chuẩn SGK Toán 4 Tập 1 cho <strong>{profile.name}</strong> ({profile.grade})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPrintMode(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all shadow-xs"
          >
            <Printer className="w-4 h-4 text-blue-600" /> Xuất Báo Cáo / In
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition-all shadow-xs"
          >
            Quay Lại Màn Hình Học ➜
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Tổng Quan & Năng Lực
        </button>

        <button
          onClick={() => setActiveTab('mastery')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeTab === 'mastery'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 7 Chủ Đề & Lỗ Hổng Kiến Thức
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" /> Lịch Sử Từng Bài Làm ({profile.history.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" /> Cài Đặt Mục Tiêu & Mã PIN
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold">Thời gian học tập</span>
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-800">
                {profile.totalTimeMinutes} <span className="text-sm font-normal text-slate-500">phút</span>
              </div>
              <div className="text-xs text-emerald-600 font-bold mt-1">
                Hôm nay: {profile.todayMinutes}/{profile.dailyGoalMinutes} phút
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold">Độ chính xác</span>
                <Target className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                {avgAccuracy}%
              </div>
              <div className="text-xs text-slate-500 font-bold mt-1">
                Đúng {totalCorrectQuestions}/{totalAnsweredQuestions} câu hỏi
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold">Xếp loại học tập</span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-800">
                {ranking.label}
              </div>
              <div className="text-xs text-amber-600 font-bold mt-1">
                {profile.stars} ⭐ tích lũy
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold">Học liên tục</span>
                <Sparkles className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-600">
                {profile.streakDays} <span className="text-sm font-normal text-slate-500">ngày</span>
              </div>
              <div className="text-xs text-slate-500 font-bold mt-1">
                Giữ phong độ rất tốt!
              </div>
            </div>
          </div>

          {/* Quick Mastery Snapshot */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Mức Độ Nắm Vững 7 Chủ Đề Học Kì 1
            </h3>

            <div className="space-y-3.5">
              {topicMasteryList.map(tm => (
                <div key={tm.topicId}>
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold mb-1">
                    <span className="text-slate-800">{tm.topicTitle}</span>
                    <span className="text-slate-600">
                      {tm.percentage}% ({tm.correct}/{tm.attempted} câu)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${tm.percentage}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        tm.percentage >= 80 ? 'bg-emerald-500' :
                        tm.percentage >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pedagogy Advice Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-black text-blue-900 text-base mb-1">
                  Lời Khuyên Sư Phạm Dành Cho Cha Mẹ (Chương Trình Mới 2026):
                </h4>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>
                    <strong>Ôn tập dạng Tổng - Hiệu:</strong> Khuyến khích con luôn vẽ sơ đồ đoạn thẳng ra giấy trước khi áp dụng công thức <em>Số bé = (Tổng - Hiệu) : 2</em>.
                  </li>
                  <li>
                    <strong>Đơn vị đo lường:</strong> Cho con liên hệ thực tế (bao gạo 1 yến = 10 kg, con bò 2 tạ = 200 kg, con voi 1 tấn = 1000 kg).
                  </li>
                  <li>
                    <strong>Hàng và lớp:</strong> Nhắc con cách ngắt nhịp 3 chữ số một lần để đọc số lớp triệu trôi chảy không bị nhầm hàng.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Topic Mastery & Weakness Analysis */}
      {activeTab === 'mastery' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-black text-slate-800 mb-2">
              Phân Tích Chi Tiết Từng Chủ Đề & Gợi Ý Lỗ Hổng Cần Bổ Sung
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">
              Hệ thống tự động phát hiện các kiến thức con trả lời sai nhiều lần để cha mẹ kịp thời hỗ trợ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicMasteryList.map(tm => (
                <div key={tm.topicId} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-slate-900 text-sm">{tm.topicTitle}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                        tm.status === 'mastered' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        tm.status === 'improving' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {tm.status === 'mastered' ? 'Đã thành thạo' : tm.status === 'improving' ? 'Đang cải thiện' : 'Cần ôn thêm'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                      <span>Đã làm: <strong>{tm.attempted} câu</strong></span>
                      <span>•</span>
                      <span>Đúng: <strong className="text-emerald-700">{tm.correct} câu ({tm.percentage}%)</strong></span>
                    </div>

                    {/* Weak points */}
                    {tm.weakConcepts.length > 0 ? (
                      <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs text-rose-900">
                        <span className="font-bold flex items-center gap-1 mb-1 text-rose-700">
                          <AlertTriangle className="w-3.5 h-3.5" /> Kiến thức con cần chú ý:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5">
                          {tm.weakConcepts.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Chưa phát hiện lỗi sai đáng kể ở chủ đề này!
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-black text-slate-800">
              Nhật Ký & Lịch Sử Từng Lượt Làm Bài Của Con
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Bấm vào bất kì lượt làm bài nào để xem lại từng câu hỏi, đáp án con đã chọn và lời giải.
            </p>
          </div>

          {profile.history.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Chưa có lượt làm bài nào được lưu.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Thời gian</th>
                    <th className="py-3 px-4">Bài thi / Chủ đề</th>
                    <th className="py-3 px-4 text-center">Điểm số</th>
                    <th className="py-3 px-4 text-center">Thời gian làm</th>
                    <th className="py-3 px-4 text-right">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {profile.history.map(att => (
                    <tr
                      key={att.id}
                      onClick={() => setSelectedAttempt(att)}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 text-slate-500 font-mono text-xs">
                        {new Date(att.date).toLocaleString('vi-VN')}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {att.topicTitle}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-black text-xs ${
                          att.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                          att.score >= 50 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {att.score}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-600">
                        {Math.floor(att.timeSpentSeconds / 60)}p {att.timeSpentSeconds % 60}s
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-blue-600 font-bold hover:underline inline-flex items-center gap-0.5">
                          Xem lại <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal inspect selected attempt */}
          {selectedAttempt && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl max-h-[85vh] flex flex-col">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-black text-slate-800">{selectedAttempt.topicTitle}</h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Ngày: {new Date(selectedAttempt.date).toLocaleString('vi-VN')} • Điểm: {selectedAttempt.score}%
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAttempt(null)}
                    className="p-1 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold text-sm px-3"
                  >
                    Đóng
                  </button>
                </div>

                <div className="space-y-3 overflow-y-auto py-4 pr-1 flex-1">
                  {selectedAttempt.answers.map((a, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-2xl border text-xs sm:text-sm ${
                        a.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-800">
                          Câu {i + 1}: {a.questionText}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-black shrink-0 ${
                          a.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {a.isCorrect ? '✓ Đúng' : '✗ Sai'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 max-w-xl mx-auto space-y-6">
          <h3 className="text-lg font-black text-slate-800">
            Cài Đặt Học Tập & Bảo Vệ Cổng Phụ Huynh
          </h3>

          {saveSuccessMsg && (
            <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold text-center">
              {saveSuccessMsg}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên hiển thị của con:
              </label>
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lớp học:
              </label>
              <input
                type="text"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mục tiêu thời gian học mỗi ngày:
              </label>
              <select
                value={targetMinutes}
                onChange={(e) => setTargetMinutes(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value={10}>10 phút / ngày (Nhẹ nhàng)</option>
                <option value={15}>15 phút / ngày (Chuẩn khuyến nghị)</option>
                <option value={20}>20 phút / ngày (Tăng tốc ôn thi)</option>
                <option value={30}>30 phút / ngày (Chuyên sâu)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Đổi mã PIN phụ huynh mới (để trống nếu không đổi):
              </label>
              <input
                type="password"
                placeholder="Ví dụ: 1234"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-md transition-all text-sm mt-4"
            >
              Lưu Thiết Lập
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
