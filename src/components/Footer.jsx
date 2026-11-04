import { MessageCircle, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { BISMILLAH } from "../data/invitation";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { CrescentMoon, MosqueSilhouette, CornerFiligree } from "./Ornaments";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="islamic-pattern relative overflow-hidden bg-[#06000B] px-6 py-16 text-center text-[#EDE4D3] border-t border-gold/40">
      {/* Golden top filigree corners */}
      <CornerFiligree position="tl" className="absolute top-2 left-2 text-gold/40" />
      <CornerFiligree position="tr" className="absolute top-2 right-2 text-gold/40" />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center gap-5">
        <div className="flex items-center gap-3 text-gold">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <CrescentMoon className="h-5 w-5 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <p className="font-arabic text-2xl sm:text-3xl text-gold drop-shadow-sm">
          {BISMILLAH}
        </p>

        <p className="text-sm sm:text-base leading-relaxed text-[#EDE4D3]/90 font-light max-w-md">
          {t.footerMsg}
        </p>

        <div className="my-2">
          <p className="text-xs uppercase tracking-widest text-gold/80 font-medium">
            {t.withLove}
          </p>
          <p className="mt-1 font-serif text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-1.5">
            <span>{t.footerFrom}</span>
            <Heart size={16} className="text-gold fill-current" />
          </p>
        </div>

        <MosqueSilhouette className="mt-4 h-16 w-44 text-gold/50" />

        <div className="mt-4 pt-4 border-t border-gold/20 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#EDE4D3]/60">
          <span>Sunday, 22 November 2026</span>
          <a
            href={buildWhatsAppUrl(t)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gold hover:text-white transition-colors"
          >
            <MessageCircle size={14} />
            <span>{t.shareWhatsApp}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
