import { motion } from "framer-motion";

export function CrescentMoon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function EightPointStar({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l2.6 4.3 4.9-1.2-1.2 4.9 4.3 2.6-4.3 2.6 1.2 4.9-4.9-1.2L12 22l-2.6-4.3-4.9 1.2 1.2-4.9L1.4 12.6l4.3-2.6-1.2-4.9 4.9 1.2L12 2z" />
    </svg>
  );
}

export function MosqueSilhouette({ className = "" }) {
  return (
    <svg
      viewBox="0 0 240 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Central Grand Dome */}
      <path d="M70 100 V65 Q70 20 120 10 Q170 20 170 65 V100 Z" />
      <path d="M117 10 L120 3 L123 10 Z" />
      {/* Left Minor Dome */}
      <path d="M35 100 V72 Q35 45 65 38 V100 Z" />
      {/* Right Minor Dome */}
      <path d="M175 100 V38 Q205 45 205 72 V100 Z" />
      {/* Left Minaret */}
      <rect x="14" y="28" width="10" height="72" rx="1" />
      <path d="M10 28 L19 6 L28 28 Z" />
      <circle cx="19" cy="4" r="2" />
      {/* Right Minaret */}
      <rect x="216" y="28" width="10" height="72" rx="1" />
      <path d="M212 28 L221 6 L230 28 Z" />
      <circle cx="221" cy="4" r="2" />
      {/* Base platform */}
      <rect x="0" y="93" width="240" height="7" rx="1" />
    </svg>
  );
}

// Hanging swaying Fanoos (Islamic Lantern) with gentle glowing light
export function FanoosLantern({ className = "", delay = 0, style = {} }) {
  return (
    <motion.div
      className={`origin-top select-none pointer-events-none ${className}`}
      animate={{ rotate: [-2.5, 2.5, -2.5] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      style={style}
    >
      <svg
        viewBox="0 0 60 120"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,175,55,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chain link */}
        <line x1="30" y1="0" x2="30" y2="28" stroke="#D4AF37" strokeWidth="1.8" strokeDasharray="2 2" />
        <circle cx="30" cy="28" r="3" fill="#F9E79F" stroke="#D4AF37" strokeWidth="1.2" />

        {/* Top Dome Cap */}
        <path d="M18 42 C18 32 42 32 42 42 Z" fill="#D4AF37" stroke="#F9E79F" strokeWidth="1" />
        <path d="M27 32 L30 29 L33 32 Z" fill="#F9E79F" />

        {/* Lantern Glass Body with Amber Glow */}
        <polygon points="18,42 12,68 20,90 40,90 48,68 42,42" fill="rgba(255, 215, 0, 0.18)" stroke="#D4AF37" strokeWidth="1.5" />
        
        {/* Inner Flame Glow */}
        <circle cx="30" cy="66" r="8" fill="#FFF3B0" opacity="0.8" className="animate-pulse" />
        <ellipse cx="30" cy="65" rx="3" ry="6" fill="#FFA500" opacity="0.9" />

        {/* Lattice ribs */}
        <line x1="30" y1="42" x2="30" y2="90" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
        <line x1="18" y1="42" x2="20" y2="90" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
        <line x1="42" y1="42" x2="40" y2="90" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />

        {/* Bottom Finial */}
        <path d="M20 90 L30 102 L40 90 Z" fill="#D4AF37" stroke="#F9E79F" strokeWidth="1" />
        <circle cx="30" cy="106" r="2.5" fill="#F9E79F" />
      </svg>
    </motion.div>
  );
}

// Ornate Corner Filigree for royal card borders
export function CornerFiligree({ position = "tl", className = "" }) {
  const rotation = {
    tl: "rotate-0",
    tr: "rotate-90",
    br: "rotate-180",
    bl: "-rotate-90",
  }[position] || "";

  return (
    <svg
      viewBox="0 0 64 64"
      className={`w-8 h-8 sm:w-10 sm:h-10 text-gold/80 pointer-events-none select-none ${rotation} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 60 V20 C4 11.2 11.2 4 20 4 H60" />
      <path d="M12 60 V24 C12 17.4 17.4 12 24 12 H60" strokeDasharray="3 2" />
      <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.4" />
      <path d="M4 4 L14 14" />
      <circle cx="4" cy="4" r="2" fill="currentColor" />
    </svg>
  );
}

// Ornate Gold Horizontal Divider with Crescent & Flourishes
export function GoldDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 select-none ${className}`} aria-hidden="true">
      <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-gold to-gold" />
      <span className="text-gold/60 text-xs">◆</span>
      <div className="flex items-center justify-center text-gold">
        <CrescentMoon className="h-4 w-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
      </div>
      <span className="text-gold/60 text-xs">◆</span>
      <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent via-gold to-gold" />
    </div>
  );
}

// Floating flower petals and gold bokeh dust particles
const PETAL_CONFIGS = [
  { left: "4%", delay: 0, duration: 16, size: 14 },
  { left: "14%", delay: 3.5, duration: 19, size: 12 },
  { left: "26%", delay: 7.2, duration: 15, size: 16 },
  { left: "38%", delay: 1.8, duration: 21, size: 11 },
  { left: "52%", delay: 5.5, duration: 17, size: 15 },
  { left: "67%", delay: 9.1, duration: 18, size: 13 },
  { left: "81%", delay: 2.4, duration: 20, size: 14 },
  { left: "92%", delay: 6.8, duration: 16, size: 12 },
];

const GOLD_DUST = [
  { left: "10%", top: "15%", delay: 0, duration: 3.5, size: 4 },
  { left: "22%", top: "45%", delay: 1.2, duration: 4.2, size: 3 },
  { left: "35%", top: "25%", delay: 2.1, duration: 3.8, size: 5 },
  { left: "48%", top: "75%", delay: 0.6, duration: 4.5, size: 3 },
  { left: "63%", top: "35%", delay: 1.8, duration: 3.6, size: 4 },
  { left: "78%", top: "60%", delay: 2.7, duration: 4.1, size: 3 },
  { left: "89%", top: "20%", delay: 0.9, duration: 3.9, size: 4 },
];

export function FloatingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Petals */}
      {PETAL_CONFIGS.map((p, i) => (
        <span
          key={`petal-${i}`}
          className="petal shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
          }}
        />
      ))}

      {/* Sparkling gold bokeh dust */}
      {GOLD_DUST.map((d, i) => (
        <motion.span
          key={`dust-${i}`}
          className="absolute rounded-full bg-gold/70 shadow-[0_0_10px_#D4AF37]"
          style={{
            left: d.left,
            top: d.top,
            width: `${d.size}px`,
            height: `${d.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.4, 0.8],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
