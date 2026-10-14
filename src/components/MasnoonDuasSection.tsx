import React, { useState, useMemo } from 'react';
import { MASNOON_DUAS } from '../data/masnoonDuasData';
import { MasnoonCategory, MasnoonDuaItem } from '../types';
import { Search, BookOpen, Copy, Check, Info, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { triggerHaptic } from '../utils/feedback';

interface MasnoonDuasSectionProps {
  completedIds: string[];
  onToggleComplete: (id: string) => void;
}

const CATEGORIES: { id: MasnoonCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'সকল দোয়া', icon: '🌟' },
  { id: 'sleep', label: 'ঘুম ও বিশ্রাম', icon: '🛌' },
  { id: 'food', label: 'খাদ্য ও পানীয়', icon: '🍽️' },
  { id: 'home_masjid', label: 'ঘর ও মসজিদ', icon: '🕌' },
  { id: 'distress', label: 'পেরেশানি ও ঋণ', icon: '🤲' },
  { id: 'protection', label: 'নিরাপত্তা ও হিফাযত', icon: '🛡️' },
  { id: 'travel_nature', label: 'সফর ও প্রকৃতি', icon: '🚗' },
];

export const MasnoonDuasSection: React.FC<MasnoonDuasSectionProps> = ({
  completedIds,
  onToggleComplete,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MasnoonCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedVirtueId, setExpandedVirtueId] = useState<string | null>(null);

  const filteredDuas = useMemo(() => {
    return MASNOON_DUAS.filter((dua) => {
      const matchesCategory = selectedCategory === 'all' || dua.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        dua.title.toLowerCase().includes(query) ||
        dua.meaning.toLowerCase().includes(query) ||
        dua.pronunciation.toLowerCase().includes(query) ||
        dua.situation.toLowerCase().includes(query) ||
        dua.arabic.includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (dua: MasnoonDuaItem) => {
    const textToCopy = `${dua.title}\n\n${dua.arabic}\n\nউচ্চারণ: ${dua.pronunciation}\n\nঅর্থ: ${dua.meaning}\n\nরেফারেন্স: ${dua.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(dua.id);
    triggerHaptic(25);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <main className="max-w-md mx-auto px-4 pb-20 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border border-emerald-600/50 mb-4 shadow-xl">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>দৈনন্দিন মাসনূন দোয়ার বিশ্বস্ত লাইব্রেরি</span>
        </div>
        <h2 className="text-base font-bold text-white">রাসুলুল্লাহ (ﷺ)-এর প্রতিটি মুহূর্তের সুন্নাত আমল</h2>
        <p className="text-xs text-emerald-200/90 mt-1">
          ঘুম, খাওয়া, ঘর, মসজিদ, ঋণমুক্তি ও হিফাযতের প্রামাণ্য সহীহ হাদিস
        </p>

        {/* Search Bar */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="দোয়া বা পরিস্থিতি খুঁজুন (যেমন: ঘুম, ঋণ, বিপদ...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950/80 border border-emerald-700/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-3 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              triggerHaptic(15);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-emerald-950 shadow-md font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/80'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
        <span>প্রাপ্ত দোয়া: <strong className="text-amber-300">{filteredDuas.length}</strong> টি</span>
        <span>আমল সম্পন্ন: <strong className="text-emerald-400">{completedIds.filter((id) => id.startsWith('masnoon-')).length}</strong> টি</span>
      </div>

      {/* Duas List */}
      <div className="space-y-4">
        {filteredDuas.map((dua) => {
          const isCompleted = completedIds.includes(dua.id);
          const isVirtueExpanded = expandedVirtueId === dua.id;

          return (
            <div
              key={dua.id}
              className={`p-4 rounded-3xl border transition-all duration-200 shadow-lg ${
                isCompleted
                  ? 'bg-emerald-950/60 border-emerald-600/80'
                  : 'bg-slate-900/90 border-emerald-900/60 hover:border-emerald-700/80'
              }`}
            >
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-600/40 text-[10px] font-bold text-emerald-300">
                      {dua.categoryNameBn}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      <span>{dua.hadithGrade}</span>
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{dua.title}</h3>
                  <p className="text-[11px] text-amber-300/90 mt-0.5">
                    📌 {dua.situation}
                  </p>
                </div>

                {/* Mark as Done Checkbox */}
                <button
                  onClick={() => {
                    onToggleComplete(dua.id);
                    triggerHaptic(30);
                  }}
                  className={`p-2 rounded-2xl border transition active:scale-95 ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-400 text-emerald-950 shadow-md'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title={isCompleted ? 'আমল সম্পন্ন' : 'আমল সম্পন্ন হিসেবে চিহ্নিত করুন'}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>

              {/* Arabic Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-right my-2.5">
                <p className="arabic-text text-xl font-bold text-amber-200 leading-loose">
                  {dua.arabic}
                </p>
              </div>

              {/* Pronunciation & Meaning */}
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">উচ্চারণ:</span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {dua.pronunciation}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">অর্থ:</span>
                  <p className="text-emerald-100/90 leading-relaxed">
                    {dua.meaning}
                  </p>
                </div>
              </div>

              {/* Reference */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 text-slate-400">
                  <BookOpen className="w-3 h-3 text-amber-400" />
                  <span className="text-slate-300 font-mono text-[10px]">{dua.reference}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Virtue Toggle */}
                  <button
                    onClick={() => {
                      setExpandedVirtueId(isVirtueExpanded ? null : dua.id);
                      triggerHaptic(15);
                    }}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-medium transition ${
                      isVirtueExpanded
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Info className="w-3 h-3 text-amber-400" />
                    <span>ফজিলত</span>
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(dua)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition active:scale-95"
                    title="দোয়া কপি করুন"
                  >
                    {copiedId === dua.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Expandable Virtue Box */}
              {isVirtueExpanded && (
                <div className="mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed animate-in fade-in duration-200">
                  <div className="flex items-center gap-1 font-bold text-amber-300 text-[11px] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>আমলের বিশেষ ফজিলত ও বরকত:</span>
                  </div>
                  <p>{dua.virtue}</p>
                  {dua.narrator && (
                    <p className="mt-1.5 text-[10px] text-slate-300">
                      — বর্ণনাকারী: <strong>{dua.narrator}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredDuas.length === 0 && (
          <div className="p-8 text-center rounded-3xl bg-slate-900 border border-slate-800">
            <Heart className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-300">কোনো দোয়া পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500 mt-1">অন্য কোনো শব্দ দিয়ে সার্চ করে দেখুন।</p>
          </div>
        )}
      </div>
    </main>
  );
};
