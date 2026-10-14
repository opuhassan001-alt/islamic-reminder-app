import React from 'react';
import { PrayerType } from '../types';
import { Sun, Sunset, Moon, Sunrise, Compass } from 'lucide-react';

interface PrayerTabsProps {
  activeTab: 'prayers' | 'masnoon' | 'smart_tasbeeh' | 'adhkar' | 'gunamaaf' | 'tasbeeh';
  onTabChange: (tab: 'prayers' | 'masnoon' | 'smart_tasbeeh' | 'adhkar' | 'gunamaaf' | 'tasbeeh') => void;
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

  const mainTabs = [
    { id: 'prayers' as const, label: 'নামাজের আমল', icon: '🕌' },
    { id: 'smart_tasbeeh' as const, label: '৩৩-৩৩-৩৪ তাসবীহ', icon: '📿' },
    { id: 'masnoon' as const, label: 'মাসনূন দোয়া', icon: '🤲' },
    { id: 'adhkar' as const, label: 'সকাল-সন্ধ্যা', icon: '🌅' },
    { id: 'gunamaaf' as const, label: 'গুনাহ মাফ', icon: '✨' },
    { id: 'tasbeeh' as const, label: 'ফ্রি কাউন্টার', icon: '🔢' },
  ];

  return (
    <div className="max-w-md mx-auto px-4 pt-3 pb-2">
      {/* Main Mode Slider */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {mainTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-all shadow-sm ${
              activeTab === t.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold shadow-md scale-[1.02]'
                : 'bg-emerald-950/80 text-emerald-300 hover:text-white border border-emerald-800/60'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
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
