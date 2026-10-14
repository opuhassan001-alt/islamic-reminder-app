import React from 'react';
import { PrayerType } from '../types';
import { Sun, Sunset, Moon, Sunrise, Compass } from 'lucide-react';

interface PrayerTabsProps {
  activeTab: 'prayers' | 'gunamaaf' | 'adhkar' | 'tasbeeh';
  onTabChange: (tab: 'prayers' | 'gunamaaf' | 'adhkar' | 'tasbeeh') => void;
  selectedPrayer: PrayerType;
  onSelectPrayer: (prayer: PrayerType) => void;
}

export const PrayerTabs: React.FC<PrayerTabsProps> = ({
  activeTab,
  onTabChange,
  selectedPrayer,
  onSelectPrayer
}) => {
  const prayerList: { id: PrayerType; name: string; icon: React.ReactNode }[] = [
    { id: 'fajr', name: 'ফজর', icon: <Sunrise className="w-3.5 h-3.5" /> },
    { id: 'dhuhr', name: 'যোহর', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'asr', name: 'আসর', icon: <Sun className="w-3.5 h-3.5 opacity-75" /> },
    { id: 'maghrib', name: 'মাগরিব', icon: <Sunset className="w-3.5 h-3.5" /> },
    { id: 'isha', name: 'এশা', icon: <Moon className="w-3.5 h-3.5" /> },
    { id: 'tahajjud', name: 'তাহাজ্জুদ', icon: <Compass className="w-3.5 h-3.5 text-amber-400" /> }
  ];

  return (
    <div className="max-w-md mx-auto px-4 pt-3 pb-2">
      {/* Main Mode Switcher: নামাজের দোয়া / গুনাহ মাফের আমল / সকাল ও সন্ধ্যা / সরাসরি তাসবীহ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-emerald-950/70 p-1.5 rounded-2xl border border-emerald-800/50 mb-3 shadow-inner">
        <button
          onClick={() => onTabChange('prayers')}
          className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
            activeTab === 'prayers'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          🕌 নামাজের দোয়া
        </button>
        <button
          onClick={() => onTabChange('gunamaaf')}
          className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
            activeTab === 'gunamaaf'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 shadow-md font-extrabold'
              : 'text-amber-300 hover:text-amber-200'
          }`}
        >
          ✨ গুনাহ মাফ
        </button>
        <button
          onClick={() => onTabChange('adhkar')}
          className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
            activeTab === 'adhkar'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          🌅 সকাল-সন্ধ্যা
        </button>
        <button
          onClick={() => onTabChange('tasbeeh')}
          className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
            activeTab === 'tasbeeh'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          📿 তাসবীহ
        </button>
      </div>

      {/* Sub-tabs for the 6 Prayers when activeTab === 'prayers' */}
      {activeTab === 'prayers' && (
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
          {prayerList.map((p) => {
            const isSelected = selectedPrayer === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPrayer(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/20 scale-105'
                    : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/60 border border-emerald-800/40'
                }`}
              >
                {p.icon}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
