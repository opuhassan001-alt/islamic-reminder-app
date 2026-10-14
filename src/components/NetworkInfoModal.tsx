import { X, Wifi, Monitor, Smartphone, ShieldCheck } from 'lucide-react';

interface NetworkInfoModalProps {
  onClose: () => void;
}

export const NetworkInfoModal: React.FC<NetworkInfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-700/60 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">পিসি থেকে ফোনে অ্যাপটি চালু করবেন কীভাবে?</h2>
            <p className="text-xs text-emerald-300">একই ওয়াই-ফাই (Wi-Fi) নেটওয়ার্কের মাধ্যমে কানেক্ট করার নিয়ম</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-slate-200 leading-relaxed">
          {/* Step 1 */}
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-xs flex-shrink-0">
              ১
            </span>
            <div>
              <p className="font-bold text-white mb-0.5 flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-amber-400" />
                <span>একই ওয়াই-ফাই (Wi-Fi) নেটওয়ার্কে যুক্ত হোন</span>
              </p>
              <p className="text-slate-300">
                আপনার কম্পিউটার এবং আপনার মোবাইল ফোনটি একই ওয়াই-ফাই (অথবা মোবাইলের হটস্পট)-এ কানেক্ট করা থাকতে হবে।
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-xs flex-shrink-0">
              ২
            </span>
            <div>
              <p className="font-bold text-white mb-0.5 flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span>কম্পিউটারের টার্মিনালে Network লিংকটি দেখুন</span>
              </p>
              <p className="text-slate-300">
                টার্মিনালে সার্ভার চালু করার পর একটি <strong>Network: http://192.168.x.x:5173</strong> লিংক দেখাবে।
              </p>
              <div className="mt-2 p-2 rounded-lg bg-black/60 border border-slate-700 font-mono text-[11px] text-emerald-400">
                ➜ Network: http://192.168.x.x:5173
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-xs flex-shrink-0">
              ৩
            </span>
            <div>
              <p className="font-bold text-white mb-0.5 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>ফোনের ব্রাউজারে লিংকটি লিখুন</span>
              </p>
              <p className="text-slate-300">
                আপনার মোবাইল ফোনের <strong>Brave</strong>, Chrome বা Safari ব্রাউজার খুলে অ্যাড্রেস বারে ওই লিংকটি লিখে এন্টার চাপুন। সাথে সাথেই অ্যাপটি আপনার ফোনে ওপেন হয়ে যাবে!
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              ৪
            </span>
            <div>
              <p className="font-bold text-emerald-300 mb-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ফোনে চিরস্থায়ীভাবে ইনস্টল করুন</span>
              </p>
              <p className="text-slate-300">
                ফোনে চালু হওয়ার পর ব্রাউজার মেনু থেকে <strong>"Install app"</strong> অথবা <strong>"Add to Home Screen"</strong> চাপুন। অ্যাপটি সরাসরি আপনার ফোনে অ্যাপ হিসেবে বসে যাবে।
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
          >
            ঠিক আছে, বুঝতে পেরেছি
          </button>
        </div>
      </div>
    </div>
  );
};
