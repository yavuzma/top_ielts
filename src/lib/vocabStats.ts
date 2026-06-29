// Derive review stats from study state + the vocabulary content.
import { VOCAB, type VocabCard } from "@/data/content";
import type { StudyState } from "@/store/types";
import { isDue, isMature, today, type SrsCard } from "@/lib/srs";

export interface DeckCard extends VocabCard {
  key: string;
  list: string;
  srs?: SrsCard;
}

export interface VocabStats {
  total: number;
  seen: number; // cards that have an SRS entry
  newCount: number; // never studied
  dueCount: number; // due today (excludes brand-new)
  learning: number; // seen but interval < 21d
  mature: number; // interval >= 21d
  retention: number; // % of reviewed reps that weren't lapses (rough)
}

export function keyFor(list: string, word: string) {
  return `${list}::${word}`;
}

export function allCards(state: StudyState): DeckCard[] {
  const out: DeckCard[] = [];
  for (const list of Object.keys(VOCAB)) {
    for (const c of VOCAB[list]) {
      const key = keyFor(list, c.w);
      out.push({ ...c, key, list, srs: state.srs[key] });
    }
  }
  return out;
}

// Cards to study now: due reviews first, then a capped number of new cards.
// Pass a list name to restrict to that list (so new cards come from it too).
export function dueDeck(state: StudyState, list?: string, newPerSession = 12): DeckCard[] {
  const on = today();
  const cards = allCards(state).filter((c) => !list || c.list === list);
  const due = cards.filter((c) => c.srs && isDue(c.srs, on));
  const fresh = cards.filter((c) => !c.srs).slice(0, newPerSession);
  return [...due, ...fresh];
}

export function computeStats(state: StudyState): VocabStats {
  const cards = allCards(state);
  const on = today();
  let seen = 0,
    dueCount = 0,
    learning = 0,
    mature = 0,
    reps = 0,
    lapses = 0;
  for (const c of cards) {
    const s = c.srs;
    if (!s) continue;
    seen++;
    reps += s.reps + s.lapses;
    lapses += s.lapses;
    if (isMature(s)) mature++;
    else learning++;
    if (isDue(s, on)) dueCount++;
  }
  return {
    total: cards.length,
    seen,
    newCount: cards.length - seen,
    dueCount,
    learning,
    mature,
    retention: reps ? Math.round(((reps - lapses) / reps) * 100) : 0,
  };
}
