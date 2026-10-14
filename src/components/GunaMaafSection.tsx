import React from 'react';
import { GUNA_MAAF_ADHKAR } from '../data/gunaMaafData';
import { DuaCard } from './DuaCard';
import { DuaItem } from '../types';
import { Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { toBengaliDigits } from '../utils/prayerTimes';

interface GunaMaafSectionProps {
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  onOpenTasbeeh: (dua: DuaItem) => void;
}

export const GunaMaafSection: React.FC<GunaMaafSectionProps> = ({
  completedIds,
  onToggleComplete,
  onOpenTasbeeh
}) => {
  const completedInGunaMaaf = GUNA_MAAF_ADHKAR.filter((d) => completedIds.includes(d.id)).length;

  return (
    <div className="max-w-md mx-auto px-4 pb-16">
      {/* Header Banner */}
      <div className="islamic-glass-card p-5 rounded-3xl border border-amber-500/30 mb-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-400/20 text-amber-300">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-base font-bold text-white font-literary tracking-wide">
              গুনাহ মাফ ও মুক্তির সহীহ আমল
            </h2>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-900/90 text-amber-300 border border-amber-400/40 font-bold">
            {toBengaliDigits(completedInGunaMaaf)}/{toBengaliDigits(GUNA_MAAF_ADHKAR.length)} সম্পন্ন
          </span>
        </div>

        <p className="text-xs text-emerald-200/90 leading-relaxed font-literary">
          রাসূলুল্লাহ (ﷺ) ইরশাদ করেছেন—নামাজের পর এবং প্রতিদিনের বিশেষ কিছু যিকির বান্দার সমুদ্রের ফেনা পরিমাণ গুনাহও ক্ষমা করিয়ে দেয়। এখানে বিশুদ্ধ সহীহ সনদভিত্তিক (বুখারী ও মুসলিম) অপরিহার্য আমলগুলো সাজানো হলো।
        </p>

        <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-300/90 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>১০০% প্রামাণ্য সহীহ হাদীস</span>
          </span>
          <span className="flex items-center gap-1 text-rose-300">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>জাহান্নাম ও পাপের বোঝা থেকে নিষ্কৃতি</span>
          </span>
        </div>
      </div>

      {/* List of Dua Cards */}
      <div className="space-y-4">
        {GUNA_MAAF_ADHKAR.map((dua) => (
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
