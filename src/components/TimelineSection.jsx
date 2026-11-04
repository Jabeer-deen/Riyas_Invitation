import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { GoldDivider, EightPointStar } from "./Ornaments";
import { Coffee, Crown, HeartHandshake, Utensils, Clock } from "lucide-react";

const TIMELINE_ICONS = [Coffee, Crown, HeartHandshake, Utensils];

export default function TimelineSection() {
  const { t } = useLanguage();

  return (
    <section id="schedule" className="relative px-4 py-20 bg-royal-deep text-white islamic-pattern overflow-hidden">
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <GoldDivider className="mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold shimmer-gold">
            {t.timelineTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-lavender/80 font-light max-w-lg mx-auto">
            {t.timelineSubtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical Glowing Gold Center Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold/20 via-gold to-gold/20 shadow-[0_0_12px_rgba(212,175,55,0.4)]" />

          <div className="space-y-10 sm:space-y-12">
            {t.timeline.map((item, idx) => {
              const Icon = TIMELINE_ICONS[idx % TIMELINE_ICONS.length];
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } gap-6 sm:gap-12 pl-14 sm:pl-0`}
                >
                  {/* Central Node on Timeline */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-deep text-gold shadow-[0_0_15px_rgba(212,175,55,0.5)] z-20 transition-transform hover:scale-110">
                    <Icon size={20} className="text-gold" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-2rem)] ${
                      isEven ? "sm:text-right" : "sm:text-left"
                    }`}
                  >
                    <div className="rounded-2xl border border-gold/40 bg-deep/80 p-5 sm:p-6 backdrop-blur-md shadow-xl transition-all hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      {/* Time Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-semibold text-gold ${
                          isEven ? "sm:flex-row-reverse" : ""
                        }`}
                      >
                        <Clock size={12} />
                        <span>{item.time}</span>
                      </div>

                      <h3 className="mt-3 font-serif text-xl sm:text-2xl font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-lavender/80 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Empty Spacer on other side for desktop */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

