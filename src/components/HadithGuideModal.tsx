import React from 'react';
import { X, BookOpen, ShieldCheck, CheckCircle2, Award, Heart } from 'lucide-react';

interface HadithGuideModalProps {
  onClose: () => void;
}

export const HadithGuideModal: React.FC<HadithGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-600/60 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-white shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>সহীহ হাদিসের আলোকে নামাজের পরের আমল</span>
            </h2>
            <p className="text-xs text-amber-300">হিসনুল মুসলিম ও সিহাহ সিত্তার নির্ভরযোগ্য দলিল</p>
          </div>
        </div>

        {/* Introductory Message */}
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/60 text-xs text-emerald-200 leading-relaxed mb-4">
          রাসূলুল্লাহ (ﷺ) প্রত্যেক ফরজ নামাজের পর কিছু বরকতময় যিকির ও দোয়া নিয়মিত পাঠ করতেন এবং সাহাবীদের তা শিক্ষা দিয়েছেন। এই অ্যাপের প্রতিটি দোয়া নির্ভরযোগ্য ও প্রামাণ্য হাদীস গ্রন্থ (বুখারী, মুসলিম, আবু দাউদ, তিরমিযী, নাসাঈ, ইবনে মাজাহ) থেকে সংকলিত।
        </div>

        {/* Core Hadith Rules & Sequence */}
        <div className="space-y-3.5 text-xs text-slate-200">
          {/* Rule 1 */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>১. সালামের সাথে সাথে ইস্তিগফার</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900 text-emerald-300 border border-emerald-700/50">
                সহীহ মুসলিম: ৫৯১
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              সাওবান (রা:) বর্ণনা করেন: রাসূলুল্লাহ (ﷺ) সালাম ফিরিয়েই ৩ বার <em>"আস্তাগফিরুল্লাহ"</em> বলতেন এবং <em>"আল্লাহুম্মা আনতাস সালামু ওয়া মিনকাস সালাম..."</em> পড়তেন।
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>২. নবীজীর ভালোবাসার অসিয়ত (মুআয রা:)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-900/60 text-amber-300 border border-amber-600/50">
                আবু দাউদ: ১৫২২
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              রাসূলুল্লাহ (ﷺ) মুআয (রা:) এর হাত ধরে বললেন: <em>"হে মুআয! আল্লাহর শপথ, আমি নিশ্চয়ই তোমাকে ভালোবাসি। কোনো নামাজের পর 'আল্লাহুম্মা আ'ইন্নী আলা যিকরিকা ওয়া শুকরিকা ওয়া হুসনি ইবাদাতিক' পড়তে ভুলবে না।"</em>
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>৩. জান্নাতের নিশ্চয়তা (আয়াতুল কুরসী)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900 text-emerald-300 border border-emerald-700/50">
                নাসাঈ: ৯৮৪৮ (সহীহ)
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              আবু উমামা (রা:) থেকে বর্ণিত: রাসূল (ﷺ) বলেছেন—যে ব্যক্তি প্রতি ফরজ নামাজের পর আয়াতুল কুরসী পড়বে, মৃত্যু ছাড়া জান্নাতে প্রবেশে তার আর কোনো বাধা থাকবে না।
            </p>
          </div>

          {/* Rule 4 */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>৪. সাগরের ফেনা পরিমাণ গুনাহ মাফের তাসবীহ</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900 text-emerald-300 border border-emerald-700/50">
                সহীহ মুসলিম: ৫৯৭
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              আবু হুরায়রা (রা:) থেকে বর্ণিত: ৩৩ বার সুবহানাল্লাহ, ৩৩ বার আলহামদুলিল্লাহ, ৩৩ বার আল্লাহু আকবার এবং ১০০ পূর্ণ করতে ১ বার তাওহীদের কালেমা পাঠ করলে সমস্ত গুনাহ মাফ হয়।
            </p>
          </div>

          {/* Rule 5 */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>৫. ফজর ও মাগরিবের বিশেষ পার্থক্য</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-900/60 text-amber-300 border border-amber-600/50">
                তিরমিযী ও আবু দাউদ
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              ফজর ও মাগরিবের পর সূরা ইখলাস, ফালাক ও নাস ৩ বার করে পাঠ করা এবং কথা বলার পূর্বে ১০ বার বিশেষ তাওহীদের কালিমা ও ৭ বার জাহান্নাম থেকে মুক্তির দোয়া পাঠ করার স্বতন্ত্র সুন্নাত রয়েছে।
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
          >
            আলহামদুলিল্লাহ, বুঝতে পেরেছি
          </button>
        </div>
      </div>
    </div>
  );
};

