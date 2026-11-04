import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, Moon, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useCountdown } from "../hooks/useCountdown";
import { invitation } from "../data/invitation";
import { CornerFiligree, GoldDivider } from "./Ornaments";
import CalendarButton from "./CalendarButton";

export default function Countdown() {
  const { t } = useLanguage();
  const { days, hours, minutes, seconds, started, ended } = useCountdown();

  const units = [
    { value: days, label: t.days },
    { value: hours, label: t.hours },
    { value: minutes, label: t.minutes },
    { value: seconds, label: t.seconds },
  ];

  return (
    <section id="countdown" className="relative px-4 py-20 bg-[#0A0113] text-white islamic-pattern">
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <GoldDivider className="mb-4" />
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold shimmer-gold">
          {t.countdownTitle}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#EDE4D3]/80 font-light max-w-lg mx-auto">
          {t.countdownSubtitle}
        </p>

        {/* Hijri & Gregorian Date Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#0E0117]/90 px-4 py-1.5 shadow-sm text-gold">
            <Calendar size={15} className="text-gold" />
            <span className="font-medium text-[#F8F4EC]">{t.dateText}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#0E0117]/90 px-4 py-1.5 shadow-sm text-gold">
            <Clock size={15} className="text-gold" />
            <span className="font-medium text-[#F8F4EC]">{t.timeText}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#0E0117]/90 px-4 py-1.5 shadow-sm text-gold">
            <Moon size={15} className="text-gold" />
            <span className="font-medium text-[#EDE4D3]/90">{t.hijriDate || invitation.date.hijriDate}</span>
          </span>
        </div>

        {/* The Luxury Countdown Board */}
        <div className="relative mt-12 mx-auto max-w-2xl rounded-3xl border-2 border-gold/50 bg-gradient-to-br from-[#180226] via-[#1F0332] to-[#0E0117] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.2)] text-white">
          <CornerFiligree position="tl" className="absolute top-2 left-2 text-gold/60" />
          <CornerFiligree position="tr" className="absolute top-2 right-2 text-gold/60" />
          <CornerFiligree position="bl" className="absolute bottom-2 left-2 text-gold/60" />
          <CornerFiligree position="br" className="absolute bottom-2 right-2 text-gold/60" />

          {started ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6"
            >
              <Sparkles className="mx-auto h-10 w-10 text-gold animate-bounce mb-3" />
              <p className="font-serif text-2xl sm:text-3xl text-gold">
                {ended ? t.endedMsg : t.startedMsg}
              </p>
            </motion.div>
          ) : (
            <div
              className="grid grid-cols-4 gap-2.5 sm:gap-5"
              role="timer"
              aria-live="off"
            >
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="group relative flex flex-col items-center rounded-2xl border border-gold/50 bg-[#0A0113]/90 p-3 sm:p-5 shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
                >
                  {/* Subtle decorative gold top accent */}
                  <div className="absolute top-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

                  <div className="relative h-12 sm:h-20 w-full overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={unit.value}
                        initial={{ y: -24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 24, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute font-serif text-3xl sm:text-6xl font-bold tabular-nums text-gold drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)]"
                      >
                        {String(unit.value).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <span className="mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#EDE4D3]/75">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Integrated Save to Calendar */}
          <div className="mt-8 pt-6 border-t border-gold/30 flex justify-center">
            <CalendarButton />
          </div>
        </div>
      </div>
    </section>
  );
}
