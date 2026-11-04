import { useLanguage } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { CrescentMoon, EightPointStar } from "./Ornaments";
import { Mail, Calendar, Users, MapPin, Heart } from "lucide-react";

export default function Navbar({ onReopenEnvelope }) {
  const { t } = useLanguage();

  const navLinks = [
    { href: "#couple", label: t.navCouple, icon: Users },
    { href: "#schedule", label: t.navSchedule, icon: Calendar },
    { href: "#venue", label: t.navVenue, icon: MapPin },
    { href: "#wishes", label: t.navWishes, icon: Heart },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/30 bg-deep/85 backdrop-blur-md px-3 sm:px-6 py-3 text-white transition-all shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#welcome"
          className="flex items-center gap-2 group text-decoration-none"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-gold transition-transform group-hover:scale-110">
            <CrescentMoon className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base font-semibold tracking-wide text-gold">
              {t.navBrand}
            </span>
            <span className="hidden sm:block text-[10px] text-lavender/70 font-sans tracking-wider">
              22 NOV 2026
            </span>
          </div>
        </a>

        {/* Section Navigation Links (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs lg:text-sm text-lavender/90 transition hover:bg-gold/15 hover:text-gold"
              >
                <Icon size={13} className="text-gold/80" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions: Replay Envelope & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onReopenEnvelope && (
            <button
              type="button"
              onClick={onReopenEnvelope}
              title={t.reopenEnvelope}
              className="flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-xs text-gold transition hover:bg-gold hover:text-deep"
            >
              <Mail size={13} />
              <span className="hidden sm:inline">{t.reopenEnvelope}</span>
            </button>
          )}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
