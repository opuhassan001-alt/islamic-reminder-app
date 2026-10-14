import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playCountFeedback } from '../utils/feedback';

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
    <div className="max-w-md mx-auto px-4 pb-16 flex flex-col items-center">
      {/* Preset Selector */}
      <div className="w-full flex gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {PRESET_ZIKR.map((zikr) => {
          const isSelected = selectedZikr.id === zikr.id;
          return (
            <button
              key={zikr.id}
              onClick={() => {
                setSelectedZikr(zikr);
                setCount(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex-shrink-0 ${
                isSelected
                  ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20'
                  : 'bg-emerald-950/70 text-emerald-200 border border-emerald-800/50 hover:bg-emerald-900'
              }`}
            >
              {zikr.name} ({zikr.target})
            </button>
          );
        })}
      </div>

      {/* Selected Zikr Display */}
      <div className="w-full text-center bg-emerald-950/80 border border-emerald-700/50 rounded-2xl p-4 mb-6 shadow-md">
        <h3 className="text-sm font-semibold text-emerald-300 mb-1">{selectedZikr.name}</h3>
        <p className="arabic-text text-2xl text-amber-200 font-bold mb-1">
          {selectedZikr.arabic}
        </p>
        <span className="text-[11px] text-emerald-400">
          লক্ষ্যমাত্রা: {selectedZikr.target} বার | মোট আজ পড়া হয়েছে: {totalCount}
        </span>
      </div>

      {/* Big Circular Dial */}
      <div className="relative flex flex-col items-center mb-6">
        <button
          onClick={handleIncrement}
          className="relative w-64 h-64 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 border-4 border-amber-400/40 shadow-2xl shadow-emerald-900/60 flex flex-col items-center justify-center select-none active:scale-95 transition-transform duration-75 tap-effect"
        >
          <div className="absolute inset-1 rounded-full border border-dashed border-emerald-400/30 animate-[spin_30s_linear_infinite]" />
          
          <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase mb-1">
            গণনা
          </span>
          <span className="text-7xl font-extrabold text-amber-300 tracking-tight font-mono drop-shadow-md">
            {count}
          </span>
          <span className="text-xs text-emerald-200/90 mt-2 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-700/50">
            ট্যাপ করুন 👆
          </span>
        </button>

        {/* Action Controls: Sound & Reset */}
        <div className="flex items-center gap-4 mt-5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-full border transition active:scale-95 ${
              soundEnabled
                ? 'bg-emerald-800/70 border-emerald-600/60 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
            title="শব্দ ও ভাইব্রেশন"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 text-xs font-bold transition active:scale-95"
            title="রিসেট করুন"
          >
            <RotateCcw className="w-4 h-4" />
            <span>রিসেট</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs text-emerald-300 mb-1">
          <span>লক্ষ্যের অগ্রগতি</span>
          <span className="font-bold text-amber-300">{count}/{selectedZikr.target} ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 bg-emerald-950 rounded-full border border-emerald-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {count >= selectedZikr.target && (
        <div className="mt-5 p-3 rounded-xl bg-emerald-800/80 border border-amber-400/50 text-center animate-bounce shadow-lg flex items-center justify-center gap-2 text-white font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>মাশাআল্লাহ! {selectedZikr.target} বার পড়া সম্পন্ন হয়েছে!</span>
        </div>
      )}
    </div>
  );
};
