import { useLanguage } from "../context/LanguageContext";

const OPTIONS = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ்" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center rounded-full border border-gold/60 bg-deep/80 p-0.5 sm:p-1 text-xs sm:text-sm backdrop-blur-md shadow-md"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLang(opt.code)}
          aria-pressed={lang === opt.code}
          className={`rounded-full px-2.5 sm:px-3 py-1 font-medium transition-all duration-200 ${
            lang === opt.code
              ? "bg-gradient-to-r from-gold via-yellow-200 to-gold font-bold text-deep shadow-sm"
              : "text-gold/90 hover:bg-gold/15 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
