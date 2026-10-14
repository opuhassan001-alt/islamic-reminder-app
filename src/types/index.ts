export type PrayerType = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud';

export interface DuaItem {
  id: string;
  title: string;
  subtitle?: string;
  arabic: string;
  pronunciation: string;
  meaning: string;
  count: number; // e.g. 1, 3, 7, 10, 33, 100
  reference: string;
  narrator?: string; // সাহাবীর নাম (বর্ণনাকারী)
  hadithGrade?: 'সহীহ (বুখারী/মুসলিম)' | 'সহীহ (আবু দাউদ/তিরমিযী)' | 'সহীহ';
  hadithContext?: string; // রাসূলুল্লাহ (ﷺ) এর পূর্ণ নির্দেশনা বা পটভূমি
  virtue?: string; // ফজিলত
  audioUrl?: string;
}

export interface PrayerInfo {
  id: PrayerType;
  name: string;
  bengaliName: string;
  arabicName: string;
  description: string;
  color: string;
  duas: DuaItem[];
}

export interface AdhkarItem {
  id: string;
  category: 'morning' | 'evening';
  title: string;
  arabic: string;
  pronunciation: string;
  meaning: string;
  count: number;
  reference: string;
  narrator?: string;
  hadithGrade?: 'সহীহ (বুখারী/মুসলিম)' | 'সহীহ (আবু দাউদ/তিরমিযী)' | 'সহীহ';
  hadithContext?: string;
  virtue: string;
}

export interface UserProgress {
  completedDuaIds: string[];
  lastCompletedDate: string; // YYYY-MM-DD
  tasbeehCounts: Record<string, number>;
  totalTasbeehCount: number;
}

export type MasnoonCategory = 'sleep' | 'food' | 'protection' | 'distress' | 'home_masjid' | 'travel_nature' | 'forgiveness';

export interface MasnoonDuaItem {
  id: string;
  category: MasnoonCategory;
  categoryNameBn: string;
  title: string;
  situation: string; // কোন পরিস্থিতিতে পড়তে হয়
  arabic: string;
  pronunciation: string;
  meaning: string;
  reference: string;
  hadithGrade: string;
  narrator?: string;
  virtue: string;
  count?: number;
}

export interface DistrictInfo {
  id: string;
  nameBn: string;
  nameEn: string;
  division: string;
  offsetMinutes: number; // Offset in minutes from Dhaka
}

export interface DailyPrayerSchedule {
  district: DistrictInfo;
  dateStrBn: string;
  hijriDateBn: string;
  times: {
    tahajjudEnd: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  currentWaqt: PrayerType | 'sunrise_pause' | 'none';
  currentWaqtNameBn: string;
  nextWaqt: PrayerType;
  nextWaqtNameBn: string;
  nextWaqtCountdown: string; // e.g. "০২ ঘন্টা ১৫ মিনিট"
}

export type MoodType = 'sadness' | 'anxiety' | 'anger' | 'fear' | 'guilt' | 'gratitude';

export interface MoodPrescription {
  id: MoodType;
  titleBn: string;
  subtitleBn: string;
  icon: string;
  color: string;
  quranVerse: {
    arabic: string;
    meaning: string;
    surah: string;
  };
  propheticDua: {
    title: string;
    arabic: string;
    pronunciation: string;
    meaning: string;
    reference: string;
    actionAdvice: string;
  };
  recommendedTasbeeh?: {
    phrase: string;
    count: number;
    virtue: string;
  };
}

