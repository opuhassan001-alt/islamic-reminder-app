import React, { useState } from 'react';
import { SPIRITUAL_MOODS } from '../data/spiritualMoodData';
import { MoodPrescription } from '../types';
import { 
  Heart, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  ArrowLeft, 
  X, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { playCountFeedback } from '../utils/feedback';
import { toBengaliDigits } from '../utils/prayerTimes';

interface SpiritualMoodModalProps {
  onClose: () => void;
}

export const SpiritualMoodModal: React.FC<SpiritualMoodModalProps> = ({ onClose }) => {
  const [selectedMood, setSelectedMood] = useState<MoodPrescription | null>(null);
  const [copied, setCopied] = useState(false);
  const [tasbeehCount, setTasbeehCount] = useState(0);

  const handleSelectMood = (mood: MoodPrescription) => {
    setSelectedMood(mood);
    setTasbeehCount(0);
    playCountFeedback(false);
  };

  const handleCopyDua = (mood: MoodPrescription) => {
    const text = `${mood.propheticDua.title}\n\n${mood.propheticDua.arabic}\n\nউচ্চারণ: ${mood.propheticDua.pronunciation}\n\nঅর্থ: ${mood.propheticDua.meaning}\n\nহাদিস সূত্র: ${mood.propheticDua.reference}\n\nপদ্ধতি: ${mood.propheticDua.actionAdvice}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    playCountFeedback(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTasbeehTap = (target: number) => {
    const next = tasbeehCount + 1;
    setTasbeehCount(next);
    const isCompleted = next >= target;
    playCountFeedback(isCompleted);
  };

  const handleResetTasbeeh = () => {
    setTasbeehCount(0);
    playCountFeedback(false);
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="islamic-glass-card w-full max-w-lg rounded-3xl p-5 border border-amber-500/30 max-h-[90vh] flex flex-col shadow-2xl relative">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-emerald-800/60 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {selectedMood ? (
              <button
                onClick={() => {
                  setSelectedMood(null);
                  setTasbeehCount(0);
                }}
                className="p-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 border border-emerald-700/50 transition active:scale-95"
                title="তালিকায় ফিরে যান"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-400/40 flex items-center justify-center">
                <Heart className="w-4 h-4 text-amber-400" />
              </div>
            )}
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-literary flex items-center gap-1.5">
                <span>রূহানী প্রেসক্রিপশন</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  আত্মার নিরাময়
                </span>
              </h2>
              <p className="text-[11px] text-emerald-300/80">
                {selectedMood ? selectedMood.titleBn : 'অন্তরের অবস্থা অনুযায়ী কুরআন ও সুন্নাহর নির্দেশনা'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-300 hover:text-white transition"
            title="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto pt-4 space-y-4 pr-1 flex-1">
          {!selectedMood ? (
            /* Mood Selector Grid */
            <div>
              <p className="text-xs text-slate-300 mb-3 font-medium">
                এখন আপনার মনের অবস্থা কেমন? নিচের তালিকা থেকে নির্বাচন করুন:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SPIRITUAL_MOODS.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleSelectMood(mood)}
                    className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-emerald-900/40 hover:to-emerald-800/50 border border-emerald-800/60 hover:border-amber-400/50 transition duration-200 text-left flex items-start gap-3 active:scale-98 shadow-sm group"
                  >
                    <span className="text-2xl p-2 rounded-xl bg-emerald-900/50 border border-emerald-700/40 flex-shrink-0 group-hover:scale-110 transition">
                      {mood.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white font-literary group-hover:text-amber-300 transition">
                        {mood.titleBn}
                      </h4>
                      <p className="text-[11px] text-slate-300/80 mt-1 line-clamp-2 leading-relaxed">
                        {mood.subtitleBn}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Mood Detail & Prescription View */
            <div className="space-y-4 animate-in fade-in">
              {/* Quranic Solace Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-emerald-950/60 to-emerald-900/30 border border-amber-500/30 shadow-md">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>কুরআনের নূর ও সান্ত্বনা</span>
                </div>
                <div className="bg-emerald-950/80 rounded-xl p-3 border border-amber-400/20 mb-2 text-right">
                  <p className="arabic-calligraphy text-xl text-amber-100 font-medium">
                    {selectedMood.quranVerse.arabic}
                  </p>
                </div>
                <p className="text-xs text-slate-200 font-literary leading-relaxed">
                  "{selectedMood.quranVerse.meaning}"
                </p>
                <span className="block text-[10px] text-amber-400/90 font-mono mt-1 text-right">
                  — {selectedMood.quranVerse.surah}
                </span>
              </div>

              {/* Prophetic Dua Card */}
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>রাসূলুল্লাহ (ﷺ) এর শেখানো দোয়া</span>
                  </div>
                  <button
                    onClick={() => handleCopyDua(selectedMood)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 text-[11px] border border-emerald-700/40 transition active:scale-95"
                    title="দোয়া কপি করুন"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
                  </button>
                </div>

                <h4 className="text-xs font-bold text-white mb-2">{selectedMood.propheticDua.title}</h4>

                <div className="bg-emerald-900/40 rounded-xl p-3 mb-2 border border-emerald-800/50 text-right">
                  <p className="arabic-calligraphy text-lg sm:text-xl text-amber-100 font-medium">
                    {selectedMood.propheticDua.arabic}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="bg-emerald-950/90 p-2.5 rounded-lg border border-emerald-900/60">
                    <span className="text-[10px] font-semibold text-emerald-400 block mb-0.5">উচ্চারণ:</span>
                    <p className="text-slate-200 leading-relaxed">{selectedMood.propheticDua.pronunciation}</p>
                  </div>

                  <div className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-900/40">
                    <span className="text-[10px] font-semibold text-amber-400 block mb-0.5">অর্থ:</span>
                    <p className="text-slate-300 leading-relaxed font-literary">{selectedMood.propheticDua.meaning}</p>
                  </div>
                </div>

                <div className="mt-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-[11px] text-amber-200/90 leading-relaxed">
                  <span className="font-bold text-amber-300">সুন্নাহর আমল: </span>
                  {selectedMood.propheticDua.actionAdvice}
                </div>

                <div className="mt-2 text-[10px] text-emerald-400/80 font-mono">
                  দলিল: {selectedMood.propheticDua.reference}
                </div>
              </div>

              {/* Interactive Recommended Tasbeeh Counter */}
              {selectedMood.recommendedTasbeeh && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/40 to-amber-900/30 border border-emerald-700/60 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300">সুপারিশকৃত জিকির ও তাসবীহ</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-600/40 text-emerald-300">
                      লক্ষ্য: {toBengaliDigits(selectedMood.recommendedTasbeeh.count)} বার
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-white mb-1">
                    "{selectedMood.recommendedTasbeeh.phrase}"
                  </p>
                  <p className="text-[11px] text-slate-300 mb-3">
                    ফজিলত: {selectedMood.recommendedTasbeeh.virtue}
                  </p>

                  {/* Tasbeeh Tap Button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTasbeehTap(selectedMood.recommendedTasbeeh!.count)}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
                    >
                      <span>গণনা করুন</span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950 text-amber-300 font-mono text-base font-extrabold border border-emerald-500/30">
                        {toBengaliDigits(tasbeehCount)}
                      </span>
                    </button>

                    <button
                      onClick={handleResetTasbeeh}
                      className="p-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-300 border border-emerald-800/60 transition active:scale-95"
                      title="রিসেট করুন"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {tasbeehCount >= selectedMood.recommendedTasbeeh.count && (
                    <div className="mt-2.5 p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-center text-xs font-bold text-emerald-300 animate-in fade-in flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>মাশাআল্লাহ! নির্ধারিত জিকির সম্পন্ন হয়েছে।</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
