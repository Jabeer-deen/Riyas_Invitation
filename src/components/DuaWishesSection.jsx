import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { GoldDivider } from "./Ornaments";
import { fireConfetti } from "../utils/confetti";
import { Heart, Sparkles } from "lucide-react";

export default function DuaWishesSection() {
  const { t } = useLanguage();
  const [totalDuas, setTotalDuas] = useState(138);
  const [lastSentToast, setLastSentToast] = useState("");

  const handleSendDua = (dua, e) => {
    setTotalDuas((prev) => prev + 1);
    setLastSentToast(t.duaSentSuccess);

    // Confetti coordinates from click
    let origin = { x: 0.5, y: 0.6 };
    if (e && e.clientX) {
      origin = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    }

    fireConfetti({
      count: 60,
      origin,
      spread: 80,
    });

    setTimeout(() => {
      setLastSentToast("");
    }, 3500);
  };

  return (
    <section
      id="wishes"
      style={{ backgroundColor: "#06000b" }}
      className="relative px-4 py-20 bg-royal text-white islamic-pattern overflow-hidden"
    >
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-14">
          <GoldDivider className="mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold shimmer-gold">
            {t.duaSectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#EDE4D3]/85 font-light max-w-lg mx-auto">
            {t.duaSectionSubtitle}
          </p>
        </div>

        {/* Quick Dua Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {t.duaButtons.map((btn) => (
            <motion.button
              key={btn.id}
              type="button"
              onClick={(e) => handleSendDua(btn, e)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-gold/40 bg-[#0E0117]/85 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >
              <span className="font-serif text-lg sm:text-xl font-bold text-gold group-hover:text-yellow-200 transition-colors">
                {btn.text}
              </span>
              <span className="mt-1 text-xs text-[#EDE4D3]/80 font-light">
                {btn.sub}
              </span>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-gold/80 group-hover:text-gold font-medium">
                <Sparkles size={12} />
                <span>Tap to shower blessings</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Counter and Toast */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-2 text-xs sm:text-sm text-gold backdrop-blur-sm shadow-md">
            <Heart size={15} className="fill-current text-gold animate-pulse" />
            <span className="font-semibold tabular-nums">{totalDuas}</span>
            <span>{t.totalDuasSent}</span>
          </div>

          <AnimatePresence>
            {lastSentToast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 inline-block rounded-xl border border-gold bg-gold/20 px-4 py-2 text-xs sm:text-sm text-yellow-200 font-medium"
              >
                {lastSentToast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
