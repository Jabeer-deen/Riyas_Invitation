import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { BISMILLAH, invitation } from "../data/invitation";
import {
  CrescentMoon,
  EightPointStar,
  FloatingPetals,
  CornerFiligree,
  FanoosLantern,
  GoldDivider,
} from "./Ornaments";
import LanguageToggle from "./LanguageToggle";
import { fireConfetti } from "../utils/confetti";
import { Sparkles, ArrowRight } from "lucide-react";

export default function InvitationOpening({ onOpen }) {
  const { t, lang } = useLanguage();
  const [opening, setOpening] = useState(false);
  const [unsealed, setUnsealed] = useState(false);
  const [cardElevated, setCardElevated] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleOpen = (e) => {
    if (opening) return;
    setOpening(true);

    // Trigger wedding audio immediately on user gesture
    window.dispatchEvent(new CustomEvent("play-wedding-audio"));

    // Initial confetti burst on wax seal crack
    let origin = { x: 0.5, y: 0.55 };
    if (e && e.clientX) {
      origin = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    }

    fireConfetti({
      count: 75,
      origin,
      spread: 90,
    });

    // Step 1: Break wax seal and open flap
    setTimeout(() => {
      setUnsealed(true);
    }, 350);

    // Step 2: Elevate card z-index once it exits the envelope mouth
    setTimeout(() => {
      setCardElevated(true);
      // Secondary celebratory confetti burst around the rising card
      fireConfetti({
        count: 55,
        origin: { x: 0.5, y: 0.4 },
        spread: 110,
      });
    }, 1100);

    // Step 3: Automatically proceed into celebration after card is fully appreciated
    timerRef.current = setTimeout(() => {
      onOpen();
    }, 4000);
  };

  return (
    <motion.div
      style={{
        backgroundColor: "#06000b",
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0 1.8px, transparent 2.5px),
          radial-gradient(circle at 0 0, rgba(212, 175, 55, 0.06) 0 1.2px, transparent 2.2px),
          radial-gradient(ellipse at 50% 0%, #1c032e 0%, #0d0116 50%, #050008 100%)
        `,
        backgroundSize: "32px 32px, 32px 32px, 100% 100%",
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#06000b] px-4 text-center text-white select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingPetals />

      {/* Swaying Fanoos Lanterns at Top Corners */}
      <div className="absolute top-0 left-6 sm:left-14 w-12 sm:w-16 h-36 sm:h-48 z-10 hidden sm:block">
        <FanoosLantern delay={0} />
      </div>
      <div className="absolute top-0 right-6 sm:right-14 w-12 sm:w-16 h-36 sm:h-48 z-10 hidden sm:block">
        <FanoosLantern delay={1.5} />
      </div>

      {/* Top action bar: Language Switcher and Skip Button */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-40 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("play-wedding-audio"));
            onOpen();
          }}
          className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#0B0114]/80 backdrop-blur px-3.5 py-1.5 text-xs text-gold transition hover:bg-gold hover:text-[#12011F]"
        >
          <span>{t.skipToInvite}</span>
          <ArrowRight size={13} />
        </button>
        <LanguageToggle />
      </div>

      {/* Royal Ornamental Outer Borders & Corner Filigrees */}
      <div className="pointer-events-none absolute inset-3 sm:inset-6 rounded-3xl border border-gold/40" />
      <div className="pointer-events-none absolute inset-5 sm:inset-8 rounded-3xl border border-gold/20" />
      <CornerFiligree position="tl" className="absolute top-4 sm:top-7 left-4 sm:left-7 text-gold/70" />
      <CornerFiligree position="tr" className="absolute top-4 sm:top-7 right-4 sm:right-7 text-gold/70" />
      <CornerFiligree position="bl" className="absolute bottom-4 sm:bottom-7 left-4 sm:left-7 text-gold/70" />
      <CornerFiligree position="br" className="absolute bottom-4 sm:bottom-7 right-4 sm:right-7 text-gold/70" />

      {/* Header Announcement: Fades out gently when opening */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: opening ? -25 : 0,
          opacity: opening ? 0 : 1,
        }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg mb-2 sm:mb-4 pointer-events-none"
      >
        <p className="font-arabic text-2xl sm:text-3xl text-gold drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)]">
          {BISMILLAH}
        </p>
        <GoldDivider className="my-2" />
        <p className="font-serif text-xs sm:text-sm tracking-[0.25em] uppercase text-gold/90 font-medium">
          {t.subInvited}
        </p>
        <h2 className="mt-1 font-serif text-xl sm:text-2xl text-white font-medium drop-shadow-sm">
          {invitation.groom.name} &amp; {invitation.bride.name}
        </h2>
      </motion.div>

      {/* 3D Royal Invitation Envelope (Centered with generous top margin) */}
      <div
        className="relative my-2 sm:my-3 h-52 w-80 sm:h-60 sm:w-96 select-none cursor-pointer"
        style={{ perspective: 1400 }}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleOpen(e);
        }}
        aria-label={t.openInvitation}
      >
        {/* Envelope Base Body (Moves down slightly when opening to highlight the card) */}
        <motion.div
          animate={{
            y: opening ? 68 : 0,
            opacity: opening ? 0.8 : 1,
          }}
          transition={{
            delay: 0.35,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-x-0 bottom-0 h-40 sm:h-48 rounded-2xl border-2 border-gold/80 bg-gradient-to-b from-[#180226] via-[#0E0117] to-[#06000B] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.25)] overflow-hidden"
          style={{ zIndex: 3 }}
        >
          {/* Subtle gold inner lining pattern */}
          <div className="absolute inset-0 opacity-15 islamic-pattern" />

          {/* Envelope fold shadows and side flaps */}
          <div
            className="absolute inset-0 border-t border-gold/40"
            style={{
              clipPath: "polygon(0 100%, 50% 55%, 100% 100%)",
              background: "linear-gradient(to top, rgba(212,175,55,0.14), transparent)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 0, 48% 55%, 0 100%)",
              background: "linear-gradient(to right, rgba(10,1,16,0.7), transparent)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(100% 0, 52% 55%, 100% 100%)",
              background: "linear-gradient(to left, rgba(10,1,16,0.7), transparent)",
            }}
          />

          {/* Golden couple initials engraved on envelope body */}
          <div className="absolute bottom-3 inset-x-0 flex flex-col items-center justify-center text-center">
            <span className="font-serif text-[11px] sm:text-xs tracking-widest text-gold/80 uppercase font-semibold">
              {t.nikahTitle}
            </span>
            <span className="text-[11px] text-[#EDE4D3]/70 mt-0.5">{invitation.date.dateFormatted}</span>
          </div>
        </motion.div>

        {/* The Luxury Gold-Foil Invitation Card (Glides to the Center with Ideal Top Margin) */}
        <motion.div
          onClick={(e) => {
            if (opening) {
              e.stopPropagation();
              onOpen();
            }
          }}
          className="absolute left-2 right-2 sm:left-4 sm:right-4 top-4 flex h-52 sm:h-56 flex-col items-center justify-center rounded-2xl border-2 border-gold bg-[#FFFDF5] p-4 sm:p-5 text-[#140024] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.45)] cursor-pointer"
          style={{
            zIndex: cardElevated ? 25 : 1,
            transformOrigin: "center center",
          }}
          animate={{
            y: opening ? -110 : 0,
            scale: opening ? 1.08 : 1,
          }}
          transition={{
            delay: 0.55,
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1], // Smooth luxury cubic-bezier
          }}
        >
          {/* Ornate Inner Border & Corners */}
          <div className="absolute inset-2 rounded-xl border border-gold/60 pointer-events-none" />
          <CornerFiligree position="tl" className="absolute top-1.5 left-1.5 text-gold/70 w-6 h-6 sm:w-7 sm:h-7" />
          <CornerFiligree position="tr" className="absolute top-1.5 right-1.5 text-gold/70 w-6 h-6 sm:w-7 sm:h-7" />
          <CornerFiligree position="bl" className="absolute bottom-1.5 left-1.5 text-gold/70 w-6 h-6 sm:w-7 sm:h-7" />
          <CornerFiligree position="br" className="absolute bottom-1.5 right-1.5 text-gold/70 w-6 h-6 sm:w-7 sm:h-7" />

          {/* Card Content */}
          <p className="font-arabic text-base sm:text-xl text-[#140024] font-bold drop-shadow-sm">
            {BISMILLAH}
          </p>

          <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B8860B] font-bold mt-1">
            {t.nikahTitle}
          </p>

          <div className="my-1.5 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <h3 className="font-serif text-base sm:text-lg font-bold text-[#140024] leading-tight">
            {invitation.groom.name}
          </h3>
          <p className="text-xs text-[#B8860B] font-serif italic my-0.5 font-bold">&amp;</p>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#140024] leading-tight">
            {invitation.bride.name}
          </h3>

          <div className="mt-2 text-center">
            <p className="text-[11px] sm:text-xs text-[#140024]/85 font-medium">
              {t.dateText} • {t.timeText}
            </p>
            <p className="text-[10px] sm:text-[11px] text-[#B8860B] font-semibold mt-0.5">
              {invitation.venue.shortName || invitation.venue.name}
            </p>
          </div>

          {/* Tap hint when card is revealed */}
          {opening && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#B8860B] animate-pulse"
            >
              <span>{lang === "ta" ? "தொடரவும்" : "Tap to enter"}</span>
              <ArrowRight size={11} />
            </motion.span>
          )}
        </motion.div>

        {/* 3D Envelope Flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-28 sm:h-32 origin-top"
          style={{
            zIndex: opening ? 1 : 5,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: opening ? -180 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div
            className="h-full w-full border-b-2 border-gold/80 bg-gradient-to-b from-[#220336] to-[#100119] shadow-md"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />
        </motion.div>

        {/* The Golden Royal Wax Seal */}
        <AnimatePresence>
          {!unsealed && (
            <motion.div
              className="absolute left-1/2 top-24 sm:top-28 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
              animate={opening ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {/* Outer pulsing gold halo */}
              <div className="absolute -inset-2 rounded-full bg-gold/30 blur-md animate-ping" />

              <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-yellow-200 bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#aa8010] shadow-[0_4px_16px_rgba(212,175,55,0.7)] text-[#140024]">
                {/* Ornate inner seal details */}
                <div className="absolute inset-1 rounded-full border border-yellow-100/70" />
                <div className="flex flex-col items-center justify-center">
                  <CrescentMoon className="h-4 w-4 text-[#140024]" />
                  <span className="font-serif font-bold text-xs tracking-tighter text-[#140024]">
                    R &amp; S
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Open / Enter Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{
          opacity: 1,
          y: opening ? 35 : 0,
        }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-30 mt-6 sm:mt-8"
      >
        {opening ? (
          <button
            onClick={onOpen}
            type="button"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-amber-300 bg-gradient-to-r from-gold via-[#FFF0A0] to-gold px-8 py-3.5 font-serif text-sm sm:text-base font-bold text-[#140024] shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>{lang === "ta" ? "நேரடியாக உள்ளே செல்ல" : "Enter Celebration"}</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            onClick={handleOpen}
            disabled={opening}
            type="button"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-amber-300 bg-gradient-to-r from-gold via-[#FFF0A0] to-gold px-8 py-3.5 font-serif text-base sm:text-lg font-bold text-[#140024] shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-75"
          >
            <Sparkles className="h-5 w-5 text-[#140024] animate-spin" style={{ animationDuration: "6s" }} />
            <span>{t.openInvitation}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}

        {!opening && (
          <p className="mt-3 text-xs tracking-wider text-gold/90 font-medium flex items-center justify-center gap-1.5">
            <EightPointStar className="h-3 w-3 text-gold" />
            <span>{t.tapToOpen}</span>
            <EightPointStar className="h-3 w-3 text-gold" />
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
