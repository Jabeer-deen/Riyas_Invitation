import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { BISMILLAH, QURAN_AYAH_ARABIC, invitation } from "../data/invitation";
import {
  CrescentMoon,
  MosqueSilhouette,
  FanoosLantern,
  GoldDivider,
  CornerFiligree,
} from "./Ornaments";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="welcome"
      style={{
        backgroundColor: "#06000b",
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0 1.8px, transparent 2.5px),
          radial-gradient(circle at 0 0, rgba(212, 175, 55, 0.06) 0 1.2px, transparent 2.2px),
          radial-gradient(ellipse at 50% 0%, #1c032e 0%, #0d0116 50%, #050008 100%)
        `,
        backgroundSize: "32px 32px, 32px 32px, 100% 100%",
      }}
      className="relative overflow-hidden px-4 pb-24 pt-28 sm:pt-36 text-center text-white bg-[#06000b]"
    >
      {/* Decorative Hanging Lanterns on Sides */}
      <div className="absolute top-0 left-4 sm:left-12 w-14 sm:w-20 h-44 sm:h-64 pointer-events-none select-none z-10">
        <FanoosLantern delay={0} />
      </div>
      <div className="absolute top-0 right-4 sm:right-12 w-14 sm:w-20 h-44 sm:h-64 pointer-events-none select-none z-10">
        <FanoosLantern delay={1.8} />
      </div>

      {/* Floating golden background glow orb */}
      <div className="pointer-events-none absolute left-1/2 top-28 -translate-x-1/2 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        {/* Sacred Bismillah */}
        <div className="inline-block relative">
          <p className="font-arabic text-3xl sm:text-5xl leading-relaxed text-gold drop-shadow-[0_2px_15px_rgba(212,175,55,0.6)]">
            {BISMILLAH}
          </p>
          <span className="text-xs uppercase tracking-[0.25em] text-[#EDE4D3]/75 block mt-1">
            {t.bismillah}
          </span>
        </div>

        {/* Ornate Divider */}
        <GoldDivider className="my-6" />

        {/* Assalamu Alaikum Pill */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 sm:px-6 py-2 text-xs sm:text-sm font-serif italic text-amber-200 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <Sparkles size={14} className="text-gold animate-pulse" />
          <span>{t.assalamu}</span>
          <Sparkles size={14} className="text-gold animate-pulse" />
        </motion.div>

        {/* Grand Invitation Title */}
        <h1 className="mt-6 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          <span className="shimmer-gold block text-2xl sm:text-3xl lg:text-4xl mb-2 font-normal">
            {t.nikahTitle}
          </span>
          <span className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            {invitation.groom.name}
          </span>
          <span className="font-serif italic text-gold text-2xl sm:text-3xl block my-1 drop-shadow-sm">
            &amp;
          </span>
          <span className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            {invitation.bride.name}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-[#EDE4D3]/90 font-light">
          {t.welcomeDesc}
        </p>

        {/* Date, Time & Venue Highlight Ribbon (Cohesive Dark Obsidian Glass) */}
        <div className="mt-8 mx-auto inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-2xl border border-gold/50 bg-[#0E0117]/90 p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gold">
            <Calendar size={16} className="text-gold" />
            <span className="font-medium text-[#F8F4EC]">{t.dateText}</span>
          </div>
          <span className="hidden sm:inline text-gold/50">•</span>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gold">
            <Clock size={16} className="text-gold" />
            <span className="font-medium text-[#F8F4EC]">{t.timeText}</span>
          </div>
          <span className="hidden sm:inline text-gold/50">•</span>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gold">
            <MapPin size={16} className="text-gold" />
            <span className="font-medium text-[#F8F4EC]">{invitation.venue.shortName || invitation.venue.name}</span>
          </div>
        </div>

        {/* Quranic Ayah Card (Cohesive Dark Luxury Glass) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative mt-12 mx-auto max-w-2xl rounded-3xl border border-gold/45 bg-[#0B0113]/90 p-6 sm:p-8 backdrop-blur-md shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.15)]"
        >
          <CornerFiligree position="tl" className="absolute top-2 left-2 text-gold/60" />
          <CornerFiligree position="tr" className="absolute top-2 right-2 text-gold/60" />
          <CornerFiligree position="bl" className="absolute bottom-2 left-2 text-gold/60" />
          <CornerFiligree position="br" className="absolute bottom-2 right-2 text-gold/60" />

          <p className="font-arabic text-xl sm:text-2xl leading-loose text-[#FDE68A] drop-shadow-[0_2px_12px_rgba(253,230,138,0.3)] px-4">
            {QURAN_AYAH_ARABIC}
          </p>

          <div className="my-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <p className="font-serif italic text-sm sm:text-base text-[#F5EEDC] leading-relaxed">
            {t.quranVerse}
          </p>

          <p className="mt-2 text-xs uppercase tracking-widest text-gold/80 font-medium">
            {t.quranSurah}
          </p>
        </motion.div>

        {/* Mosque Silhouette at base */}
        <div className="mt-14 flex flex-col items-center justify-center">
          <MosqueSilhouette className="h-16 sm:h-20 w-44 sm:w-56 text-gold/50 transition-all hover:text-gold/75" />
        </div>
      </motion.div>

      {/* Smooth Dark Gradient Blend into Next Section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06000b] to-transparent pointer-events-none" />
    </section>
  );
}
