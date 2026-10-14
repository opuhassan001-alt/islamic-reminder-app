import React from 'react';
import { Smartphone, HelpCircle, CheckCircle2, BookOpen, Heart } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  onOpenInstallGuide: () => void;
  onOpenConnectGuide: () => void;
  onOpenHadithGuide: () => void;
  onOpenSpiritualMood: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  onOpenInstallGuide,
  onOpenConnectGuide,
  onOpenHadithGuide,
  onOpenSpiritualMood,
}) => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const banglaDate = today.toLocaleDateString('bn-BD', options);
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-[#03140e]/90 backdrop-blur-xl border-b border-emerald-800/40 px-4 py-3 shadow-xl">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-amber-500 to-yellow-300 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-[#03160f] rounded-[14px] flex items-center justify-center">
              <span className="text-xl filter drop-shadow">🌙</span>
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide font-literary flex items-center gap-1.5">
              <span>দ্বীনি আমল ও দোয়া</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                PWA
              </span>
            </h1>
            <p className="text-[11px] text-emerald-300/80 font-medium">{banglaDate}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Spiritual Mood / রূহানী প্রেসক্রিপশন Button */}
          <button
            onClick={onOpenSpiritualMood}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600/30 to-amber-500/20 hover:from-amber-600/40 hover:to-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold shadow-sm transition active:scale-95"
            title="মনের অবস্থা অনুযায়ী দোয়া ও জিকির"
          >
            <Heart className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xs:inline">রূহানী প্রেসক্রিপশন</span>
          </button>

          {/* Hadith Guide Button */}
          <button
            onClick={onOpenHadithGuide}
            className="p-1.5 sm:px-2 sm:py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 text-xs font-semibold shadow-sm transition active:scale-95"
            title="সহীহ হাদিসের দলিল ও নিয়ম"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Install Guide Button */}
          <button
            onClick={onOpenInstallGuide}
            className="p-1.5 sm:px-2 sm:py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 border border-emerald-700/50 text-xs font-semibold shadow-sm transition active:scale-95"
            title="ফোনে ইনস্টল নির্দেশিকা"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Connect Help Button */}
          <button
            onClick={onOpenConnectGuide}
            className="p-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60 transition active:scale-95"
            title="পিসি থেকে ফোনে কানেক্ট করার নিয়ম"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Daily Progress Tracker */}
      <div className="max-w-md mx-auto mt-2.5 pt-2 border-t border-emerald-900/50 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>দৈনিক আমল সম্পন্ন:</span>
          <span className="font-bold text-white font-literary">{completedCount}/{totalCount}</span>
        </div>
        <div className="w-28 bg-emerald-950/90 rounded-full h-2 overflow-hidden border border-emerald-800/60 shadow-inner">
          <div 
            className="bg-gradient-to-r from-emerald-500 via-amber-400 to-yellow-300 h-full rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </header>
  );
};
