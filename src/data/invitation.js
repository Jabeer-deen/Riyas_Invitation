// Single source of truth for event details.
// Names are kept exact as confirmed.

export const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

export const QURAN_AYAH_ARABIC =
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً";

export const QURAN_REFERENCE = "Surah Ar-Rum 30:21";

export const invitation = {
  groom: {
    name: "H. Abdul Riyas Khan",
    qualification: "B.E.",
    company: "Accenture Solutions Pvt. Ltd., Bangalore",
    parents: "H. Hameed & Family",
  },
  bride: {
    name: "S. Shabana Begum",
    qualification: "B.E.",
    parents: "S. Shahul Hameed & Family",
  },
  venue: {
    name: "Vasantham Marriage Mahal",
    district: "North Manamelkudi, Pudukkottai",
    fullAddress: "North Manamelkudi, Pudukkottai District, Tamil Nadu - 614620, India",
    landmark: "East Coast Road (ECR), North Manamelkudi",
  },
  date: {
    day: "Sunday",
    dateFormatted: "22 November 2026",
    hijriDate: "13 Jumada al-Awwal 1448 AH",
    time: "12:00 PM (Noon)",
  },
  mapQuery: "Vasantham Marriage Mahal, North Manamelkudi, Tamil Nadu",
  siteUrl: "https://your-domain.com/",
  audioSrc: "/audio/nasheed.mp3",
  calendarTitle: "Nikah – H. Abdul Riyas Khan & S. Shabana Begum",
  calendarDetails:
    "Nikah ceremony of H. Abdul Riyas Khan & S. Shabana Begum. Venue: Vasantham Marriage Mahal, North Manamelkudi, Pudukkottai, Tamil Nadu.",
  whatsappContact: "+919876543210",
};

// 12:00 PM Indian Standard Time (UTC+05:30) = 06:30 UTC.
export const EVENT_START = Date.UTC(2026, 10, 22, 6, 30); // 22 Nov 2026, 12:00 PM IST
export const EVENT_DURATION_HOURS = 2;
export const EVENT_END = EVENT_START + EVENT_DURATION_HOURS * 60 * 60 * 1000;
