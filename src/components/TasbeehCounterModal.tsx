import React, { useState } from 'react';
import { DuaItem } from '../types';
import { X, RotateCcw, Volume2, VolumeX, CheckCircle, Sparkles } from 'lucide-react';
import { playCountFeedback } from '../utils/feedback';

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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2 pb-3 border-b border-emerald-800/40">
        <div className="flex items-center gap-2">
          <span className="text-xl">📿</span>
          <span className="text-sm font-bold text-amber-300">ডিজিটাল তাসবীহ</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-full border transition ${
              soundEnabled ? 'bg-emerald-800/60 border-emerald-600/50 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
            title={soundEnabled ? 'শব্দ ও ভাইব্রেশন বন্ধ করুন' : 'শব্দ ও ভাইব্রেশন চালু করুন'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Counter */}
          <button
            onClick={handleReset}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="কাউন্টার রিসেট করুন"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Dua Info */}
      <div className="my-auto text-center px-2">
        <h2 className="text-base font-bold text-amber-400 mb-2">{dua.title}</h2>
        
        <div className="bg-emerald-950/70 border border-emerald-800/50 rounded-2xl p-4 shadow-lg mb-3 max-h-44 overflow-y-auto">
          <p className="arabic-text text-xl md:text-2xl text-white font-medium leading-relaxed">
            {dua.arabic}
          </p>
        </div>

        <p className="text-xs text-emerald-200/90 italic font-medium px-4 line-clamp-2">
          "{dua.pronunciation}"
        </p>
      </div>

      {/* Main Touch Counter Area */}
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Huge Interactive Touch Dial */}
        <button
          onClick={handleIncrement}
          className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-emerald-850 to-emerald-950 border-4 border-emerald-500/40 shadow-2xl shadow-emerald-900/60 flex flex-col items-center justify-center select-none active:scale-95 transition-transform duration-75 tap-effect"
        >
          {/* Subtle Outer Ring Indicator */}
          <div 
            className="absolute inset-1 rounded-full border-2 border-dashed border-amber-400/40 animate-[spin_40s_linear_infinite]"
          />

          <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase mb-1">
            লক্ষ্য: {targetCount} বার
          </span>

          <span className="text-6xl sm:text-7xl font-extrabold text-amber-300 tracking-tight font-mono drop-shadow-md">
            {count}
          </span>

          <span className="text-xs text-emerald-300/80 mt-2 font-medium bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/40">
            ট্যাপ করুন 👆
          </span>
        </button>

        {/* Progress Bar & Status */}
        <div className="w-64 mt-4">
          <div className="flex justify-between text-xs text-emerald-300/80 mb-1">
            <span>অগ্রগতি</span>
            <span className="font-bold text-amber-300">{count} / {targetCount} ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-emerald-950 rounded-full border border-emerald-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Completion Notice */}
        {isCompleted && (
          <div className="mt-4 p-3 bg-gradient-to-r from-emerald-800/80 to-amber-600/80 rounded-xl border border-amber-400/60 text-center animate-bounce shadow-lg">
            <div className="flex items-center justify-center gap-1.5 text-white font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>মাশাআল্লাহ! তাসবীহ সম্পন্ন হয়েছে!</span>
            </div>
            <button
              onClick={handleFinish}
              className="mt-2 inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-emerald-950 text-amber-300 text-xs font-bold hover:bg-emerald-900 border border-amber-400/40"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>সম্পন্ন হিসেবে চিহ্নিত করে বন্ধ করুন</span>
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-[11px] text-slate-400 pb-2">
        পর্দার বৃত্তাকার বোতামে ট্যাপ করে তাসবীহ গণনা চালিয়ে যান
      </div>
    </div>
  );
};
