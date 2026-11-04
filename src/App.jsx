import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import InvitationOpening from "./components/InvitationOpening";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CoupleSection from "./components/CoupleSection";
import TimelineSection from "./components/TimelineSection";
import Countdown from "./components/Countdown";
import VenueSection from "./components/VenueSection";
import DuaWishesSection from "./components/DuaWishesSection";
import { ShareInvitation, FloatingWhatsApp } from "./components/ShareInvitation";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";

function InvitationPage() {
  const { lang, t } = useLanguage();
  const [opened, setOpened] = useState(false);

  // Keep the document language and title in sync with the selected language.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.pageTitle;
  }, [lang, t]);

  return (
    <div
      className={`min-h-screen bg-[#06000b] text-[#EDE4D3] ${lang === "ta" ? "font-tamil" : "font-sans"}`}
      style={{ backgroundColor: "#06000b" }}
    >
      <AnimatePresence mode="wait">
        {!opened && (
          <InvitationOpening
            key="opening"
            onOpen={() => setOpened(true)}
          />
        )}
      </AnimatePresence>

      {opened && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative bg-[#06000b]"
          style={{ backgroundColor: "#06000b" }}
        >
          <Navbar onReopenEnvelope={() => setOpened(false)} />
          <HeroSection />
          <CoupleSection />
          <TimelineSection />
          <Countdown />
          <VenueSection />
          <DuaWishesSection />
          <ShareInvitation />
          <Footer />
          <FloatingWhatsApp />
        </motion.main>
      )}

      {/* Global AudioPlayer: preloads nasheed and plays by default across all screens */}
      <AudioPlayer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <InvitationPage />
    </LanguageProvider>
  );
}
