import { DistrictInfo, DailyPrayerSchedule, PrayerType } from '../types';

export const BANGLADESH_DISTRICTS: DistrictInfo[] = [
  { id: 'dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka', division: 'ঢাকা', offsetMinutes: 0 },
  { id: 'chittagong', nameBn: 'চট্টগ্রাম', nameEn: 'Chittagong', division: 'চট্টগ্রাম', offsetMinutes: -5 },
  { id: 'sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet', division: 'সিলেট', offsetMinutes: -6 },
  { id: 'rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi', division: 'রাজশাহী', offsetMinutes: 7 },
  { id: 'khulna', nameBn: 'খুলনা', nameEn: 'Khulna', division: 'খুলনা', offsetMinutes: 5 },
  { id: 'barisal', nameBn: 'বরিশাল', nameEn: 'Barisal', division: 'বরিশাল', offsetMinutes: 1 },
  { id: 'rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur', division: 'রংপুর', offsetMinutes: 4 },
  { id: 'mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', division: 'ময়মনসিংহ', offsetMinutes: 0 },
  { id: 'comilla', nameBn: 'কুমিল্লা', nameEn: 'Comilla', division: 'চট্টগ্রাম', offsetMinutes: -3 },
  { id: 'coxsbazar', nameBn: 'কক্সবাজার', nameEn: "Cox's Bazar", division: 'চট্টগ্রাম', offsetMinutes: -7 },
  { id: 'bogra', nameBn: 'বগুড়া', nameEn: 'Bogra', division: 'রাজশাহী', offsetMinutes: 3 },
  { id: 'jessore', nameBn: 'যশোর', nameEn: 'Jessore', division: 'খুলনা', offsetMinutes: 6 },
  { id: 'dinajpur', nameBn: 'দিনাজপুর', nameEn: 'Dinajpur', division: 'রংপুর', offsetMinutes: 6 },
  { id: 'kushtia', nameBn: 'কুষ্টিয়া', nameEn: 'Kushtia', division: 'খুলনা', offsetMinutes: 6 },
  { id: 'pabna', nameBn: 'পাবনা', nameEn: 'Pabna', division: 'রাজশাহী', offsetMinutes: 4 },
  { id: 'tangail', nameBn: 'টাঙ্গাইল', nameEn: 'Tangail', division: 'ঢাকা', offsetMinutes: 1 },
  { id: 'brahmanbaria', nameBn: 'ব্রাহ্মণবাড়িয়া', nameEn: 'Brahmanbaria', division: 'চট্টগ্রাম', offsetMinutes: -3 },
  { id: 'noakhali', nameBn: 'নোয়াখালী', nameEn: 'Noakhali', division: 'চট্টগ্রাম', offsetMinutes: -2 },
  { id: 'feni', nameBn: 'ফেনী', nameEn: 'Feni', division: 'চট্টগ্রাম', offsetMinutes: -3 },
  { id: 'gazipur', nameBn: 'গাজীপুর', nameEn: 'Gazipur', division: 'ঢাকা', offsetMinutes: 0 },
  { id: 'narayanganj', nameBn: 'নারায়ণগঞ্জ', nameEn: 'Narayanganj', division: 'ঢাকা', offsetMinutes: 0 },
  { id: 'faridpur', nameBn: 'ফরিদপুর', nameEn: 'Faridpur', division: 'ঢাকা', offsetMinutes: 2 },
  { id: 'jamalpur', nameBn: 'জামালপুর', nameEn: 'Jamalpur', division: 'ময়মনসিংহ', offsetMinutes: 2 },
  { id: 'sirajganj', nameBn: 'সিরাজগঞ্জ', nameEn: 'Sirajganj', division: 'রাজশাহী', offsetMinutes: 3 },
  { id: 'natore', nameBn: 'নাটোর', nameEn: 'Natore', division: 'রাজশাহী', offsetMinutes: 5 },
  { id: 'naogaon', nameBn: 'নওগাঁ', nameEn: 'Naogaon', division: 'রাজশাহী', offsetMinutes: 6 },
  { id: 'chapainawabganj', nameBn: 'চাঁপাইনবাবগঞ্জ', nameEn: 'Chapainawabganj', division: 'রাজশাহী', offsetMinutes: 8 },
  { id: 'chuadanga', nameBn: 'চুয়াডাঙ্গা', nameEn: 'Chuadanga', division: 'খুলনা', offsetMinutes: 6 },
  { id: 'meherpur', nameBn: 'মেহেরপুর', nameEn: 'Meherpur', division: 'খুলনা', offsetMinutes: 7 },
  { id: 'jhenaidah', nameBn: 'ঝিনাইদহ', nameEn: 'Jhenaidah', division: 'খুলনা', offsetMinutes: 5 },
  { id: 'magura', nameBn: 'মাগুরা', nameEn: 'Magura', division: 'খুলনা', offsetMinutes: 4 },
  { id: 'narail', nameBn: 'নড়াইল', nameEn: 'Narail', division: 'খুলনা', offsetMinutes: 4 },
  { id: 'satkhira', nameBn: 'সাতক্ষীরা', nameEn: 'Satkhira', division: 'খুলনা', offsetMinutes: 6 },
  { id: 'bagerhat', nameBn: 'বাগেরহাট', nameEn: 'Bagerhat', division: 'খুলনা', offsetMinutes: 4 },
  { id: 'patuakhali', nameBn: 'পটুয়াখালী', nameEn: 'Patuakhali', division: 'বরিশাল', offsetMinutes: 1 },
  { id: 'bhola', nameBn: 'ভোলা', nameEn: 'Bhola', division: 'বরিশাল', offsetMinutes: -1 },
  { id: 'pirojpur', nameBn: 'পিরোজপুর', nameEn: 'Pirojpur', division: 'বরিশাল', offsetMinutes: 2 },
  { id: 'jhalokati', nameBn: 'ঝালকাঠি', nameEn: 'Jhalokati', division: 'বরিশাল', offsetMinutes: 1 },
  { id: 'barguna', nameBn: 'বরগুনা', nameEn: 'Barguna', division: 'বরিশাল', offsetMinutes: 1 },
  { id: 'habiganj', nameBn: 'হবিগঞ্জ', nameEn: 'Habiganj', division: 'সিলেট', offsetMinutes: -4 },
  { id: 'moulvibazar', nameBn: 'মৌলভীবাজার', nameEn: 'Moulvibazar', division: 'সিলেট', offsetMinutes: -5 },
  { id: 'sunamganj', nameBn: 'সুনামগঞ্জ', nameEn: 'Sunamganj', division: 'সিলেট', offsetMinutes: -5 },
  { id: 'netrokona', nameBn: 'নেত্রকোণা', nameEn: 'Netrokona', division: 'ময়মনসিংহ', offsetMinutes: -1 },
  { id: 'sherpur', nameBn: 'শেরপুর', nameEn: 'Sherpur', division: 'ময়মনসিংহ', offsetMinutes: 2 },
  { id: 'kishoreganj', nameBn: 'কিশোরগঞ্জ', nameEn: 'Kishoreganj', division: 'ঢাকা', offsetMinutes: -1 },
  { id: 'manikganj', nameBn: 'মানিকগঞ্জ', nameEn: 'Manikganj', division: 'ঢাকা', offsetMinutes: 1 },
  { id: 'munshiganj', nameBn: 'মুন্সীগঞ্জ', nameEn: 'Munshiganj', division: 'ঢাকা', offsetMinutes: 0 },
  { id: 'narsingdi', nameBn: 'নরসিংদী', nameEn: 'Narsingdi', division: 'ঢাকা', offsetMinutes: -1 },
  { id: 'madaripur', nameBn: 'মাদারীপুর', nameEn: 'Madaripur', division: 'ঢাকা', offsetMinutes: 1 },
  { id: 'shariatpur', nameBn: 'শরীয়তপুর', nameEn: 'Shariatpur', division: 'ঢাকা', offsetMinutes: 0 },
  { id: 'gopalganj', nameBn: 'গোপালগঞ্জ', nameEn: 'Gopalganj', division: 'ঢাকা', offsetMinutes: 2 },
  { id: 'chandpur', nameBn: 'চাঁদপুর', nameEn: 'Chandpur', division: 'চট্টগ্রাম', offsetMinutes: -1 },
  { id: 'lakshmipur', nameBn: 'লক্ষ্মীপুর', nameEn: 'Lakshmipur', division: 'চট্টগ্রাম', offsetMinutes: -1 },
  { id: 'khagrachhari', nameBn: 'খাগড়াছড়ি', nameEn: 'Khagrachhari', division: 'চট্টগ্রাম', offsetMinutes: -6 },
  { id: 'rangamati', nameBn: 'রাঙ্গামাটি', nameEn: 'Rangamati', division: 'চট্টগ্রাম', offsetMinutes: -6 },
  { id: 'bandarban', nameBn: 'বান্দরবান', nameEn: 'Bandarban', division: 'চট্টগ্রাম', offsetMinutes: -6 },
  { id: 'panchagarh', nameBn: 'পঞ্চগড়', nameEn: 'Panchagarh', division: 'রংপুর', offsetMinutes: 7 },
  { id: 'thakurgaon', nameBn: 'ঠাকুরগাঁও', nameEn: 'Thakurgaon', division: 'রংপুর', offsetMinutes: 7 },
  { id: 'nilphamari', nameBn: 'নীলফামারী', nameEn: 'Nilphamari', division: 'রংপুর', offsetMinutes: 5 },
  { id: 'lalmonirhat', nameBn: 'লালমনিরহাট', nameEn: 'Lalmonirhat', division: 'রংপুর', offsetMinutes: 3 },
  { id: 'kurigram', nameBn: 'কুড়িগ্রাম', nameEn: 'Kurigram', division: 'রংপুর', offsetMinutes: 2 },
  { id: 'gaibandha', nameBn: 'গাইবান্ধা', nameEn: 'Gaibandha', division: 'রংপুর', offsetMinutes: 3 },
  { id: 'joypurhat', nameBn: 'জয়পুরহাট', nameEn: 'Joypurhat', division: 'রাজশাহী', offsetMinutes: 4 }
];

export const toBengaliDigits = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

// Islamic Hijri Date Converter (Estimated based on lunar cycle and Bangladesh moon sighting)
export const getHijriDateBn = (date: Date = new Date()): string => {
  const hijriMonths = [
    'মুহাররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি',
    'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শাবান',
    'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ্জ'
  ];

  // Intentionally robust calculation using Intl.DateTimeFormat with islamic-umalqura calendar
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    const day = parts.find((p) => p.type === 'day')?.value || '1';
    const monthIndex = parseInt(parts.find((p) => p.type === 'month')?.value || '1', 10) - 1;
    const year = parts.find((p) => p.type === 'year')?.value || '1447';

    const monthName = hijriMonths[Math.max(0, Math.min(11, monthIndex))] || 'শাওয়াল';
    return `${toBengaliDigits(day)} ${monthName} ${toBengaliDigits(year)} হিজরি`;
  } catch {
    return '২৫ শাওয়াল ১৪৪৭ হিজরি';
  }
};

interface BaseSolarTiming {
  fajrMin: number;
  sunriseMin: number;
  dhuhrMin: number;
  asrMin: number;
  maghribMin: number;
  ishaMin: number;
}

// Calculate approximate solar prayer times for Dhaka (Lat 23.81, Long 90.41) by day of year
export const calculateDhakaBaseTimes = (date: Date): BaseSolarTiming => {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Solar declination approximation
  const declination = 23.45 * Math.sin((((284 + dayOfYear) / 365) * 360 * Math.PI) / 180);
  
  // Seasonal variation for Dhaka in minutes:
  // Summer: Fajr earlier (~03:55-04:15), Maghrib later (~18:45-18:55)
  // Winter: Fajr later (~05:15-05:25), Maghrib earlier (~17:15-17:30)
  const decRad = (declination * Math.PI) / 180;
  const latRad = (23.81 * Math.PI) / 180;
  
  // Hour angle calculation for sunrise/sunset (zenith ~ 90.83 deg)
  const cosH0 = (Math.cos((90.83 * Math.PI) / 180) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  const h0 = (Math.acos(Math.max(-1, Math.min(1, cosH0))) * 180) / Math.PI;
  const daylightMinutes = (h0 / 15) * 60;

  // Dhuhr solar noon for Dhaka is around 11:58 AM to 12:08 PM depending on equation of time
  const dhuhrMin = 12 * 60 + 2; 

  const sunriseMin = Math.round(dhuhrMin - daylightMinutes);
  const maghribMin = Math.round(dhuhrMin + daylightMinutes);

  // Fajr: ~75-80 mins before sunrise in Bangladesh
  const fajrMin = sunriseMin - 78;

  // Asr: Midpoint between Dhuhr and Maghrib + seasonal offset
  const asrMin = Math.round(dhuhrMin + (daylightMinutes * 0.58));

  // Isha: ~75 mins after maghrib
  const ishaMin = maghribMin + 74;

  return { fajrMin, sunriseMin, dhuhrMin, asrMin, maghribMin, ishaMin };
};

const formatTimeFromMinutes = (totalMin: number): string => {
  const normalized = ((totalMin % 1440) + 1440) % 1440;
  let hour = Math.floor(normalized / 60);
  const min = normalized % 60;
  
  let displayHour = hour % 12;
  if (displayHour === 0) displayHour = 12;

  const minStr = min < 10 ? `0${min}` : `${min}`;
  return `${toBengaliDigits(displayHour)}:${toBengaliDigits(minStr)}`;
};

export const getDailyPrayerSchedule = (
  districtId: string = 'dhaka',
  date: Date = new Date()
): DailyPrayerSchedule => {
  const district = BANGLADESH_DISTRICTS.find((d) => d.id === districtId) || BANGLADESH_DISTRICTS[0];
  const base = calculateDhakaBaseTimes(date);
  const offset = district.offsetMinutes;

  const fajrMin = base.fajrMin + offset;
  const sunriseMin = base.sunriseMin + offset;
  const dhuhrMin = base.dhuhrMin + offset;
  const asrMin = base.asrMin + offset;
  const maghribMin = base.maghribMin + offset;
  const ishaMin = base.ishaMin + offset;
  const tahajjudEndMin = fajrMin - 10; // সেহরির শেষ সময় / তাহাজ্জুদ সমাপ্তি

  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  let currentWaqt: PrayerType | 'sunrise_pause' | 'none' = 'none';
  let currentWaqtNameBn = 'তাহাজ্জুদ';
  let nextWaqt: PrayerType = 'fajr';
  let nextWaqtNameBn = 'ফজর';
  let diffMin = 0;

  if (currentMinutes < fajrMin) {
    currentWaqt = 'tahajjud';
    currentWaqtNameBn = 'তাহাজ্জুদ / শেষ রাত';
    nextWaqt = 'fajr';
    nextWaqtNameBn = 'ফজর';
    diffMin = fajrMin - currentMinutes;
  } else if (currentMinutes < sunriseMin) {
    currentWaqt = 'fajr';
    currentWaqtNameBn = 'ফজর ওয়াক্ত';
    nextWaqt = 'dhuhr';
    nextWaqtNameBn = 'যোহর';
    diffMin = dhuhrMin - currentMinutes;
  } else if (currentMinutes < dhuhrMin) {
    currentWaqt = 'sunrise_pause';
    currentWaqtNameBn = 'সূর্যোদয় / চাশত';
    nextWaqt = 'dhuhr';
    nextWaqtNameBn = 'যোহর';
    diffMin = dhuhrMin - currentMinutes;
  } else if (currentMinutes < asrMin) {
    currentWaqt = 'dhuhr';
    currentWaqtNameBn = 'যোহর ওয়াক্ত';
    nextWaqt = 'asr';
    nextWaqtNameBn = 'আসর';
    diffMin = asrMin - currentMinutes;
  } else if (currentMinutes < maghribMin) {
    currentWaqt = 'asr';
    currentWaqtNameBn = 'আসর ওয়াক্ত';
    nextWaqt = 'maghrib';
    nextWaqtNameBn = 'মাগরিব (ইফতার)';
    diffMin = maghribMin - currentMinutes;
  } else if (currentMinutes < ishaMin) {
    currentWaqt = 'maghrib';
    currentWaqtNameBn = 'মাগরিব ওয়াক্ত';
    nextWaqt = 'isha';
    nextWaqtNameBn = 'এশা';
    diffMin = ishaMin - currentMinutes;
  } else {
    currentWaqt = 'isha';
    currentWaqtNameBn = 'এশা ওয়াক্ত';
    nextWaqt = 'fajr';
    nextWaqtNameBn = 'ফজর (আগামীকাল)';
    diffMin = (1440 - currentMinutes) + fajrMin;
  }

  const hoursLeft = Math.floor(diffMin / 60);
  const minsLeft = diffMin % 60;
  const countdownStr = hoursLeft > 0 
    ? `${toBengaliDigits(hoursLeft)} ঘণ্টা ${toBengaliDigits(minsLeft)} মিনিট` 
    : `${toBengaliDigits(minsLeft)} মিনিট`;

  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const dateStrBn = date.toLocaleDateString('bn-BD', dateOptions);
  const hijriDateBn = getHijriDateBn(date);

  return {
    district,
    dateStrBn,
    hijriDateBn,
    times: {
      tahajjudEnd: formatTimeFromMinutes(tahajjudEndMin),
      fajr: formatTimeFromMinutes(fajrMin),
      sunrise: formatTimeFromMinutes(sunriseMin),
      dhuhr: formatTimeFromMinutes(dhuhrMin),
      asr: formatTimeFromMinutes(asrMin),
      maghrib: formatTimeFromMinutes(maghribMin),
      isha: formatTimeFromMinutes(ishaMin)
    },
    currentWaqt,
    currentWaqtNameBn,
    nextWaqt,
    nextWaqtNameBn,
    nextWaqtCountdown: countdownStr
  };
};
