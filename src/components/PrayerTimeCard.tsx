import React, { useState, useEffect } from 'react';
import { 
  BANGLADESH_DISTRICTS, 
  getDailyPrayerSchedule, 
  toBengaliDigits 
} from '../utils/prayerTimes';
import { DailyPrayerSchedule } from '../types';
import { 
  MapPin, 
  Clock, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Calendar,
  Moon,
  Sunrise
} from 'lucide-react';

interface PrayerTimeCardProps {
  onSelectPrayerTab?: (prayerId: string) => void;
}

export const PrayerTimeCard: React.FC<PrayerTimeCardProps> = () => {
  const [districtId, setDistrictId] = useState<string>(() => {
    return localStorage.getItem('deeni_district_id') || 'dhaka';
  });
  const [schedule, setSchedule] = useState<DailyPrayerSchedule>(() => 
    getDailyPrayerSchedule(districtId)
  );
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [searchDistrict, setSearchDistrict] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Update schedule every minute
  useEffect(() => {
    const update = () => {
      setSchedule(getDailyPrayerSchedule(districtId));
    };
    update();
    const interval = setInterval(update, 30000); // every 30s
    return () => clearInterval(interval);
  }, [districtId]);

  const handleSelectDistrict = (id: string) => {
    setDistrictId(id);
    localStorage.setItem('deeni_district_id', id);
    setSchedule(getDailyPrayerSchedule(id));
    setShowDistrictModal(false);
    setSearchDistrict('');
  };

  const filteredDistricts = BANGLADESH_DISTRICTS.filter((d) =>
    d.nameBn.includes(searchDistrict.trim()) ||
    d.nameEn.toLowerCase().includes(searchDistrict.trim().toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto px-4 mb-4">
      <div className="islamic-glass-card rounded-2xl p-4 relative overflow-hidden transition-all duration-300">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header: Location, Hijri Date & Toggle */}
        <div className="flex items-center justify-between mb-3 border-b border-emerald-900/60 pb-2.5">
          {/* District Picker Button */}
          <button
            onClick={() => setShowDistrictModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/70 border border-emerald-700/40 text-amber-300 text-xs font-semibold transition active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{schedule.district.nameBn} জেলা</span>
            <ChevronDown className="w-3 h-3 text-emerald-400 opacity-80" />
          </button>

          {/* Hijri Date Display */}
          <div className="flex items-center gap-1 text-[11px] text-emerald-200/90 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{schedule.hijriDateBn}</span>
          </div>
        </div>

        {/* Hero Active Waqt & Next Waqt Countdown */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {schedule.currentWaqtNameBn}
              </span>
            </div>
            <div className="mt-1.5">
              <p className="text-[11px] text-slate-300">
                পরবর্তী ওয়াক্ত: <span className="font-bold text-amber-300">{schedule.nextWaqtNameBn}</span>
              </p>
              <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>বাকি আর {schedule.nextWaqtCountdown}</span>
              </p>
            </div>
          </div>

          {/* Qibla Direction Badge */}
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/70 border border-emerald-800/60 text-center">
            <Compass className="w-5 h-5 text-amber-400 animate-spin-slow mb-0.5" />
            <span className="text-[10px] text-emerald-300 font-medium">কিবলা</span>
            <span className="text-[11px] font-bold text-white">২৬৭° পশ্চিম</span>
          </div>
        </div>

        {/* Daily Prayer Times Grid */}
        <div className="grid grid-cols-5 gap-1.5 text-center pt-2 border-t border-emerald-900/60">
          <div className={`p-1.5 rounded-xl border ${schedule.currentWaqt === 'fajr' ? 'bg-amber-500/20 border-amber-400/50 text-white' : 'bg-emerald-950/40 border-emerald-900/40 text-slate-300'}`}>
            <span className="text-[11px] block font-medium">ফজর</span>
            <span className="text-xs font-bold text-amber-300">{schedule.times.fajr}</span>
          </div>

          <div className={`p-1.5 rounded-xl border ${schedule.currentWaqt === 'dhuhr' ? 'bg-amber-500/20 border-amber-400/50 text-white' : 'bg-emerald-950/40 border-emerald-900/40 text-slate-300'}`}>
            <span className="text-[11px] block font-medium">যোহর</span>
            <span className="text-xs font-bold text-amber-300">{schedule.times.dhuhr}</span>
          </div>

          <div className={`p-1.5 rounded-xl border ${schedule.currentWaqt === 'asr' ? 'bg-amber-500/20 border-amber-400/50 text-white' : 'bg-emerald-950/40 border-emerald-900/40 text-slate-300'}`}>
            <span className="text-[11px] block font-medium">আসর</span>
            <span className="text-xs font-bold text-amber-300">{schedule.times.asr}</span>
          </div>

          <div className={`p-1.5 rounded-xl border ${schedule.currentWaqt === 'maghrib' ? 'bg-amber-500/20 border-amber-400/50 text-white' : 'bg-emerald-950/40 border-emerald-900/40 text-slate-300'}`}>
            <span className="text-[11px] block font-medium">মাগরিব</span>
            <span className="text-xs font-bold text-amber-300">{schedule.times.maghrib}</span>
          </div>

          <div className={`p-1.5 rounded-xl border ${schedule.currentWaqt === 'isha' ? 'bg-amber-500/20 border-amber-400/50 text-white' : 'bg-emerald-950/40 border-emerald-900/40 text-slate-300'}`}>
            <span className="text-[11px] block font-medium">এশা</span>
            <span className="text-xs font-bold text-amber-300">{schedule.times.isha}</span>
          </div>
        </div>

        {/* Expandable Extra Timings (Sunrise & Tahajjud End) */}
        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-emerald-900/50 grid grid-cols-2 gap-2 text-xs animate-in fade-in">
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/60 border border-emerald-900/40">
              <span className="text-slate-300 flex items-center gap-1.5 text-[11px]">
                <Sunrise className="w-3.5 h-3.5 text-amber-400" />
                সূর্যোদয় (ইশরাক শুরু):
              </span>
              <span className="font-bold text-amber-200">{schedule.times.sunrise}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/60 border border-emerald-900/40">
              <span className="text-slate-300 flex items-center gap-1.5 text-[11px]">
                <Moon className="w-3.5 h-3.5 text-emerald-400" />
                সেহরি শেষ (তাহাজ্জুদ):
              </span>
              <span className="font-bold text-amber-200">{schedule.times.tahajjudEnd}</span>
            </div>
          </div>
        )}

        {/* Expand Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-2 pt-1 flex items-center justify-center gap-1 text-[11px] text-emerald-400/80 hover:text-emerald-300 transition"
        >
          <span>{isExpanded ? 'সংক্ষিপ্ত করুন' : 'সূর্যোদয় ও তাহাজ্জুদ সময় দেখুন'}</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* District Selection Modal */}
      {showDistrictModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="islamic-glass-card w-full max-w-sm rounded-2xl p-5 border border-amber-500/30 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">বাংলাদেশ জেলা নির্বাচন</h3>
              </div>
              <button
                onClick={() => setShowDistrictModal(false)}
                className="text-xs px-2 py-1 rounded-lg bg-emerald-900/60 text-slate-300 hover:text-white"
              >
                বন্ধ
              </button>
            </div>

            {/* Search Input */}
            <div className="relative my-3">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="জেলার নাম লিখুন (যেমন: চট্টগ্রাম, সিলেট)..."
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className="w-full bg-emerald-950/80 border border-emerald-700/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* District List Scrollable */}
            <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
              {filteredDistricts.map((district) => {
                const isSelected = district.id === districtId;
                return (
                  <button
                    key={district.id}
                    onClick={() => handleSelectDistrict(district.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition ${
                      isSelected
                        ? 'bg-amber-500/20 border border-amber-400/60 text-amber-300 font-bold'
                        : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="text-left">
                      <span className="font-semibold">{district.nameBn}</span>
                      <span className="text-[10px] text-slate-400 ml-2">({district.division} বিভাগ)</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {district.offsetMinutes === 0 
                        ? 'মানক' 
                        : `${district.offsetMinutes > 0 ? '+' : ''}${toBengaliDigits(district.offsetMinutes)} মি.`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
