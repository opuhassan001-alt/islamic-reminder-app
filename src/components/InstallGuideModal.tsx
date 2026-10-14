import React, { useState } from 'react';
import { X, Smartphone, CheckCircle, Apple, Chrome, Download, Shield, Copy, Check } from 'lucide-react';
import { usePWAInstall } from '../utils/pwa';

interface InstallGuideModalProps {
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({ onClose }) => {
  const [platform, setPlatform] = useState<'brave' | 'android' | 'ios'>('brave');
  const [copied, setCopied] = useState(false);
  const { isInstallable, isStandalone, promptInstall } = usePWAInstall();

  const appUrl = 'http://192.168.0.104:5173/';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-700/60 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">ফোনে কীভাবে ইনস্টল করবেন?</h2>
            <p className="text-xs text-emerald-300">প্লে-স্টোর ছাড়াই সরাসরি ব্রাউজার থেকে অ্যাপ হিসেবে ইনস্টল করার নিয়ম</p>
          </div>
        </div>

        {/* Local Network URL Card with Quick Copy */}
        <div className="mb-4 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-between">
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">অ্যাপের লোকাল লিংক</span>
            <p className="text-xs font-mono text-amber-300 truncate select-all">{appUrl}</p>
          </div>
          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-medium transition active:scale-95 ml-2 flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-300">কপি হয়েছে</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">লিংক কপি</span>
              </>
            )}
          </button>
        </div>

        {/* Standalone status check */}
        {isStandalone ? (
          <div className="mb-4 p-3 rounded-xl bg-emerald-900/60 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>অ্যাপটি ইতোমধ্যেই আপনার ফোনে নেটিভ অ্যাপ হিসেবে ইনস্টল করা রয়েছে!</span>
          </div>
        ) : isInstallable ? (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-center">
            <p className="text-xs text-amber-200 mb-2 font-medium">
              আপনার ব্রাউজার সরাসরি ইনস্টল বাটন সমর্থন করছে:
            </p>
            <button
              onClick={() => promptInstall()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-bold text-xs shadow-lg active:scale-95 transition"
            >
              <Download className="w-4 h-4" />
              <span>এক ক্লিকে ইনস্টল করুন</span>
            </button>
          </div>
        ) : null}

        {/* Platform Switcher */}
        <div className="flex bg-slate-800/80 p-1 rounded-xl mb-4 border border-slate-700 gap-1">
          <button
            onClick={() => setPlatform('brave')}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-bold transition ${
              platform === 'brave' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-200" />
            <span>🦁 Brave ব্রাউজার</span>
          </button>
          <button
            onClick={() => setPlatform('android')}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-bold transition ${
              platform === 'android' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Chrome className="w-3.5 h-3.5" />
            <span>Chrome / অন্যান্য</span>
          </button>
          <button
            onClick={() => setPlatform('ios')}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-bold transition ${
              platform === 'ios' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>আইফোন</span>
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        {platform === 'brave' ? (
          <div className="space-y-3 text-xs text-slate-200 leading-relaxed">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px]">
              💡 <strong>ব্রেভ ব্যবহারকারীদের জন্য বিশেষ টিপ:</strong> Brave ব্রাউজার দিয়ে গুগল প্লে-স্টোর ছাড়াই যেকোনো ওয়েব অ্যাপকে সরাসরি সাধারণ অ্যান্ড্রয়েড অ্যাপে রূপান্তর করা যায়।
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">১</span>
              <div>
                <p className="font-bold text-amber-300 mb-0.5">Brave ব্রাউজারে লিংক খুলুন</p>
                <p className="text-slate-300">ফোনের Brave ব্রাউজারে গিয়ে অ্যাড্রেস বারে <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-200">192.168.0.104:5173</code> লিখুন এবং পেজটি লোড করুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">২</span>
              <div>
                <p className="font-bold text-amber-300 mb-0.5">Brave Shields (সিংহ আইকন 🦁) চেক করুন</p>
                <p className="text-slate-300">যদি পেজ লোড বা ইনস্টল অপশনে বাধা দেয়, তবে অ্যাড্রেস বারের ডানপাশে থাকা কমলা সিংহ (Lion) আইকনে চাপ দিয়ে <strong className="text-amber-200">Shields</strong> সাময়িকভাবে বন্ধ (Off) করুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">৩</span>
              <div>
                <p className="font-bold text-amber-300 mb-0.5">নিচের ৩টি ডট (⋮) মেনু বাটনে চাপ দিন</p>
                <p className="text-slate-300">Brave ব্রাউজারের স্ক্রিনের <strong>একদম নিচে ডান কোণায়</strong> ৩টি ডট <strong className="text-amber-300">⋮</strong> বাটন পাবেন। সেখানে ট্যাপ করুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">৪</span>
              <div>
                <p className="font-bold text-amber-300 mb-0.5">"Install app" বা "Add to Home screen" চাপুন</p>
                <p className="text-slate-300">মেনুটি ওপেন হলে তালিকায় থাকা <strong className="text-white bg-emerald-900 px-1 py-0.5 rounded">Install app</strong> (অথবা <strong className="text-white bg-emerald-900 px-1 py-0.5 rounded">Add to Home screen</strong>) অপশনে ট্যাপ করুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">৫</span>
              <div>
                <p className="font-bold text-amber-300 mb-0.5">কনফার্মেশন বক্সে "Install" বা "Add" ক্লিক করুন</p>
                <p className="text-slate-300">স্ক্রিনে ছোট একটি পপআপ আসবে যেখানে অ্যাপের নাম "দ্বীনি আমল" দেখাবে। সেখানে <strong>"Install"</strong> বা <strong>"Add"</strong> বাটনে চাপ দিন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs flex-shrink-0">✓</span>
              <div>
                <p className="font-bold text-emerald-300 mb-0.5">আলহামদুলিল্লাহ! আপনার ফোনে অ্যাপ রেডি</p>
                <p className="text-slate-300">এখন ব্রাউজার বন্ধ করুন। আপনার ফোনের হোমস্ক্রিনে <strong>দ্বীনি আমল</strong> নামের একটি নতুন অ্যাপ আইকন যুক্ত হয়ে গেছে। এতে ট্যাপ করলে এটি ব্রাউজার ছাড়া ফুলস্ক্রিন নেটিভ মোবাইল অ্যাপ হিসেবে চলবে এবং ইন্টারনেট ছাড়াও ব্যবহার করা যাবে!</p>
              </div>
            </div>

            {/* Troubleshooting Box for Insecure Origin */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-200">
              <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300 mb-1">
                <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>"This app cannot be installed / Create shortcut" লেখা আসছে?</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                লোকাল আইপি (<code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">http://</code>) হওয়ার কারণে ব্রাউজার সতর্ক করতে পারে। সত্যিকারের অ্যাপ হিসেবে ইনস্টল করার ১ মিনিটের উপায়:
              </p>
              <div className="space-y-1.5 text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <p>১. Brave-এর সার্চবারে লিখুন: <code className="text-amber-300 font-mono font-bold select-all">brave://flags</code></p>
                <p>২. Search বক্সে লিখুন: <code className="text-amber-300 font-mono font-bold">insecure</code></p>
                <p>৩. <strong>Insecure origins treated as secure</strong> অপশনটি <strong>Enabled</strong> করুন।</p>
                <p>৪. ঠিক নিচের বক্সে লিখুন: <code className="text-emerald-400 font-mono font-bold select-all">http://192.168.0.104:5173</code></p>
                <p>৫. নিচে <strong>Relaunch</strong> বাটনে চাপ দিন। এরপর আবার লিংকে এলে সরাসরি কোনো এরর ছাড়াই "Install app" হয়ে যাবে!</p>
              </div>
            </div>
          </div>
        ) : platform === 'android' ? (
          <div className="space-y-3 text-xs text-slate-200 leading-relaxed">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">১</span>
              <div>
                <p className="font-bold text-emerald-300 mb-0.5">ব্রাউজারে ওপেন করুন</p>
                <p className="text-slate-300">আপনার অ্যান্ড্রয়েড ফোনের Chrome বা যেকোনো ব্রাউজারে লিংকটি খুলুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">২</span>
              <div>
                <p className="font-bold text-emerald-300 mb-0.5">মেনু বোতামে চাপ দিন</p>
                <p className="text-slate-300">ব্রাউজারের উপরে ডান কোণায় থাকা <strong>৩টি ডট (⋮)</strong> মেনু বাটনে ট্যাপ করুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">৩</span>
              <div>
                <p className="font-bold text-emerald-300 mb-0.5">"Install app" বা "Add to Home screen" নির্বাচন করুন</p>
                <p className="text-slate-300">মেনু থেকে <strong>"Install app"</strong> (অ্যাপ ইনস্টল করুন) অথবা <strong>"Add to Home screen"</strong> (হোম স্ক্রিনে যোগ করুন) অপশনে চাপ দিন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-xs flex-shrink-0">✓</span>
              <div>
                <p className="font-bold text-amber-300 mb-0.5">ইনস্টল সম্পন্ন!</p>
                <p className="text-slate-300">এখন আপনার ফোনের হোম স্ক্রিনে <strong>দ্বীনি আমল</strong> নামের অ্যাপ আইকন চলে আসবে। এটি ট্যাপ করলেই যেকোনো সাধারণ অ্যাপের মতো ফুলস্ক্রিনে চালু হবে এবং ইন্টারনেট ছাড়াও চলবে।</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs text-slate-200 leading-relaxed">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">১</span>
              <div>
                <p className="font-bold text-emerald-300 mb-0.5">সাফারি (Safari) ব্রাউজারে খুলুন</p>
                <p className="text-slate-300">আপনার আইফোনের ডিফল্ট <strong>Safari</strong> ব্রাউজারে অ্যাপটির লিংক খুলুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">২</span>
              <div>
                <p className="font-bold text-emerald-300 mb-0.5">শেয়ার বোতামে (Share) ট্যাপ করুন</p>
                <p className="text-slate-300">সাফারি ব্রাউজারের নিচে থাকা <strong>শেয়ার বোতামে (একটি তীরচিহ্ন সহ বক্স ⎋)</strong> চাপুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">৩</span>
              <div>
                <p className="font-bold text-emerald-300 mb-0.5">"Add to Home Screen" বেছে নিন</p>
                <p className="text-slate-300">মেনুর নিচের দিকে স্ক্রল করে <strong>"Add to Home Screen"</strong> (হোম স্ক্রিনে যোগ করুন) অপশনটিতে ট্যাপ করুন।</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-xs flex-shrink-0">✓</span>
              <div>
                <p className="font-bold text-amber-300 mb-0.5">"Add" এ ক্লিক করুন</p>
                <p className="text-slate-300">উপরে ডান পাশে <strong>Add</strong> বাটনে ক্লিক করলেই আপনার আইফোনের হোমস্ক্রিনে অ্যাপটি চলে আসবে।</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Button */}
        <div className="mt-5 pt-3 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
          >
            বুঝেছি, ধন্যবাদ
          </button>
        </div>
      </div>
    </div>
  );
};
