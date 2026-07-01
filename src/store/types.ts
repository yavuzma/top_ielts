import type { Level } from "@/data/content";
import type { SrsCard } from "@/lib/srs";

export interface EssayEntry {
  id: string;
  date: string;
  type: string;
  topic: string;
  q: string;
  text: string;
  words: number;
}

export interface StreakState {
  count: number;
  last: string | null;
}

// A saved AI-generated practice item (reading passage or listening test).
// `payload` holds the full GenReading / GenListening object.
export interface LibItem {
  id: string;
  kind: "reading" | "listening";
  level: Level;
  title: string;
  createdAt: number;
  payload: unknown;
}

// Keep the synced document small: cap how many generated items we retain.
export const LIBRARY_CAP = 40;

export interface StudyState {
  level: Level;
  tasks: Record<string, boolean>;
  grammar: Record<string, boolean>;
  vocab: Record<string, "known">; // legacy "I know it" marks (kept for back-compat)
  srs: Record<string, SrsCard>; // spaced-repetition scheduling per word
  essays: Record<string, EssayEntry>;
  reading: Record<string, string>; // id -> son tarih (YYYY-MM-DD)
  listening: Record<string, string>;
  library: Record<string, LibItem>; // saved AI-generated practice
  bands: Record<string, string>;
  streak: StreakState;
  essayStreak: StreakState;
  examDate: string | null;
  updatedAt: number;
}

export function emptyState(): StudyState {
  return {
    level: "B1",
    tasks: {},
    grammar: {},
    vocab: {},
    srs: {},
    essays: {},
    reading: {},
    listening: {},
    library: {},
    bands: {},
    streak: { count: 0, last: null },
    essayStreak: { count: 0, last: null },
    examDate: null,
    updatedAt: 0,
  };
}

// Safely merge two states — completed items are preserved, no data loss.
export function mergeStates(local: StudyState, remote: Partial<StudyState>): StudyState {
  const out: StudyState = { ...local };
  out.tasks = { ...local.tasks };
  out.grammar = { ...local.grammar };
  out.vocab = { ...local.vocab };
  out.srs = { ...local.srs };
  out.essays = { ...local.essays };
  out.reading = { ...local.reading };
  out.listening = { ...local.listening };
  out.library = { ...local.library };

  for (const k in remote.tasks) if (remote.tasks[k]) out.tasks[k] = true;
  for (const k in remote.grammar) if (remote.grammar[k]) out.grammar[k] = true;
  for (const k in remote.vocab) out.vocab[k] = remote.vocab[k]!;
  // SRS: the card reviewed most recently wins (latest `last` date)
  for (const k in remote.srs) {
    const r = remote.srs[k]!;
    const l = out.srs[k];
    if (!l || (r.last || "") >= (l.last || "")) out.srs[k] = r;
  }
  for (const id in remote.essays) {
    const r = remote.essays[id]!;
    const l = local.essays[id];
    if (!l || (r.text || "").length >= (l.text || "").length) out.essays[id] = r;
  }
  for (const id in remote.reading)
    if (!out.reading[id] || remote.reading[id]! > out.reading[id]) out.reading[id] = remote.reading[id]!;
  for (const id in remote.listening)
    if (!out.listening[id] || remote.listening[id]! > out.listening[id]) out.listening[id] = remote.listening[id]!;

  // Library: union by id, keep the newest, then cap to the most recent items.
  for (const id in remote.library) if (!out.library[id]) out.library[id] = remote.library[id]!;
  const kept = Object.values(out.library)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, LIBRARY_CAP);
  out.library = Object.fromEntries(kept.map((i) => [i.id, i]));

  out.bands = { ...local.bands, ...remote.bands };
  if ((remote.streak?.count || 0) > local.streak.count) out.streak = remote.streak!;
  if ((remote.essayStreak?.count || 0) > local.essayStreak.count) out.essayStreak = remote.essayStreak!;
  if (remote.examDate) out.examDate = remote.examDate;
  if (remote.level) out.level = remote.level;
  out.updatedAt = Math.max(local.updatedAt, remote.updatedAt || 0);
  return out;
}
