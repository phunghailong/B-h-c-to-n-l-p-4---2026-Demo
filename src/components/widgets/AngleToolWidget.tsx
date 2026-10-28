import React, { useState } from 'react';
import { RotateCw, CheckCircle2, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const AngleToolWidget: React.FC = () => {
  const [angle, setAngle] = useState<number>(60);

  const getAngleType = (deg: number) => {
    if (deg === 90) return { type: 'Góc vuông', color: 'text-blue-600 bg-blue-100 border-blue-300', desc: 'Bằng đúng 90° (dùng ê-ke để đo)' };
    if (deg === 180) return { type: 'Góc bẹt', color: 'text-purple-600 bg-purple-100 border-purple-300', desc: 'Bằng đúng 180° (bằng 2 góc vuông, thẳng hàng)' };
    if (deg < 90) return { type: 'Góc nhọn', color: 'text-emerald-600 bg-emerald-100 border-emerald-300', desc: `Bé hơn góc vuông (${deg}° < 90°)` };
    return { type: 'Góc tù', color: 'text-amber-600 bg-amber-100 border-amber-300', desc: `Lớn hơn góc vuông (${deg}° > 90° và < 180°)` };
  };

  const angleInfo = getAngleType(angle);

  // Geometry for SVG protractor
  const cx = 160;
  const cy = 160;
  const radius = 130;
  // In standard SVG, 0 deg is right (along +X), angle rotates counterclockwise:
  const rad = (angle * Math.PI) / 180;
  const targetX = cx + radius * Math.cos(rad);
  const targetY = cy - radius * Math.sin(rad);

  const presetAngles = [30, 45, 60, 90, 120, 150, 180];

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Dụng cụ thực hành trực quan
          </span>
          <h3 className="text-xl font-black text-slate-800 mt-1 flex items-center gap-2">
            📐 Thước Đo Góc Thần Kỳ Của Rô-bốt
          </h3>
        </div>
        <div className={`px-4 py-1.5 rounded-2xl border font-black text-sm flex items-center gap-1.5 ${angleInfo.color}`}>
          <Sparkles className="w-4 h-4" />
          {angleInfo.type} ({angle}°)
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-4">
        Bé hãy kéo thanh trượt hoặc chọn các mốc góc bên dưới để xem tia chuyển động và chú Robot phân loại góc nhé!
      </p>

      {/* SVG Protractor canvas */}
      <div className="relative flex justify-center items-center bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <svg width="320" height="200" viewBox="0 0 320 200" className="overflow-visible select-none">
          {/* Protractor semicircle background */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy} Z`}
            fill="#F1F5F9"
            stroke="#94A3B8"
            strokeWidth="2"
          />

          {/* Angle sector highlight */}
          <path
            d={`M ${cx} ${cy} L ${cx + radius} ${cy} A ${radius} ${radius} 0 0 0 ${targetX} ${targetY} Z`}
            fill={angle === 90 ? 'rgba(59, 130, 246, 0.25)' : angle < 90 ? 'rgba(16, 185, 129, 0.25)' : angle === 180 ? 'rgba(168, 85, 247, 0.25)' : 'rgba(245, 158, 11, 0.25)'}
          />

          {/* Tick marks on protractor */}
          {[0, 30, 45, 60, 90, 120, 135, 150, 180].map(deg => {
            const r = (deg * Math.PI) / 180;
            const x1 = cx + (radius - 12) * Math.cos(r);
            const y1 = cy - (radius - 12) * Math.sin(r);
            const x2 = cx + radius * Math.cos(r);
            const y2 = cy - radius * Math.sin(r);
            const textX = cx + (radius - 24) * Math.cos(r);
            const textY = cy - (radius - 24) * Math.sin(r);
            return (
              <g key={deg}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748B" strokeWidth={deg % 90 === 0 ? 2 : 1} />
                <text x={textX} y={textY + 3} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="bold">
                  {deg}°
                </text>
              </g>
            );
          })}

          {/* Base ray OB (horizontal right) */}
          <line x1={cx} y1={cy} x2={cx + radius + 15} y2={cy} stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={cx + radius + 15} cy={cy} r="4" fill="#1E293B" />
          <text x={cx + radius + 22} y={cy + 4} fontSize="13" fontWeight="bold" fill="#1E293B">B</text>

          {/* Rotating ray OA */}
          <line x1={cx} y1={cy} x2={targetX} y2={targetY} stroke="#E11D48" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={targetX} cy={targetY} r="4" fill="#E11D48" />
          <text x={targetX + (angle > 90 ? -16 : 10)} y={targetY - 8} fontSize="13" fontWeight="bold" fill="#E11D48">A</text>

          {/* Center vertex O */}
          <circle cx={cx} cy={cy} r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
          <text x={cx} y={cy + 18} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0284C7">Đỉnh O</text>

          {/* Square symbol if right angle */}
          {angle === 90 && (
            <rect x={cx} y={cy - 20} width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="2.5" />
          )}
        </svg>
      </div>

      {/* Slider Control */}
      <div className="mt-5 space-y-3">
        <div className="flex justify-between items-center text-sm font-bold text-slate-700">
          <span>0° (Tia trùng)</span>
          <span className="text-base text-rose-600 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
            Số đo góc AOB = {angle}°
          </span>
          <span>180° (Góc bẹt)</span>
        </div>
        <input
          type="range"
          min="0"
          max="180"
          step="5"
          value={angle}
          onChange={(e) => {
            setAngle(Number(e.target.value));
            soundManager.playClick();
          }}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />

        {/* Quick Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-xs font-bold text-slate-500 self-center mr-1">Góc mẫu:</span>
          {presetAngles.map(deg => (
            <button
              key={deg}
              onClick={() => {
                setAngle(deg);
                soundManager.playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                angle === deg
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>

        {/* Explain Card */}
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 mt-2">
          <div className="text-lg">🤖</div>
          <div>
            <span className="font-extrabold">Bí kíp của Rô-bốt: </span>
            {angleInfo.desc}. Trong cuộc sống: 90° là góc của góc bàn/ê-ke, 60° là góc bánh pizza cắt 6 phần, 180° là hai kim đồng hồ lúc 6 giờ đúng!
          </div>
        </div>
      </div>
    </div>
  );
};
