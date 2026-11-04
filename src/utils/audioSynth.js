// Pure Web Audio API ambient chime generator for wedding mood.
// Zero network dependencies, works offline and on all modern browsers.

let audioCtx = null;
let isPlaying = false;
let intervalId = null;

const CHORD_NOTES = [
  // Gentle pentatonic harp notes (Hz)
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.0,  // G4
  440.0,  // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
];

export function startAmbientSound() {
  if (isPlaying) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isPlaying = true;

    // Play a gentle sequence of chime notes
    let step = 0;
    const playNextChime = () => {
      if (!isPlaying || !audioCtx) return;

      const note = CHORD_NOTES[step % CHORD_NOTES.length];
      playChimeNote(note, 0.08);

      step++;
      // Random gentle timing between 1.2s and 2.5s for natural zen harp feel
      const nextDelay = 1200 + Math.random() * 1200;
      intervalId = setTimeout(playNextChime, nextDelay);
    };

    playNextChime();
  } catch (err) {
    console.warn("Web Audio not supported or blocked", err);
  }
}

function playChimeNote(freq, peakGain = 0.08) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Warm chime: sine mixed with gentle harmonic
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.00001, now + 2.8);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 3.0);
}

export function stopAmbientSound() {
  isPlaying = false;
  if (intervalId) {
    clearTimeout(intervalId);
    intervalId = null;
  }
}

export function isAmbientPlaying() {
  return isPlaying;
}

