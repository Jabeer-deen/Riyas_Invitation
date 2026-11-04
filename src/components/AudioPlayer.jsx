import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX, Sparkles } from "lucide-react";
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
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = async () => {
    setShowTooltip(false);
    const audio = audioRef.current;

    if (playing) {
      if (usingSynth) {
        stopAmbientSound();
      } else if (audio) {
        audio.pause();
      }
      setPlaying(false);
      return;
    }

    // Try playing the mp3 file first
    if (audio && !usingSynth) {
      try {
        await audio.play();
        setPlaying(true);
        return;
      } catch {
        // Fallback to ambient Web Audio synth if mp3 is missing or blocked
        setUsingSynth(true);
        startAmbientSound();
        setPlaying(true);
        return;
      }
    }

    // Direct synth toggle
    startAmbientSound();
    setPlaying(true);
  };

  const handleAudioError = () => {
    // Graceful switch to synth generator
    setUsingSynth(true);
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
        preload="none"
        loop
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={handleAudioError}
      />

      {/* Floating Tooltip Prompt */}
      <AnimatePresence>
        {showTooltip && !playing && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-full border border-gold/60 bg-deep/95 px-3 py-1.5 text-xs text-gold shadow-lg backdrop-blur flex items-center gap-1.5"
          >
            <Sparkles size={12} className="text-gold animate-spin" />
            <span>{t.musicPrompt}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Control Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-64 rounded-2xl border-2 border-gold/70 bg-[#240035]/95 p-4 text-white shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gold/30">
              <span className="font-serif text-sm font-semibold text-gold">
                {t.music}
              </span>
              {playing && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-gold h-3 animate-pulse" />
                  <span className="w-1 bg-gold h-2 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="w-1 bg-gold h-3.5 animate-pulse" style={{ animationDelay: "0.4s" }} />
                  <span className="w-1 bg-gold h-1.5 animate-pulse" style={{ animationDelay: "0.1s" }} />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-yellow-200 to-gold px-4 py-2 text-xs font-bold text-deep transition-all hover:scale-105 active:scale-95 shadow-md"
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

      {/* Floating Music Button with Pulsing Wave */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t.music}
        title={t.music}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-primary via-[#53096e] to-deep text-gold shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {playing && (
          <span className="absolute -inset-1 rounded-full border border-gold/60 animate-ping opacity-60" />
        )}
        <Music size={22} className={playing ? "animate-bounce" : ""} />
      </button>
    </div>
  );
}
