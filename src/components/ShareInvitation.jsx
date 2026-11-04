import { useState } from "react";
import { MessageCircle, Share2, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { invitation } from "../data/invitation";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { GoldDivider } from "./Ornaments";

export function ShareInvitation() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    return typeof window !== "undefined" && window.location.href
      ? window.location.href
      : invitation.siteUrl;
  };

  const handleShare = async () => {
    const url = getShareUrl();
    const data = {
      title: invitation.calendarTitle,
      text: t.shareText,
      url,
    };

    // Native share sheet on mobile devices
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // User cancelled share
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(t.copyPrompt, url);
    }
  };

  return (
    <section className="relative px-4 pb-20 pt-10 text-center bg-[#0A0113] text-white islamic-pattern">
      <div className="mx-auto max-w-2xl relative z-10">
        <GoldDivider className="mb-4" />
        <h2 className="font-serif text-2xl sm:text-4xl font-bold shimmer-gold">
          {t.shareTitle}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#EDE4D3]/75">
          {t.shareSubtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="btn-primary"
          >
            {copied ? <Check size={18} className="text-[#140024]" /> : <Share2 size={18} aria-hidden="true" />}
            <span>{copied ? t.linkCopied : t.shareInvitation}</span>
          </button>

          <a
            href={buildWhatsAppUrl(t)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold"
          >
            <MessageCircle size={18} className="text-green-400" aria-hidden="true" />
            <span>{t.shareWhatsApp}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function FloatingWhatsApp() {
  const { t } = useLanguage();

  return (
    <a
      href={buildWhatsAppUrl(t)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.shareWhatsApp}
      title={t.shareWhatsApp}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.6)]"
    >
      <div className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75" />
      <MessageCircle size={28} className="relative z-10" aria-hidden="true" />
    </a>
  );
}
