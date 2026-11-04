import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Copy, Check, Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { invitation } from "../data/invitation";
import { CornerFiligree, GoldDivider } from "./Ornaments";

const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  invitation.mapQuery
)}&output=embed`;

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  invitation.mapQuery
)}`;

export default function VenueSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${invitation.venue.name}, ${invitation.venue.fullAddress}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(t.copyPrompt, invitation.venue.fullAddress);
    }
  };

  return (
    <section id="venue" className="relative px-4 py-20 bg-[#0A0113] text-white islamic-pattern">
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <GoldDivider className="mb-4" />
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold shimmer-gold">
          {t.venueTitle}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#EDE4D3]/80 font-light max-w-lg mx-auto">
          {t.venueSubtitle}
        </p>

        {/* Venue Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-10 rounded-3xl border-2 border-gold/50 bg-[#0E0117]/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.15)] backdrop-blur-md"
        >
          <CornerFiligree position="tl" className="absolute top-2 left-2 text-gold/60" />
          <CornerFiligree position="tr" className="absolute top-2 right-2 text-gold/60" />
          <CornerFiligree position="bl" className="absolute bottom-2 left-2 text-gold/60" />
          <CornerFiligree position="br" className="absolute bottom-2 right-2 text-gold/60" />

          {/* Location Icon with pulsing halo */}
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-[#1C022B] to-[#0E0117] text-gold shadow-md">
            <div className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-25" />
            <MapPin size={28} className="text-gold" />
          </div>

          <h3 className="mt-5 font-serif text-2xl sm:text-4xl font-bold text-white drop-shadow-sm">
            {t.venueName}
          </h3>

          <p className="mt-2 text-sm sm:text-base text-[#EDE4D3]/85 max-w-md mx-auto leading-relaxed font-light">
            {t.venueAddress}
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/15 px-4 py-1 text-xs text-amber-200 font-medium">
            <Compass size={13} className="text-gold" />
            <span>{invitation.venue.landmark}</span>
          </div>

          {/* Action Buttons: Directions & Copy Address */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Navigation size={18} aria-hidden="true" />
              <span>{t.getDirections}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="btn-outline-gold"
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              <span>{copied ? t.addressCopied : t.copyAddress}</span>
            </button>
          </div>

          {/* Embedded Google Map with Luxury Border */}
          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-gold/40 shadow-inner bg-[#06000B]">
            <iframe
              title={t.venueName}
              src={mapEmbedUrl}
              className="h-72 w-full sm:h-96"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
