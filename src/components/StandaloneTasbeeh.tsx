import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playCountFeedback } from '../utils/feedback';
import { toBengaliDigits } from '../utils/prayerTimes';

interface PresetZikr {
  id: string;
  name: string;
  arabic: string;
  target: number;
}

const PRESET_ZIKR: PresetZikr[] = [
  { id: '1', name: 'সুবহানাল্লাহ', arabic: 'سُبْحَانَ اللَّهِ', target: 33 },
  { id: '2', name: 'আলহামদুলিল্লাহ', arabic: 'الْحَمْدُ لِلَّهِ', target: 33 },
  { id: '3', name: 'আল্লাহু আকবার', arabic: 'اللَّهُ أَكْبَرُ', target: 34 },
  { id: '4', name: 'ইস্তিগফার', arabic: 'أَسْتَغْفِرُ اللَّهَ', target: 100 },
  { id: '5', name: 'দরূদ শরীফ', arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', target: 100 },
  { id: '6', name: 'কালিমা তাইয়্যেবা', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', target: 100 },
];

export const StandaloneTasbeeh: React.FC = () => {
  const [selectedZikr, setSelectedZikr] = useState<PresetZikr>(PRESET_ZIKR[0]);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setTotalCount((prev) => prev + 1);

    const isTargetMet = nextCount === selectedZikr.target;
    if (soundEnabled) {
      playCountFeedback(isTargetMet);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const progressPercent = Math.min(100, Math.round((count / selectedZikr.target) * 100));

  return (
    <div className="max-w-md mx-auto px-4 pb-20 flex flex-col items-center animate-in fade-in">
      {/* Preset Selector */}
      <div className="w-full flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {PRESET_ZIKR.map((zikr) => {
          const isSelected = selectedZikr.id === zikr.id;
          return (
            <button
              key={zikr.id}
              onClick={() => {
                setSelectedZikr(zikr);
                setCount(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-md font-bold'
                  : 'bg-[#062117]/80 text-emerald-200 border border-emerald-800/40 hover:bg-[#0a2f21]'
              }`}
            >
              <span className="font-literary">{zikr.name}</span> ({toBengaliDigits(zikr.target)})
            </button>
          );
        })}
      </div>

      {/* Selected Zikr Display */}
      <div className="w-full text-center islamic-glass-card rounded-3xl p-5 mb-6 shadow-xl border border-amber-500/30">
        <h3 className="text-sm font-bold text-emerald-300 mb-1 font-literary">{selectedZikr.name}</h3>
        <p className="arabic-calligraphy text-2xl sm:text-3xl text-amber-100 font-medium mb-1">
          {selectedZikr.arabic}
        </p>
        <span className="text-[11px] text-emerald-300/90 font-literary">
          লক্ষ্যমাত্রা: {toBengaliDigits(selectedZikr.target)} বার | আজ মোট পাঠ: {toBengaliDigits(totalCount)} বার
        </span>
      </div>

      {/* Big Circular Luxury Dial */}
      <div className="relative flex flex-col items-center mb-6">
        <button
          onClick={handleIncrement}
          className="relative w-64 h-64 rounded-full bg-gradient-to-b from-[#09291e] to-[#04140e] border-4 border-amber-400/40 shadow-2xl flex flex-col items-center justify-center select-none active:scale-95 transition-transform duration-75 tap-effect group"
        >
          <div className="absolute inset-1.5 rounded-full border border-dashed border-amber-400/30 animate-[spin_40s_linear_infinite]" />
          
          <span className="text-[11px] font-bold tracking-widest text-emerald-300 uppercase mb-1">
            জিকির সংখ্যা
          </span>
          <span className="text-6xl sm:text-7xl font-extrabold text-amber-300 tracking-tight font-mono drop-shadow-md">
            {toBengaliDigits(count)}
          </span>
          <span className="text-xs text-emerald-200 mt-2 bg-emerald-950/90 px-3.5 py-1 rounded-full border border-emerald-700/60 font-literary">
            ট্যাপ করুন 👆
          </span>
        </button>

        {/* Action Controls: Sound & Reset */}
        <div className="flex items-center gap-4 mt-5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-full border transition active:scale-95 ${
              soundEnabled
                ? 'bg-emerald-900/80 border-emerald-600/70 text-amber-300'
                : 'bg-[#051c13] border-emerald-900/60 text-slate-500'
            }`}
            title="শব্দ চালু/বন্ধ"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#061f15] hover:bg-[#0a2f21] text-emerald-200 border border-emerald-700/60 text-xs font-bold transition active:scale-95"
            title="রিসেট করুন"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-literary">রিসেট</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs text-emerald-300 mb-1.5 font-medium">
          <span className="font-literary">অগ্রগতি</span>
          <span className="font-bold text-amber-300">
            {toBengaliDigits(count)}/{toBengaliDigits(selectedZikr.target)} ({toBengaliDigits(progressPercent)}%)
          </span>
        </div>
        <div className="w-full h-3 bg-[#03140e] rounded-full border border-emerald-800/80 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {count >= selectedZikr.target && (
        <div className="mt-5 p-3 rounded-2xl bg-gradient-to-r from-emerald-900/90 to-amber-900/60 border border-amber-400/60 text-center animate-bounce shadow-xl flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-sm font-literary">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>মাশাআল্লাহ! {toBengaliDigits(selectedZikr.target)} বার পাঠ সম্পন্ন হয়েছে!</span>
        </div>
      )}
    </div>
  );
};
