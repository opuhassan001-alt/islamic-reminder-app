import React from 'react';
import { Smartphone, HelpCircle, CheckCircle2, BookOpen } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  onOpenInstallGuide: () => void;
  onOpenConnectGuide: () => void;
  onOpenHadithGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  onOpenInstallGuide,
  onOpenConnectGuide,
  onOpenHadithGuide,
}) => {
  // Format Bengali date
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
    <header className="sticky top-0 z-30 bg-emerald-950/90 backdrop-blur-md border-b border-emerald-800/40 px-4 py-3 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl">🌙</span>
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>দ্বীনি আমল ও দোয়া</span>
            </h1>
            <p className="text-[11px] text-emerald-300/80 font-medium">{banglaDate}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Phone Install Helper Button */}
          <button
            onClick={onOpenInstallGuide}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-amber-300 border border-emerald-600/40 text-xs font-semibold shadow-sm transition active:scale-95"
            title="ফোনে ইনস্টল করার উপায়"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">ফোনে ইনস্টল</span>
          </button>

          {/* Hadith Guide Button */}
          <button
            onClick={onOpenHadithGuide}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 border border-emerald-600/40 text-xs font-semibold shadow-sm transition active:scale-95"
            title="সহীহ হাদিসের দলিল ও নিয়ম"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">সহীহ দলিল</span>
          </button>

          {/* Connect Help Button */}
          <button
            onClick={onOpenConnectGuide}
            className="p-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-700/40 transition active:scale-95"
            title="পিসি থেকে ফোনে কানেক্ট করার নিয়ম"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Daily Progress Bar */}
      <div className="max-w-md mx-auto mt-2 pt-2 border-t border-emerald-900/50 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>আজকের আমল:</span>
          <span className="font-bold text-white">{completedCount}/{totalCount} সম্পন্ন</span>
        </div>
        <div className="w-28 bg-emerald-900/80 rounded-full h-2 overflow-hidden border border-emerald-700/50">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </header>
  );
};
