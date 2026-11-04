import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { invitation } from "../data/invitation";
import { CrescentMoon, EightPointStar, CornerFiligree, GoldDivider } from "./Ornaments";
import { Briefcase, GraduationCap, User } from "lucide-react";

function CoupleCard({
  role,
  roleDesc,
  name,
  qualification,
  detail,
  avatarIcon: AvatarIcon,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative rounded-3xl border-2 border-gold/45 bg-[#0E0117]/90 p-6 sm:p-8 text-center shadow-[0_15px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(212,175,55,0.12)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.25)] hover:-translate-y-1"
    >
      <CornerFiligree position="tl" className="absolute top-2 left-2 text-gold/40 group-hover:text-gold/80 transition-colors" />
      <CornerFiligree position="tr" className="absolute top-2 right-2 text-gold/40 group-hover:text-gold/80 transition-colors" />
      <CornerFiligree position="bl" className="absolute bottom-2 left-2 text-gold/40 group-hover:text-gold/80 transition-colors" />
      <CornerFiligree position="br" className="absolute bottom-2 right-2 text-gold/40 group-hover:text-gold/80 transition-colors" />

      {/* Decorative Royal Avatar Ring */}
      <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/60 animate-spin" style={{ animationDuration: "25s" }} />
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#1C022B] via-[#2A0440] to-[#0E0117] flex items-center justify-center text-gold shadow-inner border border-gold/30">
          <AvatarIcon size={38} className="drop-shadow-[0_2px_8px_rgba(212,175,55,0.5)]" />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-gold bg-[#0E0117] text-gold shadow">
          <CrescentMoon className="h-4 w-4" />
        </div>
      </div>

      {/* Role Badge */}
      <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
        <EightPointStar className="h-3 w-3 text-gold" />
        <span>{role}</span>
        <EightPointStar className="h-3 w-3 text-gold" />
      </div>

      {/* Name */}
      <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide drop-shadow-sm">
        {name}
      </h3>

      {/* Qualifications */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-[#EDE4D3]/85 font-medium">
        <span className="inline-flex items-center gap-1 rounded-md bg-gold/15 border border-gold/30 px-2.5 py-0.5 text-xs text-amber-200 font-semibold">
          <GraduationCap size={14} />
          {qualification}
        </span>
        {roleDesc && (
          <span className="text-xs text-[#EDE4D3]/70">
            • {roleDesc}
          </span>
        )}
      </div>

      {/* Company / Career detail */}
      {detail && (
        <p className="mt-2 text-xs sm:text-sm text-[#EDE4D3]/80 flex items-center justify-center gap-1.5">
          <Briefcase size={14} className="text-gold/80 shrink-0" />
          <span>{detail}</span>
        </p>
      )}
    </motion.div>
  );
}

export default function CoupleSection() {
  const { t } = useLanguage();

  return (
    <section id="couple" className="relative px-4 pb-20 bg-[#0A0113] text-white islamic-pattern">
      <div className="mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-14">
          <GoldDivider className="mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold shimmer-gold">
            {t.navCouple}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#EDE4D3]/80 font-light max-w-lg mx-auto">
            {t.togetherForever}
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          {/* Groom Card */}
          <CoupleCard
            role={t.groomLabel}
            roleDesc={t.groomRoleDesc}
            name={invitation.groom.name}
            qualification={invitation.groom.qualification}
            detail={invitation.groom.company}
            avatarIcon={User}
            index={0}
          />

          {/* Golden Centerpiece Symbol */}
          <div className="flex flex-col items-center justify-center my-4 md:my-0 text-center select-none">
            <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center">
              {/* Interlocking Rings SVG */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/40 animate-ping opacity-30" />
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-[#1C022B] to-[#0E0117] text-gold shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                <span className="font-serif text-3xl font-light italic text-gold drop-shadow-sm">
                  &amp;
                </span>
              </div>
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-widest text-gold font-semibold">
              Blessed Union
            </p>
          </div>

          {/* Bride Card */}
          <CoupleCard
            role={t.brideLabel}
            roleDesc={t.brideRoleDesc}
            name={invitation.bride.name}
            qualification={invitation.bride.qualification}
            avatarIcon={User}
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
