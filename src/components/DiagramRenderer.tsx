import React from 'react';

interface DiagramProps {
  type?: 'angle' | 'clock' | 'place_value' | 'shapes' | 'weights' | 'tape_diagram' | 'coins' | 'grid_area';
  data?: any;
}

export const DiagramRenderer: React.FC<DiagramProps> = ({ type, data }) => {
  if (!type) return null;

  switch (type) {
    case 'clock': {
      const hour = data?.hour || 3;
      const minute = data?.minute || 0;
      // Clock calculations
      const minuteAngle = minute * 6; // 360 / 60
      const hourAngle = (hour % 12) * 30 + (minute / 60) * 30; // 360 / 12

      const cx = 90;
      const cy = 90;
      const r = 70;

      // Minute hand coordinates
      const minRad = ((minuteAngle - 90) * Math.PI) / 180;
      const minX = cx + (r - 18) * Math.cos(minRad);
      const minY = cy + (r - 18) * Math.sin(minRad);

      // Hour hand coordinates
      const hourRad = ((hourAngle - 90) * Math.PI) / 180;
      const hourX = cx + (r - 32) * Math.cos(hourRad);
      const hourY = cy + (r - 32) * Math.sin(hourRad);

      return (
        <div className="flex flex-col items-center justify-center p-3 bg-gradient-to-b from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200 shadow-inner my-2">
          <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-xs">
            {/* Outer ring */}
            <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke="#0284C7" strokeWidth="4" />
            <circle cx={cx} cy={cy} r={r - 6} fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />

            {/* 12 hour tick marks & numbers */}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
              const angle = num * 30;
              const rad = ((angle - 90) * Math.PI) / 180;
              const tx = cx + (r - 15) * Math.cos(rad);
              const ty = cy + (r - 15) * Math.sin(rad);
              return (
                <text
                  key={num}
                  x={tx}
                  y={ty + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#0369A1"
                >
                  {num}
                </text>
              );
            })}

            {/* Center Angle Arc if right angle or straight */}
            {data?.showAngleArc && (
              <circle
                cx={cx}
                cy={cy}
                r="18"
                fill="none"
                stroke="#E11D48"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}

            {/* Hour Hand */}
            <line
              x1={cx}
              y1={cy}
              x2={hourX}
              y2={hourY}
              stroke="#E11D48"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Minute Hand */}
            <line
              x1={cx}
              y1={cy}
              x2={minX}
              y2={minY}
              stroke="#0284C7"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Center Pivot */}
            <circle cx={cx} cy={cy} r="5" fill="#0F172A" />
            <circle cx={cx} cy={cy} r="2" fill="#FFFFFF" />
          </svg>
          <span className="text-xs font-black text-blue-900 mt-2 bg-white px-3 py-1 rounded-full border border-blue-200 shadow-2xs">
            {data?.caption || `Đồng hồ chỉ: ${hour} giờ ${minute > 0 ? `${minute} phút` : 'đúng'}`}
          </span>
        </div>
      );
    }

    case 'angle': {
      const degrees = data?.degrees || 60;
      const label = data?.label || 'AOB';
      const cx = 130;
      const cy = 110;
      const len = 90;
      const rad = (degrees * Math.PI) / 180;
      const ax = cx + len * Math.cos(rad);
      const ay = cy - len * Math.sin(rad);

      return (
        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-200 my-2">
          <svg width="260" height="135" viewBox="0 0 260 135">
            {/* Base Ray OB */}
            <line x1={cx} y1={cy} x2={cx + len} y2={cy} stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <circle cx={cx + len} cy={cy} r="3" fill="#1E293B" />
            <text x={cx + len + 8} y={cy + 4} fontSize="12" fontWeight="bold" fill="#1E293B">B</text>

            {/* Arm Ray OA */}
            <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
            <circle cx={ax} cy={ay} r="3" fill="#E11D48" />
            <text x={ax + (degrees > 90 ? -16 : 8)} y={ay - 6} fontSize="12" fontWeight="bold" fill="#E11D48">A</text>

            {/* Vertex O */}
            <circle cx={cx} cy={cy} r="5" fill="#0284C7" />
            <text x={cx - 16} y={cy + 6} fontSize="12" fontWeight="bold" fill="#0284C7">O</text>

            {/* Right Angle marker */}
            {degrees === 90 ? (
              <rect x={cx} y={cy - 16} width="16" height="16" fill="none" stroke="#2563EB" strokeWidth="2" />
            ) : (
              /* Arc marker */
              <path
                d={`M ${cx + 25} ${cy} A 25 25 0 0 0 ${cx + 25 * Math.cos(rad)} ${cy - 25 * Math.sin(rad)}`}
                fill="none"
                stroke="#E11D48"
                strokeWidth="2"
              />
            )}
            <text x={cx + 34} y={cy - 10} fontSize="11" fontWeight="black" fill="#E11D48">
              {degrees}°
            </text>
          </svg>
          <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 mt-1">
            {data?.note || `Góc đỉnh O; cạnh OA, OB = ${degrees}°`}
          </span>
        </div>
      );
    }

    case 'tape_diagram': {
      const { smallLabel, largeLabel, smallVal, diffVal, totalVal, unit } = data;
      return (
        <div className="p-4 bg-amber-50/60 rounded-2xl border-2 border-dashed border-amber-300 my-2 max-w-md mx-auto">
          <div className="text-xs font-black uppercase text-amber-900 mb-3 text-center">
            📊 Tóm Tắt Bài Toán Bằng Sơ Đồ Đoạn Thẳng
          </div>
          <div className="space-y-3">
            {/* Small item */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-xs font-bold text-slate-700 text-right shrink-0">{smallLabel}:</span>
              <div className="flex items-center gap-2">
                <div className="h-7 w-28 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-xs">
                  {smallVal !== undefined ? smallVal : '?'}
                </div>
              </div>
            </div>

            {/* Large item */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-xs font-bold text-slate-700 text-right shrink-0">{largeLabel}:</span>
              <div className="flex items-center">
                <div className="h-7 w-28 bg-blue-400 rounded-l-lg border-r border-dashed border-white flex items-center justify-center text-white text-xs font-black shadow-xs">
                  {smallVal !== undefined ? smallVal : ''}
                </div>
                <div className="h-7 w-20 bg-amber-400 rounded-r-lg flex items-center justify-center text-amber-950 text-xs font-black shadow-xs">
                  +{diffVal} {unit}
                </div>
              </div>
            </div>

            {/* Total Bracket Indicator */}
            <div className="pt-2 border-t border-amber-200 flex justify-between items-center text-xs px-2">
              <span className="font-bold text-slate-600">Hiệu: <strong className="text-amber-800">{diffVal} {unit}</strong></span>
              <span className="font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                Tổng: {totalVal} {unit}
              </span>
            </div>
          </div>
        </div>
      );
    }

    case 'shapes': {
      const shapeType = data?.shape || 'rhombus';
      if (shapeType === 'rhombus') {
        return (
          <div className="flex flex-col items-center justify-center p-3 bg-yellow-50/50 rounded-2xl border border-yellow-200 my-2">
            <svg width="220" height="130" viewBox="0 0 220 130">
              {/* Rhombus ABCD */}
              <polygon points="110,15 195,65 110,115 25,65" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" />
              {/* Diagonals */}
              <line x1="110" y1="15" x2="110" y2="115" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="4,3" />
              <line x1="25" y1="65" x2="195" y2="65" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4,3" />
              {/* Right angle mark in center */}
              <rect x="110" y="55" width="10" height="10" fill="none" stroke="#CA8A04" strokeWidth="1.5" />
              {/* Vertices */}
              <text x="107" y="12" fontSize="12" fontWeight="bold" fill="#854D0E">A</text>
              <text x="200" y="69" fontSize="12" fontWeight="bold" fill="#854D0E">B</text>
              <text x="107" y="127" fontSize="12" fontWeight="bold" fill="#854D0E">C</text>
              <text x="12" y="69" fontSize="12" fontWeight="bold" fill="#854D0E">D</text>
              <text x="114" y="61" fontSize="10" fontWeight="bold" fill="#64748B">O</text>
            </svg>
            <span className="text-xs font-bold text-amber-900 bg-white px-3 py-1 rounded-full border border-amber-200 mt-1">
              Hình thoi ABCD: 4 cạnh bằng nhau, 2 đường chéo vuông góc tại O
            </span>
          </div>
        );
      }
      if (shapeType === 'parallelogram') {
        return (
          <div className="flex flex-col items-center justify-center p-3 bg-sky-50/50 rounded-2xl border border-sky-200 my-2">
            <svg width="220" height="120" viewBox="0 0 220 120">
              <polygon points="65,25 200,25 155,95 20,95" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
              <text x="60" y="20" fontSize="12" fontWeight="bold" fill="#0369A1">A</text>
              <text x="205" y="25" fontSize="12" fontWeight="bold" fill="#0369A1">B</text>
              <text x="160" y="105" fontSize="12" fontWeight="bold" fill="#0369A1">C</text>
              <text x="10" y="105" fontSize="12" fontWeight="bold" fill="#0369A1">D</text>
            </svg>
            <span className="text-xs font-bold text-sky-900 bg-white px-3 py-1 rounded-full border border-sky-200 mt-1">
              Hình bình hành ABCD: Cạnh AB song song và bằng CD; AD song song và bằng BC
            </span>
          </div>
        );
      }
      if (shapeType === 'parallel_lines') {
        return (
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-200 my-2">
            <svg width="240" height="90" viewBox="0 0 240 90">
              {/* Line 1 */}
              <line x1="20" y1="25" x2="220" y2="25" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />
              <text x="225" y="30" fontSize="12" fontWeight="bold" fill="#2563EB">a</text>
              {/* Line 2 */}
              <line x1="20" y1="65" x2="220" y2="65" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />
              <text x="225" y="70" fontSize="12" fontWeight="bold" fill="#2563EB">b</text>
            </svg>
            <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 mt-1">
              Hai đường thẳng song song a và b (không bao giờ cắt nhau)
            </span>
          </div>
        );
      }
      return null;
    }

    case 'weights': {
      return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200 my-2 text-center">
          <div className="p-2.5 bg-white rounded-xl border border-violet-200 shadow-2xs">
            <span className="text-3xl block">🐘</span>
            <span className="text-xs font-black text-violet-900">Voi Con: 1 tấn 200 kg</span>
            <span className="text-[10px] text-slate-500 block">= 1 200 kg = 120 yến</span>
          </div>
          <span className="text-xl font-black text-violet-500">➜</span>
          <div className="p-2.5 bg-white rounded-xl border border-violet-200 shadow-2xs">
            <span className="text-3xl block">🐂</span>
            <span className="text-xs font-black text-violet-900">Bò: 3 tạ 5 yến</span>
            <span className="text-[10px] text-slate-500 block">= 350 kg = 35 yến</span>
          </div>
        </div>
      );
    }

    case 'place_value': {
      const numStr = String(data?.value || '226372');
      const formatted = new Intl.NumberFormat('vi-VN').format(Number(numStr));
      return (
        <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 my-2 max-w-sm mx-auto text-center">
          <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide block mb-1">
            Bảng tách số theo lớp
          </span>
          <div className="font-mono text-xl sm:text-2xl font-black text-blue-900 tracking-wider bg-white py-2 px-3 rounded-xl border border-blue-200 shadow-2xs">
            {formatted}
          </div>
          <div className="flex justify-around text-[10px] font-bold text-slate-500 mt-2">
            {data?.labels?.map((l: string, i: number) => (
              <span key={i} className="bg-blue-100/60 px-1.5 py-0.5 rounded text-blue-800">{l}</span>
            ))}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};
