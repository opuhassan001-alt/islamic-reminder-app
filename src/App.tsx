import { useState, useEffect } from 'react';
import { PRAYERS_DATA } from './data/prayersData';
import { MORNING_ADHKAR, EVENING_ADHKAR } from './data/adhkarData';
import { GUNA_MAAF_ADHKAR } from './data/gunaMaafData';
import { MASNOON_DUAS } from './data/masnoonDuasData';
import { PrayerType, DuaItem } from './types';
import { Header } from './components/Header';
import { PrayerTabs } from './components/PrayerTabs';
import { DuaCard } from './components/DuaCard';
import { MorningEveningSection } from './components/MorningEveningSection';
import { GunaMaafSection } from './components/GunaMaafSection';
import { StandaloneTasbeeh } from './components/StandaloneTasbeeh';
import { SmartAutoTasbeeh } from './components/SmartAutoTasbeeh';
import { MasnoonDuasSection } from './components/MasnoonDuasSection';
import { TasbeehCounterModal } from './components/TasbeehCounterModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { NetworkInfoModal } from './components/NetworkInfoModal';
import { HadithGuideModal } from './components/HadithGuideModal';
import { Sparkles, HeartHandshake, RefreshCw, DownloadCloud } from 'lucide-react';
import { usePWAInstall } from './utils/pwa';

const STORAGE_KEY = 'deeni_amal_completed_ids_v1';
const STORAGE_DATE_KEY = 'deeni_amal_last_date_v1';

export function App() {
  const [activeTab, setActiveTab] = useState<'prayers' | 'masnoon' | 'smart_tasbeeh' | 'adhkar' | 'gunamaaf' | 'tasbeeh'>('prayers');
  const { hasUpdate, isCheckingUpdate, checkForUpdates, updateApp } = usePWAInstall();
  const [updateCheckedNotice, setUpdateCheckedNotice] = useState<string | null>(null);

  const handleCheckUpdate = async () => {
    const found = await checkForUpdates();
    if (!found) {
      setUpdateCheckedNotice('আপনার ফোনে সর্বশেষ সংস্করণ সক্রিয় রয়েছে (v1.2.0)');
      setTimeout(() => setUpdateCheckedNotice(null), 3500);
    }
  };
  
  // Suggest prayer based on current time
  const getInitialPrayer = (): PrayerType => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'fajr'; // Fajr & Morning
    if (hour >= 12 && hour < 16) return 'dhuhr';
    if (hour >= 16 && hour < 18) return 'asr';
    if (hour >= 18 && hour < 20) return 'maghrib';
    if (hour >= 20 || hour < 2) return 'isha';
    return 'tahajjud'; // 2 AM to 4 AM
  };

  const [selectedPrayer, setSelectedPrayer] = useState<PrayerType>(getInitialPrayer);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeTasbeehDua, setActiveTasbeehDua] = useState<DuaItem | null>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showConnectGuide, setShowConnectGuide] = useState(false);
  const [showHadithGuide, setShowHadithGuide] = useState(false);

  // Load and reset completed IDs daily
  useEffect(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const savedDate = localStorage.getItem(STORAGE_DATE_KEY);
    
    if (savedDate !== todayStr) {
      // New day: reset daily checklist
      setCompletedIds([]);
      localStorage.setItem(STORAGE_DATE_KEY, todayStr);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } else {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setCompletedIds(JSON.parse(saved));
        } catch {
          setCompletedIds([]);
        }
      }
    }
  }, []);

  const handleToggleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  // Calculate total duas in system
  const allPrayerDuasCount = PRAYERS_DATA.reduce((acc, p) => acc + p.duas.length, 0);
  const totalCount = allPrayerDuasCount + GUNA_MAAF_ADHKAR.length + MORNING_ADHKAR.length + EVENING_ADHKAR.length + MASNOON_DUAS.length;
  const completedCount = completedIds.length;

  const currentPrayerInfo = PRAYERS_DATA.find((p) => p.id === selectedPrayer) || PRAYERS_DATA[0];
  const prayerCompletedCount = currentPrayerInfo.duas.filter((d) => completedIds.includes(d.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-emerald-950">
      {/* Top Header */}
      <div>
        <Header
          completedCount={completedCount}
          totalCount={totalCount}
          onOpenInstallGuide={() => setShowInstallGuide(true)}
          onOpenConnectGuide={() => setShowConnectGuide(true)}
          onOpenHadithGuide={() => setShowHadithGuide(true)}
        />

        {/* Navigation Tabs */}
        <PrayerTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedPrayer={selectedPrayer}
          onSelectPrayer={setSelectedPrayer}
        />

        {/* Prayers Section */}
        {activeTab === 'prayers' && (
          <main className="max-w-md mx-auto px-4 pb-16">
            {/* Prayer Overview Card */}
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentPrayerInfo.color} border mb-4 shadow-md`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{currentPrayerInfo.bengaliName} নামাজ</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-600/40 text-emerald-300">
                      {prayerCompletedCount}/{currentPrayerInfo.duas.length} সম্পন্ন
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{currentPrayerInfo.description}</p>
                </div>
                <span className="arabic-text text-2xl font-bold text-amber-300">
                  {currentPrayerInfo.arabicName}
                </span>
              </div>
            </div>

            {/* List of Duas for the Selected Prayer */}
            <div className="space-y-4">
              {currentPrayerInfo.duas.map((dua) => (
                <DuaCard
                  key={dua.id}
                  dua={dua}
                  isCompleted={completedIds.includes(dua.id)}
                  onToggleComplete={handleToggleComplete}
                  onOpenTasbeeh={setActiveTasbeehDua}
                />
              ))}
            </div>

            {/* Prayer Completion Banner */}
            {prayerCompletedCount === currentPrayerInfo.duas.length && currentPrayerInfo.duas.length > 0 && (
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-800/80 to-amber-600/80 border border-amber-400/50 text-center shadow-lg animate-in fade-in">
                <Sparkles className="w-6 h-6 text-amber-300 mx-auto mb-1" />
                <h4 className="text-sm font-bold text-white">আলহামদুলিল্লাহ!</h4>
                <p className="text-xs text-amber-100 mt-0.5">
                  {currentPrayerInfo.bengaliName} নামাজের সবকটি দোয়া ও তাসবীহ আপনার সম্পন্ন হয়েছে। আল্লাহ আপনার আমল কবুল করুন।
                </p>
              </div>
            )}
          </main>
        )}

        {/* Dedicated Guna Maaf / Sins Forgiveness Section */}
        {activeTab === 'gunamaaf' && (
          <GunaMaafSection
            completedIds={completedIds}
            onToggleComplete={handleToggleComplete}
            onOpenTasbeeh={setActiveTasbeehDua}
          />
        )}

        {/* Morning & Evening Adhkar Section */}
        {activeTab === 'adhkar' && (
          <MorningEveningSection
            completedIds={completedIds}
            onToggleComplete={handleToggleComplete}
            onOpenTasbeeh={setActiveTasbeehDua}
          />
        )}

        {/* Smart 33-33-34 Auto-Flow Tasbeeh Section */}
        {activeTab === 'smart_tasbeeh' && <SmartAutoTasbeeh />}

        {/* Daily Masnoon Duas Library Section */}
        {activeTab === 'masnoon' && (
          <MasnoonDuasSection
            completedIds={completedIds}
            onToggleComplete={handleToggleComplete}
          />
        )}

        {/* Standalone Digital Tasbeeh Section */}
        {activeTab === 'tasbeeh' && <StandaloneTasbeeh />}
      </div>

      {/* Bottom Footer Info */}
      <footer className="max-w-md mx-auto w-full px-4 py-4 text-center border-t border-emerald-900/40 text-xs text-emerald-400/70">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-emerald-300 font-medium">
          <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
          <span>দ্বীনি আমল ও দোয়া রিমাইন্ডার</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-2.5">
          প্রামাণ্য সহীহ হাদীসের আলোকে সাজানো • শতভাগ অফলাইনে ব্যবহারযোগ্য
        </p>

        {/* Regular Update Controls & Version */}
        <div className="pt-2.5 border-t border-emerald-900/40 flex items-center justify-between text-[11px]">
          <span className="font-mono bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800/50 text-emerald-300">
            v1.2.0 • ইন্ডাস্ট্রিয়াল PWA
          </span>
          <button
            onClick={handleCheckUpdate}
            disabled={isCheckingUpdate}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-900/70 hover:bg-emerald-800 text-amber-300 border border-emerald-700/50 transition active:scale-95 text-[11px]"
            title="নতুন কোনো হাদিস বা ফিচার এসেছে কিনা চেক করুন"
          >
            <RefreshCw className={`w-3 h-3 ${isCheckingUpdate ? 'animate-spin text-amber-400' : ''}`} />
            <span>{isCheckingUpdate ? 'চেক করা হচ্ছে...' : 'আপডেট চেক'}</span>
          </button>
        </div>

        {updateCheckedNotice && (
          <p className="mt-2 text-[11px] text-emerald-300 animate-in fade-in font-medium">
            ✓ {updateCheckedNotice}
          </p>
        )}
      </footer>

      {/* Floating PWA Update Available Banner */}
      {hasUpdate && (
        <aside aria-label="অ্যাপ আপডেট বিজ্ঞপ্তি" className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3.5 rounded-2xl shadow-2xl border border-amber-300/40 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2">
            <DownloadCloud className="w-5 h-5 text-amber-200 flex-shrink-0" />
            <div className="text-xs text-left">
              <p className="font-bold">নতুন আপডেট এসেছে!</p>
              <p className="text-[11px] text-amber-100">নতুন হাদিস ও আমল পেতে রিফ্রেশ করুন</p>
            </div>
          </div>
          <button
            onClick={updateApp}
            className="px-3 py-1.5 rounded-xl bg-emerald-950 text-amber-300 font-bold text-xs shadow hover:bg-black transition active:scale-95"
          >
            আপডেট করুন
          </button>
        </aside>
      )}

      {/* Modals */}
      {activeTasbeehDua && (
        <TasbeehCounterModal
          dua={activeTasbeehDua}
          onClose={() => setActiveTasbeehDua(null)}
          onCompleteDua={(id) => {
            if (!completedIds.includes(id)) {
              handleToggleComplete(id);
            }
          }}
        />
      )}

      {showInstallGuide && (
        <InstallGuideModal onClose={() => setShowInstallGuide(false)} />
      )}

      {showConnectGuide && (
        <NetworkInfoModal onClose={() => setShowConnectGuide(false)} />
      )}

      {showHadithGuide && (
        <HadithGuideModal onClose={() => setShowHadithGuide(false)} />
      )}
    </div>
  );
}
