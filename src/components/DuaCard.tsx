import React, { useState } from 'react';
import { DuaItem } from '../types';
import { CheckCircle2, Circle, Copy, Check, Sparkles, BookOpen, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { playCountFeedback } from '../utils/feedback';

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
  const showMeaning = true;

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
      className={`relative rounded-2xl p-4 transition-all duration-300 border ${
        isCompleted 
          ? 'bg-emerald-950/40 border-emerald-500/40 opacity-90 shadow-sm' 
          : 'bg-emerald-950/80 border-emerald-700/50 shadow-md hover:border-emerald-500/60'
      }`}
    >
      {/* Top Bar: Title, Count Badge & Actions */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-white tracking-wide">{dua.title}</h3>
            {dua.count > 1 ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {dua.count} বার
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-800/40 text-emerald-300 border border-emerald-700/30">
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

        {/* Copy & Complete Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white transition active:scale-95"
            title="দোয়া কপি করুন"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleToggle}
            className={`p-1.5 rounded-lg transition active:scale-95 ${
              isCompleted 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-emerald-900/60 text-emerald-400 hover:bg-emerald-800'
            }`}
            title={isCompleted ? 'পড়া সম্পন্ন হয়েছে' : 'পড়া সম্পন্ন হিসেবে চিহ্নিত করুন'}
          >
            {isCompleted ? <CheckCircle2 className="w-5 h-5 fill-emerald-500/30 text-emerald-400" /> : <Circle className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Arabic Text Block */}
      <div className="bg-emerald-900/40 rounded-xl p-3.5 mb-3 border border-emerald-800/40">
        <p className="arabic-text text-xl md:text-2xl text-amber-100 font-medium leading-loose selection:bg-amber-500/30">
          {dua.arabic}
        </p>
      </div>

      {/* Bengali Pronunciation */}
      <div className="mb-3 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-900/60">
        <span className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase block mb-1">
          উচ্চারণ
        </span>
        <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
          {dua.pronunciation}
        </p>
      </div>

      {/* Bengali Meaning */}
      {showMeaning && (
        <div className="mb-3 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/40">
          <span className="text-[10px] font-semibold tracking-wider text-amber-400/90 uppercase block mb-1">
            অর্থ
          </span>
          <p className="text-xs text-slate-200/90 leading-relaxed">
            {dua.meaning}
          </p>
        </div>
      )}

      {/* Virtue / Fazilat */}
      {dua.virtue && (
        <div className="mb-3 flex items-start gap-2 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 p-2.5 rounded-lg border border-amber-500/20 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-200/90 leading-relaxed">
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
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-800/50 text-xs text-emerald-300 font-semibold transition"
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>সহীহ হাদিসের দলিল ও প্রেক্ষাপট</span>
              {dua.narrator && (
                <span className="text-[10px] font-normal text-slate-300">({dua.narrator})</span>
              )}
            </span>
            {showHadithContext ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          
          {showHadithContext && (
            <div className="mt-2 p-3 rounded-xl bg-slate-900/90 border border-emerald-700/40 text-xs text-slate-200 leading-relaxed animate-in fade-in">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>হাদিসের বিবরণ:</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed italic">
                "{dua.hadithContext}"
              </p>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-emerald-400">
                <span>হাদিস সূত্র: {dua.reference}</span>
                <span className="font-bold text-amber-400">{dua.hadithGrade || 'সহীহ'}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer: Hadith Reference & Tasbeeh Counter Button */}
      <div className="flex items-center justify-between pt-2 border-t border-emerald-800/40 text-[11px]">
        <div className="flex items-center gap-1 text-emerald-400/80">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="truncate max-w-[180px] sm:max-w-xs">{dua.reference}</span>
        </div>

        {/* Digital Tasbeeh Trigger Button */}
        <button
          onClick={() => onOpenTasbeeh(dua)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-sm transition active:scale-95 flex-shrink-0"
        >
          <span>📿</span>
          <span>তাসবীহ ({dua.count}x)</span>
        </button>
      </div>
    </div>
  );
};
