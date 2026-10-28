import React, { useState } from 'react';
import { Layers, Sparkles, BookOpen } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const PlaceValueTable: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('149597876');

  const cleanNumStr = inputVal.replace(/\D/g, '').slice(0, 9);
  const padded = cleanNumStr.padStart(9, ' ');

  // Split into 9 columns
  // Index 0: Trăm triệu, 1: Chục triệu, 2: Triệu
  // Index 3: Trăm nghìn, 4: Chục nghìn, 5: Nghìn
  // Index 6: Trăm, 7: Chục, 8: Đơn vị
  const digits = padded.split('');

  const presets = [
    { label: 'Dân số Cà Mau (2019)', val: '226372', desc: 'Trang 33 SGK' },
    { label: 'Khoảng cách Mặt Trời', val: '149597876', desc: 'Trang 41 SGK' },
    { label: 'Dân số Việt Nam (2020)', val: '97338579', desc: 'Trang 42 SGK' },
    { label: 'Số một triệu', val: '1000000', desc: 'Trang 35 SGK' },
    { label: 'Số năm trăm triệu', val: '531000000', desc: 'Trang 38 SGK' }
  ];

  // Vietnamese number reading helper
  const formatVietnameseNumber = (numStr: string) => {
    if (!numStr) return '';
    const n = parseInt(numStr, 10);
    if (isNaN(n)) return '';
    return new Intl.NumberFormat('vi-VN').format(n);
  };

  // Round to hundred thousand
  const getRoundedHundredThousand = (numStr: string) => {
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return 0;
    return Math.round(num / 100000) * 100000;
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-blue-100 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            Bảng tương tác Hàng & Lớp
          </span>
          <h3 className="text-xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            Khám Phá Cấu Tạo Số & Lớp Triệu
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={cleanNumStr}
            onChange={(e) => setInputVal(e.target.value.replace(/\D/g, '').slice(0, 9))}
            placeholder="Nhập số bất kì..."
            className="px-3.5 py-1.5 border-2 border-blue-200 rounded-xl font-mono text-base font-bold text-blue-900 w-36 text-center focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-4">
        Bé hãy chọn các số mẫu trong SGK hoặc tự gõ số để xem các chữ số tự động xếp vào đúng <strong>Lớp Triệu, Lớp Nghìn, Lớp Đơn vị</strong> nhé!
      </p>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {presets.map((p) => (
          <button
            key={p.val}
            onClick={() => {
              setInputVal(p.val);
              soundManager.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              cleanNumStr === p.val
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-inner">
        <table className="w-full text-center border-collapse text-xs sm:text-sm">
          <thead>
            {/* Class Row (Lớp) */}
            <tr className="font-black text-white uppercase tracking-wider">
              <th colSpan={3} className="bg-rose-500 py-2.5 px-1 border-r border-rose-400">
                Lớp Triệu
              </th>
              <th colSpan={3} className="bg-amber-500 py-2.5 px-1 border-r border-amber-400">
                Lớp Nghìn
              </th>
              <th colSpan={3} className="bg-emerald-500 py-2.5 px-1">
                Lớp Đơn Vị
              </th>
            </tr>
            {/* Place Row (Hàng) */}
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] sm:text-xs">
              <th className="py-2 px-1 border-r border-slate-200">Trăm triệu</th>
              <th className="py-2 px-1 border-r border-slate-200">Chục triệu</th>
              <th className="py-2 px-1 border-r-2 border-rose-300">Triệu</th>

              <th className="py-2 px-1 border-r border-slate-200">Trăm nghìn</th>
              <th className="py-2 px-1 border-r border-slate-200">Chục nghìn</th>
              <th className="py-2 px-1 border-r-2 border-amber-300">Nghìn</th>

              <th className="py-2 px-1 border-r border-slate-200">Trăm</th>
              <th className="py-2 px-1 border-r border-slate-200">Chục</th>
              <th className="py-2 px-1">Đơn vị</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white font-black text-lg sm:text-2xl text-slate-800 h-16">
              {digits.map((d, idx) => {
                const isTriệu = idx < 3;
                const isNghìn = idx >= 3 && idx < 6;
                const borderClass =
                  idx === 2 ? 'border-r-2 border-rose-300' :
                  idx === 5 ? 'border-r-2 border-amber-300' :
                  idx === 8 ? '' : 'border-r border-slate-200';

                return (
                  <td
                    key={idx}
                    className={`p-2 transition-all ${borderClass} ${
                      d !== ' '
                        ? isTriệu
                          ? 'bg-rose-50/50 text-rose-700'
                          : isNghìn
                          ? 'bg-amber-50/50 text-amber-700'
                          : 'bg-emerald-50/50 text-emerald-700'
                        : 'text-slate-300 bg-slate-50'
                    }`}
                  >
                    <span className="inline-block transition-transform transform hover:scale-125">
                      {d !== ' ' ? d : '-'}
                    </span>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Analysis Details */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-blue-950">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-blue-800">
            <BookOpen className="w-4 h-4" /> Số đã viết có dấu cách:
          </div>
          <div className="font-mono font-black text-lg text-blue-700">
            {formatVietnameseNumber(cleanNumStr) || 'Chưa nhập số'}
          </div>
          <div className="text-xs text-slate-600 mt-1">
            Mẹo: Khi viết số có nhiều chữ số, ta viết tách từng lớp (mỗi lớp 3 chữ số) để dễ đọc và không nhầm lẫn.
          </div>
        </div>

        <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-purple-950">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-purple-800">
            <Sparkles className="w-4 h-4" /> Làm tròn đến hàng trăm nghìn:
          </div>
          <div className="font-mono font-black text-lg text-purple-700">
            {new Intl.NumberFormat('vi-VN').format(getRoundedHundredThousand(cleanNumStr))}
          </div>
          <div className="text-xs text-slate-600 mt-1">
            Quy tắc: So sánh chữ số ở hàng chục nghìn với 5. Nếu bé hơn 5 thì làm tròn xuống, từ 5 trở lên làm tròn lên.
          </div>
        </div>
      </div>
    </div>
  );
};
