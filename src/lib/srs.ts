// =====================================================================
//  Spaced-repetition engine (SM-2 inspired, day-based)
//  One card = one vocabulary word. Beats the forgetting curve by
//  showing each word again right before you'd forget it.
// =====================================================================

export type Grade = "again" | "hard" | "good" | "easy";

export interface SrsCard {
  ease: number; // ease factor (how fast intervals grow), starts 2.5
  interval: number; // current interval in days
  due: string; // next review date, YYYY-MM-DD
  reps: number; // consecutive successful reviews
  lapses: number; // how many times forgotten
  last: string; // last reviewed date (used for safe sync merge)
}

const DAY = 86400000;
const iso = (d: number) => new Date(d).toISOString().slice(0, 10);
export const today = () => iso(Date.now());
const addDays = (base: string, days: number) =>
  iso(new Date(base + "T00:00:00").getTime() + Math.round(days) * DAY);

export function newCard(): SrsCard {
  return { ease: 2.5, interval: 0, due: today(), reps: 0, lapses: 0, last: "" };
}

export function isDue(card: SrsCard | undefined, on = today()): boolean {
  if (!card) return true; // never studied -> available now
  return card.due <= on;
}

// Has the word graduated out of the "learning" phase into long-term memory?
export function isMature(card: SrsCard): boolean {
  return card.interval >= 21;
}

// Apply a grade and return the next scheduling state.
export function schedule(prev: SrsCard, grade: Grade): SrsCard {
  let { ease, interval, reps, lapses } = prev;
  const day = today();

  switch (grade) {
    case "again":
      ease = Math.max(1.3, ease - 0.2);
      lapses += 1;
      reps = 0;
      interval = 0; // re-appears in the same session, due today
      break;
    case "hard":
      ease = Math.max(1.3, ease - 0.15);
      reps += 1;
      interval = reps <= 1 ? 1 : Math.max(1, interval * 1.2);
      break;
    case "good":
      reps += 1;
      if (reps === 1) interval = 1;
      else if (reps === 2) interval = 3;
      else interval = interval * ease;
      break;
    case "easy":
      ease += 0.15;
      reps += 1;
      if (reps === 1) interval = 4;
      else interval = interval * ease * 1.3;
      break;
  }

  interval = Math.min(interval, 365); // cap at a year
  return {
    ease: Math.round(ease * 100) / 100,
    interval: Math.round(interval * 10) / 10,
    due: interval === 0 ? day : addDays(day, interval),
    reps,
    lapses,
    last: day,
  };
}

// Human-friendly preview of when each grade sends the card next.
export function previewIntervals(prev: SrsCard): Record<Grade, string> {
  const fmt = (c: SrsCard) => {
    if (c.interval === 0) return "<10m";
    if (c.interval < 1) return "1d";
    if (c.interval < 30) return `${Math.round(c.interval)}d`;
    if (c.interval < 365) return `${Math.round(c.interval / 30)}mo`;
    return `${(c.interval / 365).toFixed(1)}y`;
  };
  return {
    again: fmt(schedule(prev, "again")),
    hard: fmt(schedule(prev, "hard")),
    good: fmt(schedule(prev, "good")),
    easy: fmt(schedule(prev, "easy")),
  };
}
