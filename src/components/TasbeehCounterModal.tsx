import React, { useState } from 'react';
import { DuaItem } from '../types';
import { X, RotateCcw, Volume2, VolumeX, CheckCircle, Sparkles } from 'lucide-react';
import { playCountFeedback } from '../utils/feedback';
import { toBengaliDigits } from '../utils/prayerTimes';

interface TasbeehCounterModalProps {
  dua: DuaItem | null;
  onClose: () => void;
  onCompleteDua?: (id: string) => void;
}

export const TasbeehCounterModal: React.FC<TasbeehCounterModalProps> = ({
  dua,
  onClose,
  onCompleteDua
}) => {
  if (!dua) return null;

  const targetCount = dua.count || 33;
  const [count, setCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    
    const isTargetMet = nextCount === targetCount;
    if (soundEnabled) {
      playCountFeedback(isTargetMet);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
  };

  const isCompleted = count >= targetCount;
  const progressPercent = Math.min(100, Math.round((count / targetCount) * 100));

  const handleFinish = () => {
    if (onCompleteDua) {
      onCompleteDua(dua.id);
    }
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200 select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2 pb-3 border-b border-emerald-800/40">
        <div className="flex items-center gap-2">
          <span className="text-xl">📿</span>
          <span className="text-sm font-bold text-amber-300 font-literary">ডিজিটাল তাসবীহ কাউন্টার</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition active:scale-95 ${
              soundEnabled ? 'bg-emerald-900/80 border-emerald-600/50 text-amber-300' : 'bg-[#051c13] border-emerald-900/60 text-slate-500'
            }`}
            title={soundEnabled ? 'শব্দ ও ভাইব্রেশন বন্ধ করুন' : 'শব্দ ও ভাইব্রেশন চালু করুন'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Counter */}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-[#061f15] hover:bg-[#0a2f21] text-slate-300 border border-emerald-800/60 transition active:scale-95"
            title="কাউন্টার রিসেট করুন"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#061f15] hover:bg-[#0a2f21] text-slate-300 border border-emerald-800/60 transition active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Dua Info */}
      <div className="my-auto text-center px-2">
        <h2 className="text-base sm:text-lg font-bold text-white mb-2 font-literary">{dua.title}</h2>
        
        <div className="bg-[#051c13]/90 border border-emerald-800/60 rounded-3xl p-4 sm:p-5 shadow-xl mb-3 max-h-48 overflow-y-auto">
          <p className="arabic-calligraphy text-xl sm:text-2xl text-amber-100 font-medium leading-relaxed">
            {dua.arabic}
          </p>
        </div>

        <p className="text-xs sm:text-[13px] text-emerald-200/90 font-medium px-4 line-clamp-2 font-literary">
          "{dua.pronunciation}"
        </p>
      </div>

      {/* Main Touch Counter Area */}
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Huge Interactive Touch Dial */}
        <button
          onClick={handleIncrement}
          className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-[#0a2e20] to-[#04140e] border-4 border-amber-400/40 shadow-2xl flex flex-col items-center justify-center select-none active:scale-95 transition-transform duration-75 tap-effect"
        >
          {/* Subtle Outer Ring Indicator */}
          <div 
            className="absolute inset-1.5 rounded-full border-2 border-dashed border-amber-400/30 animate-[spin_40s_linear_infinite]"
          />

          <span className="text-[11px] font-bold tracking-widest text-emerald-300 uppercase mb-1">
            লক্ষ্য: {toBengaliDigits(targetCount)} বার
          </span>

          <span className="text-6xl sm:text-7xl font-extrabold text-amber-300 tracking-tight font-mono drop-shadow-md">
            {toBengaliDigits(count)}
          </span>

          <span className="text-xs text-emerald-200 mt-2 font-medium bg-emerald-950/90 px-3.5 py-1 rounded-full border border-emerald-700/60 font-literary">
            ট্যাপ করুন 👆
          </span>
        </button>

        {/* Progress Bar & Status */}
        <div className="w-64 mt-4">
          <div className="flex justify-between text-xs text-emerald-300 mb-1 font-medium">
            <span className="font-literary">অগ্রগতি</span>
            <span className="font-bold text-amber-300 font-mono">
              {toBengaliDigits(count)} / {toBengaliDigits(targetCount)} ({toBengaliDigits(progressPercent)}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#03140e] rounded-full border border-emerald-800/80 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Completion Message & Quick Finish Button */}
        {isCompleted && (
          <div className="mt-4 flex flex-col items-center gap-2 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-literary">আলহামদুলিল্লাহ! লক্ষ্যমাত্রা অর্জিত হয়েছে</span>
            </div>
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-emerald-950 font-bold text-xs shadow-xl active:scale-95 transition flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4 text-emerald-950" />
              <span className="font-literary">আমল সম্পন্ন হিসেবে চিহ্নিত করুন</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
