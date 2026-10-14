import React, { useState } from 'react';
import { DuaItem } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  Play
} from 'lucide-react';
import { playCountFeedback } from '../utils/feedback';
import { toBengaliDigits } from '../utils/prayerTimes';

interface DuaCardProps {
  dua: DuaItem;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onOpenTasbeeh: (dua: DuaItem) => void;
}

export const DuaCard: React.FC<DuaCardProps> = ({
  dua,
  isCompleted,
  onToggleComplete,
  onOpenTasbeeh
}) => {
  const [copied, setCopied] = useState(false);
  const [showHadithContext, setShowHadithContext] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${dua.title}\n\n${dua.arabic}\n\nউচ্চারণ: ${dua.pronunciation}\n\nঅর্থ: ${dua.meaning}\n\nহাদিস সূত্র: ${dua.reference}${dua.narrator ? ` (বর্ণনায়: ${dua.narrator})` : ''}`
    );
    setCopied(true);
    playCountFeedback(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggle = () => {
    playCountFeedback(!isCompleted);
    onToggleComplete(dua.id);
  };

  return (
    <div 
      className={`islamic-glass-card rounded-3xl p-4 sm:p-5 transition-all duration-300 relative overflow-hidden ${
        isCompleted 
          ? 'opacity-85 border-emerald-500/30' 
          : 'border-emerald-700/40 hover:border-amber-400/50 shadow-xl'
      }`}
    >
      {/* Soft Watermark / Corner Light */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-full" />

      {/* Top Header: Title, Count Badge & Actions */}
      <div className="flex items-start justify-between gap-2 mb-3.5 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold text-white font-literary tracking-wide">
              {dua.title}
            </h3>

            {dua.count > 1 ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {toBengaliDigits(dua.count)} বার
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/40">
                ১ বার
              </span>
            )}

            {dua.hadithGrade && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-500/40">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{dua.hadithGrade}</span>
              </span>
            )}
          </div>

          {dua.subtitle && (
            <p className="text-[11px] text-emerald-300/80 mt-0.5">{dua.subtitle}</p>
          )}
        </div>

        {/* Copy & Complete Action Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-800 text-emerald-300 hover:text-white border border-emerald-800/40 transition active:scale-95"
            title="দোয়া কপি করুন"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleToggle}
            className={`p-1.5 rounded-xl transition active:scale-95 ${
              isCompleted 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-emerald-900/50 text-emerald-400 hover:bg-emerald-800 border border-emerald-800/40'
            }`}
            title={isCompleted ? 'পড়া সম্পন্ন হয়েছে' : 'পড়া সম্পন্ন হিসেবে চিহ্নিত করুন'}
          >
            {isCompleted ? <CheckCircle2 className="w-5 h-5 fill-emerald-500/30 text-emerald-400" /> : <Circle className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Arabic Calligraphy Block */}
      <div className="bg-[#051c13]/90 rounded-2xl p-4 mb-3.5 border border-emerald-800/50 relative shadow-inner">
        <p className="arabic-calligraphy text-xl sm:text-2xl text-amber-100 font-medium leading-loose selection:bg-amber-500/30">
          {dua.arabic}
        </p>
      </div>

      {/* Bengali Pronunciation */}
      <div className="mb-2.5 bg-[#061f15]/80 p-3 rounded-xl border border-emerald-900/60">
        <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase block mb-1">
          উচ্চারণ
        </span>
        <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-normal">
          {dua.pronunciation}
        </p>
      </div>

      {/* Bengali Meaning */}
      <div className="mb-3 bg-[#061f15]/60 p-3 rounded-xl border border-emerald-900/40">
        <span className="text-[10px] font-bold tracking-wider text-amber-400/90 uppercase block mb-1">
          অর্থ
        </span>
        <p className="text-xs sm:text-[13px] text-slate-200/95 leading-relaxed font-literary">
          {dua.meaning}
        </p>
      </div>

      {/* Virtue / Fazilat Badge */}
      {dua.virtue && (
        <div className="mb-3 flex items-start gap-2 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 p-2.5 rounded-xl border border-amber-500/20 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] sm:text-xs text-amber-200/90 leading-relaxed font-literary">
            <span className="font-bold text-amber-300">ফজিলত: </span>
            {dua.virtue}
          </div>
        </div>
      )}

      {/* Expandable Hadith Evidence & Context */}
      {dua.hadithContext && (
        <div className="mb-3">
          <button
            onClick={() => setShowHadithContext(!showHadithContext)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-800/50 text-xs text-emerald-300 font-semibold transition"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>সহীহ হাদিসের বর্ণনা ও প্রেক্ষাপট</span>
            </div>
            {showHadithContext ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showHadithContext && (
            <div className="mt-2 p-3 rounded-xl bg-emerald-950/90 border border-emerald-800/60 text-xs text-slate-300 space-y-1.5 animate-in fade-in">
              <p className="leading-relaxed font-literary">{dua.hadithContext}</p>
              {dua.narrator && (
                <p className="text-[11px] text-amber-300 font-medium">
                  বর্ণনাকারী: {dua.narrator} (রা.)
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom Bar: Hadith Reference & Optional Tasbeeh Trigger Button */}
      <div className="flex items-center justify-between pt-2 border-t border-emerald-900/60 text-[11px]">
        <span className="text-emerald-400/80 font-mono truncate max-w-[200px]" title={dua.reference}>
          দলিল: {dua.reference}
        </span>

        {dua.count > 1 ? (
          <button
            onClick={() => onOpenTasbeeh(dua)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-md transition active:scale-95"
          >
            <Play className="w-3 h-3 fill-emerald-950" />
            <span>তাসবীহ শুরু করুন ({toBengaliDigits(dua.count)})</span>
          </button>
        ) : (
          <button
            onClick={handleToggle}
            className={`flex items-center gap-1 text-xs font-semibold transition ${
              isCompleted ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            <span>{isCompleted ? 'পড়া হয়েছে ✓' : 'পড়েছি'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
