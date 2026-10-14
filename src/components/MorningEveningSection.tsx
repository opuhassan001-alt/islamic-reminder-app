import React, { useState } from 'react';
import { MORNING_ADHKAR, EVENING_ADHKAR } from '../data/adhkarData';
import { DuaCard } from './DuaCard';
import { DuaItem } from '../types';
import { Sunrise, Sunset } from 'lucide-react';
import { toBengaliDigits } from '../utils/prayerTimes';

interface MorningEveningSectionProps {
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  onOpenTasbeeh: (dua: DuaItem) => void;
}

export const MorningEveningSection: React.FC<MorningEveningSectionProps> = ({
  completedIds,
  onToggleComplete,
  onOpenTasbeeh
}) => {
  const [subTab, setSubTab] = useState<'morning' | 'evening'>('morning');

  const currentList = subTab === 'morning' ? MORNING_ADHKAR : EVENING_ADHKAR;

  const adaptedDuas: DuaItem[] = currentList.map((item) => ({
    id: item.id,
    title: item.title,
    arabic: item.arabic,
    pronunciation: item.pronunciation,
    meaning: item.meaning,
    count: item.count,
    reference: item.reference,
    narrator: item.narrator,
    hadithGrade: item.hadithGrade,
    hadithContext: item.hadithContext,
    virtue: item.virtue
  }));

  const morningCompleted = MORNING_ADHKAR.filter((d) => completedIds.includes(d.id)).length;
  const eveningCompleted = EVENING_ADHKAR.filter((d) => completedIds.includes(d.id)).length;

  return (
    <div className="max-w-md mx-auto px-4 pb-16">
      {/* Sub-tab Switcher: সকালের আমল vs সন্ধ্যার আমল */}
      <div className="flex bg-[#051c13] p-1.5 rounded-2xl border border-emerald-800/60 mb-4 shadow-md">
        <button
          onClick={() => setSubTab('morning')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
            subTab === 'morning'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-md font-bold'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <Sunrise className="w-4 h-4" />
          <span className="font-literary">সকালের আমল ({toBengaliDigits(morningCompleted)}/{toBengaliDigits(MORNING_ADHKAR.length)})</span>
        </button>
        <button
          onClick={() => setSubTab('evening')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
            subTab === 'evening'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-md font-bold'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <Sunset className="w-4 h-4" />
          <span className="font-literary">সন্ধ্যার আমল ({toBengaliDigits(eveningCompleted)}/{toBengaliDigits(EVENING_ADHKAR.length)})</span>
        </button>
      </div>

      {/* Intro Banner */}
      <div className="islamic-glass-card border border-emerald-700/40 p-3.5 rounded-2xl mb-4 text-xs text-emerald-200/90 leading-relaxed font-literary">
        {subTab === 'morning' ? (
          <p>
            ☀️ <span className="font-bold text-amber-300">সকালের আমল:</span> ফজরের পর থেকে সূর্যোদয় বা দ্বিপ্রহরের পূর্ব পর্যন্ত পড়ার সর্বোত্তম সময়। এতে সারাদিনের সুরক্ষা ও বরকত হাসিল হয়।
          </p>
        ) : (
          <p>
            🌙 <span className="font-bold text-amber-300">সন্ধ্যার আমল:</span> আসরের পর থেকে মাগরিব বা রাতের যেকোনো সময় পড়ার মাসনূন নিয়ম। এতে সারারাত যাবতীয় অনিষ্ট থেকে নিরাপদে থাকা যায়।
          </p>
        )}
      </div>

      {/* Dua Cards List */}
      <div className="space-y-4">
        {adaptedDuas.map((dua) => (
          <DuaCard
            key={dua.id}
            dua={dua}
            isCompleted={completedIds.includes(dua.id)}
            onToggleComplete={onToggleComplete}
            onOpenTasbeeh={onOpenTasbeeh}
          />
        ))}
      </div>
    </div>
  );
};
