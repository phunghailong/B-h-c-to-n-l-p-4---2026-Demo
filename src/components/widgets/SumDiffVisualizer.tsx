import React, { useState } from 'react';
import { HelpCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const SumDiffVisualizer: React.FC = () => {
  const [total, setTotal] = useState<number>(25);
  const [diff, setDiff] = useState<number>(5);
  const [selectedMethod, setSelectedMethod] = useState<'find_small' | 'find_large'>('find_small');

  const presetProblems = [
    { name: 'Kẹo của Mai & Mi', total: 25, diff: 5, unit: 'cái kẹo', item1: 'Mai (Số lớn)', item2: 'Mi (Số bé)' },
    { name: 'Trứng gà & Trứng vịt', total: 80, diff: 10, unit: 'quả trứng', item1: 'Trứng gà (Số lớn)', item2: 'Trứng vịt (Số bé)' },
    { name: 'Lớp võ Nam & Nữ', total: 40, diff: 10, unit: 'bạn', item1: 'Bạn nam (Số lớn)', item2: 'Bạn nữ (Số bé)' },
    { name: 'Tham quan làng nghề', total: 175, diff: 15, unit: 'học sinh', item1: 'Đợt 1 (Số lớn)', item2: 'Đợt 2 (Số bé)' },
    { name: 'Chiều dài & Rộng HCN', total: 36, diff: 8, unit: 'cm', item1: 'Chiều dài (Số lớn)', item2: 'Chiều rộng (Số bé)' }
  ];

  // Mathematical validation
  const safeTotal = Math.max(diff, total);
  const safeDiff = Math.min(diff, safeTotal);

  // Both should have same parity for integer result, but let's handle fractions gracefully if any
  const smallNum = (safeTotal - safeDiff) / 2;
  const largeNum = (safeTotal + safeDiff) / 2;

  // Visual bar widths
  const maxBarWidth = 260;
  const baseRatio = safeTotal > 0 ? maxBarWidth / safeTotal : 1;
  const smallBarWidth = Math.max(40, smallNum * baseRatio);
  const diffBarWidth = Math.max(20, safeDiff * baseRatio);
  const largeBarWidth = smallBarWidth + diffBarWidth;

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-rose-100 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
            Dạng toán cốt lõi Lớp 4 Kì 1
          </span>
          <h3 className="text-xl font-black text-slate-800 mt-1 flex items-center gap-2">
            🍬 Tìm Hai Số Khi Biết Tổng Và Hiệu
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setSelectedMethod('find_small'); soundManager.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedMethod === 'find_small' ? 'bg-rose-500 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Cách 1: Tìm số bé trước
          </button>
          <button
            onClick={() => { setSelectedMethod('find_large'); soundManager.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedMethod === 'find_large' ? 'bg-rose-500 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Cách 2: Tìm số lớn trước
          </button>
        </div>
      </div>

      {/* Preset Problem pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="text-xs font-bold text-slate-500 self-center">Bài toán mẫu trong SGK:</span>
        {presetProblems.map(p => (
          <button
            key={p.name}
            onClick={() => {
              setTotal(p.total);
              setDiff(p.diff);
              soundManager.playClick();
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
              total === p.total && diff === p.diff
                ? 'bg-rose-50 border-rose-400 text-rose-800 font-black'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {p.name} (T:{p.total}, H:{p.diff})
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div>
          <label className="text-xs font-bold text-slate-600 flex justify-between">
            <span>Tổng của hai số:</span>
            <span className="text-rose-600 font-extrabold text-sm">{safeTotal}</span>
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="2"
            value={safeTotal}
            onChange={(e) => setTotal(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500 mt-2"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-600 flex justify-between">
            <span>Hiệu của hai số:</span>
            <span className="text-amber-600 font-extrabold text-sm">{safeDiff}</span>
          </label>
          <input
            type="range"
            min="2"
            max={Math.min(safeTotal, 60)}
            step="2"
            value={safeDiff}
            onChange={(e) => setDiff(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 mt-2"
          />
        </div>
      </div>

      {/* Tape Diagram (Sơ đồ đoạn thẳng SVG) */}
      <div className="bg-amber-50/40 p-5 rounded-2xl border-2 border-dashed border-amber-200 mb-6">
        <h4 className="text-xs font-black uppercase text-amber-800 tracking-wider mb-3">
          📊 Sơ Đồ Đoạn Thẳng Trực Quan (Tóm Tắt)
        </h4>

        <div className="space-y-4">
          {/* Số bé */}
          <div className="flex items-center gap-3">
            <span className="w-16 sm:w-20 text-xs sm:text-sm font-bold text-slate-700 text-right">Số bé:</span>
            <div className="flex items-center">
              <div
                style={{ width: `${smallBarWidth}px` }}
                className="h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-sm transition-all"
              >
                {smallNum}
              </div>
            </div>
          </div>

          {/* Số lớn */}
          <div className="flex items-center gap-3">
            <span className="w-16 sm:w-20 text-xs sm:text-sm font-bold text-slate-700 text-right">Số lớn:</span>
            <div className="flex items-center">
              {/* Part equal to small number */}
              <div
                style={{ width: `${smallBarWidth}px` }}
                className="h-8 bg-blue-400 rounded-l-lg border-r border-dashed border-white flex items-center justify-center text-white text-xs font-black shadow-sm transition-all"
              >
                {smallNum}
              </div>
              {/* Difference part */}
              <div
                style={{ width: `${diffBarWidth}px` }}
                className="h-8 bg-amber-400 rounded-r-lg flex items-center justify-center text-amber-950 text-xs font-black shadow-sm transition-all relative"
              >
                <span>+{safeDiff}</span>
              </div>
            </div>
            <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Tổng = {safeTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Step by Step Solution Box */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <h4 className="font-black text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500" />
          Các Bước Giải Chi Tiết ({selectedMethod === 'find_small' ? 'Cách 1' : 'Cách 2'}):
        </h4>

        {selectedMethod === 'find_small' ? (
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="p-3 bg-white rounded-xl border border-blue-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="font-bold text-blue-900">Tìm Số bé trước theo công thức:</p>
                <p className="text-slate-600 font-mono font-bold mt-0.5">
                  Số bé = (Tổng - Hiệu) : 2 = ({safeTotal} - {safeDiff}) : 2 = {safeTotal - safeDiff} : 2 = <strong className="text-blue-600 text-base">{smallNum}</strong>
                </p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-rose-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-bold text-rose-900">Tìm Số lớn:</p>
                <p className="text-slate-600 font-mono font-bold mt-0.5">
                  Số lớn = Số bé + Hiệu = {smallNum} + {safeDiff} = <strong className="text-rose-600 text-base">{largeNum}</strong>
                  <span className="text-slate-500 font-normal"> (hoặc lấy Tổng - Số bé = {safeTotal} - {smallNum} = {largeNum})</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="p-3 bg-white rounded-xl border border-rose-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="font-bold text-rose-900">Tìm Số lớn trước theo công thức:</p>
                <p className="text-slate-600 font-mono font-bold mt-0.5">
                  Số lớn = (Tổng + Hiệu) : 2 = ({safeTotal} + {safeDiff}) : 2 = {safeTotal + safeDiff} : 2 = <strong className="text-rose-600 text-base">{largeNum}</strong>
                </p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-blue-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-bold text-blue-900">Tìm Số bé:</p>
                <p className="text-slate-600 font-mono font-bold mt-0.5">
                  Số bé = Số lớn - Hiệu = {largeNum} - {safeDiff} = <strong className="text-blue-600 text-base">{smallNum}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-emerald-700">
          <span>✓ Thử lại: {largeNum} + {smallNum} = {safeTotal} (Đúng bằng Tổng)</span>
          <span>✓ {largeNum} - {smallNum} = {safeDiff} (Đúng bằng Hiệu)</span>
        </div>
      </div>
    </div>
  );
};
