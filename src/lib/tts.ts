// =====================================================================
//  Browser text-to-speech (Web Speech API). Used to "play" generated
//  listening transcripts aloud — no audio files, no cost, works offline.
// =====================================================================

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// Prefer a natural English voice when the OS offers one.
function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => /en(-|_)?GB/i.test(v.lang) && /natural|google|premium/i.test(v.name)) ||
    voices.find((v) => /en(-|_)?GB/i.test(v.lang)) ||
    voices.find((v) => /^en/i.test(v.lang)) ||
    voices[0]
  );
}

export interface Speaker {
  stop: () => void;
}

// Speak text; onDone fires when finished or stopped. Rate ~0.95 mimics an
// exam recording pace.
export function speak(text: string, onDone?: () => void, rate = 0.95): Speaker {
  if (!ttsSupported()) {
    onDone?.();
    return { stop: () => {} };
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if (v) u.voice = v;
  u.lang = v?.lang || "en-GB";
  u.rate = rate;
  u.onend = () => onDone?.();
  u.onerror = () => onDone?.();
  synth.speak(u);
  return {
    stop: () => {
      synth.cancel();
      onDone?.();
    },
  };
}
