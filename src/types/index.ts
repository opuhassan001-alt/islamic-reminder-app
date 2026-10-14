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
}
