import { Calendar, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { downloadIcs, getGoogleCalendarUrl } from "../utils/calendar";

export default function CalendarButton() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-serif text-sm uppercase tracking-widest text-gold/90 font-medium">
        {t.addToCalendar}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gold bg-gold/15 px-5 py-2.5 text-xs sm:text-sm font-medium text-gold backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-deep hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        >
          <Calendar size={16} aria-hidden="true" />
          <span>{t.googleCalendar}</span>
        </a>

        {/* <button
          type="button"
          onClick={downloadIcs}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-deep/60 px-5 py-2.5 text-xs sm:text-sm font-medium text-lavender transition-all duration-300 hover:border-gold hover:text-gold"
        >
          <Download size={16} aria-hidden="true" />
          <span>{t.downloadIcs}</span>
        </button> */}
      </div>
    </div>
  );
}
