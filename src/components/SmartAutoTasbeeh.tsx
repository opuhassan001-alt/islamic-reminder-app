import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Check, ChevronRight, Award, Vibrate } from 'lucide-react';
import { playCountFeedback, triggerHaptic } from '../utils/feedback';
import { toBengaliDigits } from '../utils/prayerTimes';

interface SmartAutoTasbeehProps {
  onIncrementGlobalTotal?: () => void;
}

type AutoPhase = 'subhanallah' | 'alhamdulillah' | 'allahuakbar' | 'kalima' | 'completed';

const PHASES_CONFIG = {
  subhanallah: {
    id: 'subhanallah' as AutoPhase,
    target: 33,
    titleBn: 'সুবহানাল্লাহ',
    arabic: 'سُبْحَانَ اللَّهِ',
    meaning: 'আল্লাহ পরম পবিত্র ও সকল ত্রুটিমুক্ত',
    badge: 'ধাপ ১/৪ (৩৩ বার)',
    theme: 'from-emerald-900/90 to-[#072d1f]',
    accentBorder: 'border-emerald-500/50'
  },
  alhamdulillah: {
    id: 'alhamdulillah' as AutoPhase,
    target: 33,
    titleBn: 'আলহামদুলিল্লাহ',
    arabic: 'الْحَمْدُ لِلَّهِ',
    meaning: 'সমস্ত প্রশংসা একমাত্র আল্লাহর জন্য',
    badge: 'ধাপ ২/৪ (৩৩ বার)',
    theme: 'from-[#0a3826] to-[#042417]',
    accentBorder: 'border-teal-500/50'
  },
  allahuakbar: {
    id: 'allahuakbar' as AutoPhase,
    target: 34,
    titleBn: 'আল্লাহু আকবার',
    arabic: 'اللَّهُ أَكْبَرُ',
    meaning: 'আল্লাহ সর্বশ্রেষ্ঠ ও মহামহিম',
    badge: 'ধাপ ৩/৪ (৩৪ বার)',
    theme: 'from-[#382405] to-[#1c1202]',
    accentBorder: 'border-amber-500/50'
  },
  kalima: {
    id: 'kalima' as AutoPhase,
    target: 1,
    titleBn: '১০০তম সমাপ্তি দোয়া',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    meaning: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর অংশীদার নেই। রাজত্ব ও প্রশংসা তাঁরই, এবং তিনি সর্বশক্তিমান।',
    badge: 'ধাপ ৪/৪ (১ বার - পূর্ণ ১০০ সমাপ্তি)',
    theme: 'from-[#2b1038] to-[#14081c]',
    accentBorder: 'border-purple-500/50'
  }
};

export const SmartAutoTasbeeh: React.FC<SmartAutoTasbeehProps> = ({ onIncrementGlobalTotal }) => {
  const [phase, setPhase] = useState<AutoPhase>('subhanallah');
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(true);
  const [overallCompletedRounds, setOverallCompletedRounds] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('deeni_smart_tasbeeh_rounds');
    if (saved) {
      setOverallCompletedRounds(parseInt(saved, 10) || 0);
    }
  }, []);

  const currentConfig = phase !== 'completed' ? PHASES_CONFIG[phase] : null;

  const handleTap = () => {
    if (phase === 'completed') return;

    const nextCount = currentCount + 1;
    if (onIncrementGlobalTotal) onIncrementGlobalTotal();

    const target = currentConfig?.target || 33;
    const isTargetMet = nextCount >= target;

    if (soundEnabled) playCountFeedback(isTargetMet);
    if (hapticEnabled) triggerHaptic(isTargetMet ? [70, 60, 120] : 30);

    if (nextCount < target) {
      setCurrentCount(nextCount);
    } else {
      if (phase === 'subhanallah') {
        setCurrentCount(0);
        setPhase('alhamdulillah');
      } else if (phase === 'alhamdulillah') {
        setCurrentCount(0);
        setPhase('allahuakbar');
      } else if (phase === 'allahuakbar') {
        setCurrentCount(0);
        setPhase('kalima');
      } else if (phase === 'kalima') {
        setCurrentCount(1);
        setPhase('completed');
        const nextRounds = overallCompletedRounds + 1;
        setOverallCompletedRounds(nextRounds);
        localStorage.setItem('deeni_smart_tasbeeh_rounds', nextRounds.toString());
        triggerHaptic([100, 80, 100, 80, 200]);
      }
    }
  };

  const handleReset = () => {
    setPhase('subhanallah');
    setCurrentCount(0);
    triggerHaptic(40);
  };

  const calculateTotalProgress = () => {
    if (phase === 'subhanallah') return currentCount;
    if (phase === 'alhamdulillah') return 33 + currentCount;
    if (phase === 'allahuakbar') return 66 + currentCount;
    if (phase === 'kalima') return 100;
    return 100;
  };

  const totalProgress = calculateTotalProgress();

  return (
    <div className="max-w-md mx-auto px-4 pb-20 select-none animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="islamic-glass-card p-4 rounded-3xl border border-amber-500/30 mb-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>স্মার্ট অটো-সুইচিং তাসবীহ</span>
            </div>
            <h2 className="text-base font-bold text-white font-literary">নামাজের পরের সুন্নাত ৩৩-৩৩-৩৪ তাসবীহ</h2>
            <p className="text-[11px] text-emerald-200 mt-0.5 font-literary">
              ৩৩ বার পূর্ণ হলে ফোন স্বয়ংক্রিয়ভাবে পরের জিকিরে অগ্রসর হয়
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-emerald-300 block">মোট সম্পন্ন</span>
            <span className="text-lg font-bold text-amber-300 font-mono">
              {toBengaliDigits(overallCompletedRounds)} বার
            </span>
          </div>
        </div>

        {/* 100 Total Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] mb-1 font-medium text-emerald-200">
            <span>১০০টি সুন্নাত জিকিরের অগ্রগতি:</span>
            <span className="font-mono font-bold text-amber-300">
              {toBengaliDigits(totalProgress)}/১০০ সম্পন্ন
            </span>
          </div>
          <div className="w-full bg-[#03140e] rounded-full h-2.5 p-0.5 border border-emerald-800/60 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-300 h-full rounded-full transition-all duration-300"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* Flow Indicators */}
        <div className="grid grid-cols-4 gap-1.5 mt-3 text-center text-[10px]">
          <div className={`p-1.5 rounded-xl border transition ${phase === 'subhanallah' ? 'bg-emerald-600/80 border-emerald-300 font-bold text-white shadow-sm' : totalProgress >= 33 ? 'bg-emerald-950/80 border-emerald-700 text-emerald-400' : 'bg-[#03140e] border-emerald-900/40 text-slate-400'}`}>
            ১. সুবহানাল্লাহ ({toBengaliDigits(33)})
          </div>
          <div className={`p-1.5 rounded-xl border transition ${phase === 'alhamdulillah' ? 'bg-teal-600/80 border-teal-300 font-bold text-white shadow-sm' : totalProgress >= 66 ? 'bg-emerald-950/80 border-emerald-700 text-emerald-400' : 'bg-[#03140e] border-emerald-900/40 text-slate-400'}`}>
            ২. আলহামদুলিল্লাহ ({toBengaliDigits(33)})
          </div>
          <div className={`p-1.5 rounded-xl border transition ${phase === 'allahuakbar' ? 'bg-amber-600/80 border-amber-300 font-bold text-white shadow-sm' : totalProgress >= 100 ? 'bg-emerald-950/80 border-emerald-700 text-emerald-400' : 'bg-[#03140e] border-emerald-900/40 text-slate-400'}`}>
            ৩. আল্লাহু আকবার ({toBengaliDigits(34)})
          </div>
          <div className={`p-1.5 rounded-xl border transition ${phase === 'kalima' ? 'bg-purple-600/80 border-purple-300 font-bold text-white shadow-sm' : phase === 'completed' ? 'bg-emerald-600 border-emerald-300 text-white font-bold' : 'bg-[#03140e] border-emerald-900/40 text-slate-400'}`}>
            ৪. কালেমা ({toBengaliDigits(1)})
          </div>
        </div>
      </div>

      {/* Control Buttons (Sound & Haptics) */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition active:scale-95 ${soundEnabled ? 'bg-emerald-900/80 border-emerald-600 text-amber-300' : 'bg-[#051c13] border-emerald-900/60 text-slate-400'}`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-medium">{soundEnabled ? 'সাউন্ড সক্রিয়' : 'মিউট'}</span>
          </button>

          <button
            onClick={() => setHapticEnabled(!hapticEnabled)}
            className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition active:scale-95 ${hapticEnabled ? 'bg-emerald-900/80 border-emerald-600 text-amber-300' : 'bg-[#051c13] border-emerald-900/60 text-slate-400'}`}
          >
            <Vibrate className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-medium">{hapticEnabled ? 'ভাইব্রেশন সক্রিয়' : 'অফ'}</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl bg-[#061f15] hover:bg-[#0a2e20] border border-emerald-800/60 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition active:scale-95"
          title="পুনরায় শুরু করুন"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[11px]">রিসেট</span>
        </button>
      </div>

      {/* Main Touch Area */}
      {phase !== 'completed' && currentConfig ? (
        <div
          onClick={handleTap}
          role="button"
          tabIndex={0}
          aria-label={`${currentConfig.titleBn} গণনা করতে ট্যাপ করুন`}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              handleTap();
            }
          }}
          className={`relative overflow-hidden cursor-pointer rounded-3xl bg-gradient-to-br ${currentConfig.theme} border-2 ${currentConfig.accentBorder} p-6 shadow-2xl transition-all duration-150 active:scale-[0.98] select-none text-center`}
        >
          {/* Phase Badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-black/40 border border-white/20 text-xs font-semibold text-amber-200 mb-3">
            {currentConfig.badge}
          </div>

          {/* Arabic Text */}
          <h3 className={`arabic-calligraphy font-bold text-amber-100 leading-relaxed drop-shadow-md mb-2 ${phase === 'kalima' ? 'text-lg sm:text-xl' : 'text-3xl sm:text-4xl'}`}>
            {currentConfig.arabic}
          </h3>

          {/* Bengali Title */}
          <p className="text-lg font-bold text-amber-300 mb-1 font-literary">
            {currentConfig.titleBn}
          </p>
          <p className="text-xs text-slate-200/90 max-w-xs mx-auto mb-6 font-literary">
            {currentConfig.meaning}
          </p>

          {/* Big Interactive Counter Ring */}
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
            <div className="absolute inset-0 rounded-full border-4 border-white/10" />
            <div
              className="absolute inset-0 rounded-full border-4 border-amber-300 border-t-transparent transition-all duration-150 animate-spin"
              style={{ animationDuration: '4s' }}
            />
            <div className="w-28 h-28 rounded-full bg-[#03130d]/90 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shadow-inner">
              <span className="text-4xl font-bold font-mono text-white tracking-wider">
                {toBengaliDigits(currentCount)}
              </span>
              <span className="text-[10px] text-amber-300 font-semibold uppercase">
                লক্ষ্য: {toBengaliDigits(currentConfig.target)}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-emerald-200/90 mt-4 flex items-center justify-center gap-1 font-medium">
            <span>স্ক্রিনের যেকোনো স্থানে আঙুল দিয়ে ট্যাপ করুন</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          </p>
        </div>
      ) : (
        /* Completed 100 Celebration Screen */
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#062419] to-[#04160f] border-2 border-amber-400/80 p-6 shadow-2xl text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-4 text-amber-300 shadow-lg">
            <Award className="w-8 h-8 text-amber-400 animate-bounce" />
          </div>

          <h3 className="text-xl font-bold text-white mb-1 font-literary">আলহামদুলিল্লাহ!</h3>
          <p className="text-xs font-semibold text-amber-300 mb-4 font-literary">
            ১০০টি সুন্নাত জিকির সফলভাবে সম্পন্ন হয়েছে
          </p>

          {/* Hadith Proof Box */}
          <div className="p-4 rounded-2xl bg-black/50 border border-emerald-700/60 text-left text-xs leading-relaxed mb-5 shadow-inner">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px] mb-1.5">
              <Check className="w-3.5 h-3.5 text-amber-400" />
              <span>সহীহ মুসলিম, হাদিস নং ৫৯৭:</span>
            </div>
            <p className="text-slate-200 italic mb-2 font-literary">
              "যে ব্যক্তি প্রত্যেক ফরজ নামাজের পর ৩৩ বার সুবহানাল্লাহ, ৩৩ বার আলহামদুলিল্লাহ, ৩৩ বার আল্লাহু আকবার এবং ১০০তম বার পূর্ণ করার জন্য 'লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু...' পাঠ করবে—তার সমস্ত গুনাহ ক্ষমা করে দেওয়া হবে, যদিও তা সমুদ্রের ফেনার মতো বিপুল হয়।"
            </p>
            <span className="text-[10px] text-amber-300 font-semibold">
              — বর্ণনাকারী: হযরত আবু হুরায়রা (রা.)
            </span>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-emerald-950 font-bold text-sm shadow-xl active:scale-95 transition"
          >
            আবার শুরু করুন
          </button>
        </div>
      )}
    </div>
  );
};
