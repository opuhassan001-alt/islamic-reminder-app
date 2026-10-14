import React, { useState } from 'react';
import { ShieldCheck, X, CheckCircle2, ExternalLink } from 'lucide-react';

interface LegalModalProps {
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'safety';
}

export const LegalModal: React.FC<LegalModalProps> = ({ onClose, initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'safety'>(initialTab);

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="islamic-glass-card w-full max-w-lg rounded-3xl p-5 border border-amber-500/30 max-h-[90vh] flex flex-col shadow-2xl relative">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-emerald-800/60 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-[#03140e] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-literary">
                আইনি সুরক্ষা ও নীতিমালা
              </h2>
              <p className="text-[11px] text-emerald-300/80">
                Terms of Use, Privacy Policy & Security Protocol
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

        {/* Tab Switcher */}
        <div className="flex bg-[#051c13] p-1 rounded-2xl border border-emerald-800/60 my-3 flex-shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
              activeTab === 'privacy'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            গোপনীয়তা নীতি
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
              activeTab === 'terms'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            ব্যবহারের শর্তাবলি
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
              activeTab === 'safety'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            ডাটা সেফটি
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="overflow-y-auto space-y-3.5 pr-1 flex-1 text-xs text-slate-200 font-literary leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-700/50">
                <span className="font-bold text-amber-300 block mb-1">
                  🔒 ১০০% গোপনীয়তা রক্ষা (Zero Cloud Telemetry)
                </span>
                <p>
                  আমরা আপনার কোনো ব্যক্তিগত তথ্য (নাম, ইমেইল, মোবাইল নম্বর, আইপি অ্যাড্রেস) আমাদের বা কোনো তৃতীয় পক্ষের ক্লাউড সার্ভারে পাঠাই না বা সংগ্রহ করি না।
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs">১. কোনো জিপিএস (GPS) ট্র্যাকিং নেই</h4>
                <p className="text-slate-300">
                  অনেক ইসলামিক অ্যাপের বিরুদ্ধে গোপনে জিপিএস লোকেশন ডাটা বিক্রির অভিযোগ ওঠে। আমাদের অ্যাপে <strong>কোনো প্রকার জিপিএস অনুমতি প্রয়োজন হয় না</strong>। আপনি ম্যানুয়ালি ৬৪ জেলার তালিকা থেকে আপনার জেলা নির্বাচন করতে পারেন।
                </p>

                <h4 className="font-bold text-white text-xs">২. লোকাল ডিভাইস মেমরি (Local Storage)</h4>
                <p className="text-slate-300">
                  আপনার দৈনিক সম্পন্ন হওয়া আমল, তাসবীহ সংখ্যা ও নির্বাচিত জেলা সম্পূর্ণভাবে আপনার ফোনের <code>localStorage</code>-এ সংরক্ষিত থাকে। ব্রাউজার বা অ্যাপ ডাটা মুছলে এটিও সাথে সাথে মুছে যাবে।
                </p>

                <h4 className="font-bold text-white text-xs">৩. অ্যাপ স্টোর প্রিভেসি লেবেল (App Store Nutrition Label)</h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  <li><strong>Data Used to Track You:</strong> কোনো ট্র্যাকিং ডাটা নেই (None)</li>
                  <li><strong>Data Linked to You:</strong> আপনার সাথে কোনো ডাটা যুক্ত নয় (None)</li>
                  <li><strong>Third-Party Advertising:</strong> কোনো বাণিজ্যিক বিজ্ঞাপন নেই (None)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                <span className="font-bold text-amber-300 block mb-1">
                  ⚖️ ধর্মীয় ও আইনি দায়বদ্ধতার সীমাবদ্ধতা (Disclaimer)
                </span>
                <p>
                  এই অ্যাপে প্রদর্শিত হাদিস ও দোয়া সিহাহ সিত্তাহ এবং প্রামাণ্য কিতাব (হিসনুল মুসলিম) থেকে অত্যন্ত সতর্কতার সাথে সংকলিত। নামাজের সময়সূচি ইসলামিক ফাউন্ডেশন বাংলাদেশ ও সৌর অ্যালগরিদম ভিত্তিক।
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs">১. নামাজের সময়সূচি সংক্রান্ত সতর্কতা</h4>
                <p className="text-slate-300">
                  ভৌগোলিক দিগন্ত বা স্থানীয় মসজিদের সমন্বয়ের কারণে ১-২ মিনিটের পার্থক্য হতে পারে। বিশেষ করে রমজান মাসে ইফতার ও সাহরির ক্ষেত্রে স্থানীয় মসজিদের আজানকে প্রাধান্য দেওয়ার পরামর্শ দেওয়া হচ্ছে।
                </p>

                <h4 className="font-bold text-white text-xs">২. অ-বাণিজ্যিক মেধা স্বত্ব ও কপিরাইট</h4>
                <p className="text-slate-300">
                  কুরআন ও হাদিসের বাণীসমূহ মানবজাতির জন্য উন্মুক্ত। তবে অ্যাপটির ডিজাইন, ইউআই আর্কিটেকচার, ক্যালিগ্রাফি স্টাইলিং ও সোর্স কোড ডেভেলপার এবং সংশ্লিষ্ট সত্তার বুদ্ধিবৃত্তিক সম্পদ। কোনো বাণিজ্যিক নকল বা ধর্মীয় টেক্সট বিকৃতি সম্পূর্ণ নিষিদ্ধ।
                </p>

                <h4 className="font-bold text-white text-xs">৩. সেবার প্রকৃতি (AS-IS Warranty)</h4>
                <p className="text-slate-300">
                  অ্যাপটি বিনামূল্যে জনকল্যাণে ও ব্যক্তিগত আমলের উদ্দেশ্যে সরবরাহ করা হয়েছে। অ্যাপ ব্যবহারের ফলে ডিভাইসের কোনো কারিগরি ত্রুটির ক্ষেত্রে ডেভেলপার কোনো দায় বহন করবে না।
                </p>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-3 rounded-2xl bg-[#061f15] border border-emerald-700/50">
                <span className="font-bold text-emerald-300 block mb-1">
                  🛡️ টেকনিক্যাল সেফটি প্রোটোকল (Technical Security)
                </span>
                <p>
                  অ্যাপের কোডবেস কঠোরতম সিকিউরিটি প্রোটোকল ও অফলাইন স্যান্ডবক্সিং মেনে চলে।
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Content Security Policy (CSP):</strong>
                    <p className="text-slate-300">কোনো বহিরাগত ক্ষতিকর স্ক্রিপ্ট বা থার্ড-পার্টি ইনজেকশন কার্যকর হওয়া সম্পূর্ণ প্রতিরোধ করা হয়েছে।</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Offline Service Worker Precaching:</strong>
                    <p className="text-slate-300">ইন্টারনেট সংযোগ না থাকলেও সমস্ত দোয়া, হাদিস ও নামাজের সময় শতভাগ স্যান্ডবক্সে কার্যকর থাকে।</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Zero Third-Party SDKs:</strong>
                    <p className="text-slate-300">অ্যাপটিতে কোনো ট্র্যাকিং লাইব্রেরি (যেমন Google Analytics, AppsFlyer, Facebook SDK) অন্তর্ভুক্ত নেই।</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Links */}
        <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between text-[11px] text-emerald-300/80 flex-shrink-0">
          <a 
            href="./privacy-policy.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-amber-300 transition"
          >
            <span>ওয়েব প্রিভেসি পেজ</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a 
            href="./terms-of-service.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-amber-300 transition"
          >
            <span>ওয়েব শর্তাবলি পেজ</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
