import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { invitation } from "../data/invitation";
import { startAmbientSound, stopAmbientSound } from "../utils/audioSynth";

export default function AudioPlayer() {
  const { t } = useLanguage();
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [usingSynth, setUsingSynth] = useState(false);

  // Play handler with synth fallback
  const startPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (usingSynth) {
      startAmbientSound();
      setPlaying(true);
      return;
    }

    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          // If browser policy blocks direct autoplay, wait for the first user interaction
        });
    }
  };

  // Attempt autoplay immediately on mount + listen for any user interaction or custom event
  useEffect(() => {
    // 1. Try to autoplay right away
    startPlayback();

    // 2. Global user interaction listener to bypass browser autoplay restrictions
    const handleFirstInteraction = () => {
      startPlayback();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    // 3. Listen for explicit custom event (e.g. from wax seal click or skip button)
    const handleCustomTrigger = () => {
      startPlayback();
    };
    window.addEventListener("play-wedding-audio", handleCustomTrigger);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("play-wedding-audio", handleCustomTrigger);
    };
  }, [usingSynth]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (playing) {
      if (usingSynth) {
        stopAmbientSound();
      } else if (audio) {
        audio.pause();
      }
      setPlaying(false);
    } else {
      startPlayback();
    }
  };

  const handleAudioError = () => {
    // Switch to synth generator if mp3 fails
    setUsingSynth(true);
    startAmbientSound();
    setPlaying(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-3 select-none">
      <audio
        ref={audioRef}
        src={invitation.audioSrc}
        preload="auto"
        loop
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={handleAudioError}
      />

      {/* Expanded Control Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-64 rounded-2xl border-2 border-gold/70 bg-[#160124]/95 p-4 text-white shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gold/30">
              <span className="font-serif text-sm font-semibold text-gold">
                {t.music}
              </span>
              {playing && (
                <div className="flex items-end gap-1 h-3.5">
                  <span className="w-1 bg-gold h-3.5 animate-pulse" />
                  <span className="w-1 bg-gold h-2 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="w-1 bg-gold h-4 animate-pulse" style={{ animationDelay: "0.4s" }} />
                  <span className="w-1 bg-gold h-1.5 animate-pulse" style={{ animationDelay: "0.1s" }} />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-yellow-200 to-gold px-4 py-2 text-xs font-bold text-[#140024] transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
                <span>{playing ? t.pause : t.play}</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? t.unmute : t.mute}
                className="rounded-full border border-gold/60 p-2 text-gold transition hover:bg-gold/20"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Button with Pulsing Glow */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t.music}
        title={t.music}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-[#2D0442] via-[#480866] to-[#160124] text-gold shadow-[0_4px_20px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {playing && (
          <span className="absolute -inset-1 rounded-full border border-gold/70 animate-ping opacity-60" />
        )}
        <Music size={22} className={playing ? "animate-bounce" : ""} />
      </button>
    </div>
  );
}
