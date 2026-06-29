import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, Volume2, RotateCcw } from "lucide-react";
import { VOCAB } from "@/data/content";
import { useStudy } from "@/store/store";
import { newCard, previewIntervals, type Grade } from "@/lib/srs";
import { dueDeck, computeStats, type DeckCard } from "@/lib/vocabStats";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LISTS = ["All lists", ...Object.keys(VOCAB)];

const GRADES: { g: Grade; label: string; key: string; cls: string }[] = [
  { g: "again", label: "Again", key: "1", cls: "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/25" },
  { g: "hard", label: "Hard", key: "2", cls: "bg-warning/15 text-warning border-warning/30 hover:bg-warning/25" },
  { g: "good", label: "Good", key: "3", cls: "bg-primary/15 text-primary border-primary/30 hover:bg-primary/25" },
  { g: "easy", label: "Easy", key: "4", cls: "bg-success/15 text-success border-success/30 hover:bg-success/25" },
];

function speak(word: string) {
  try {
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-GB";
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* speech not supported */
  }
}

export default function Vocab() {
  const { state, reviewVocab } = useStudy();
  const [listFilter, setListFilter] = useState(LISTS[0]);
  const [flipped, setFlipped] = useState(false);
  // Local session queue so "Again" can re-queue a card without instant reshuffle.
  const [queue, setQueue] = useState<DeckCard[]>([]);
  const [reviewed, setReviewed] = useState(0);

  const stats = useMemo(() => computeStats(state), [state]);
  const active = useRef(false); // a review is in progress → freeze the deck

  const build = useCallback(
    () => dueDeck(state, listFilter === "All lists" ? undefined : listFilter),
    [state, listFilter],
  );

  // Changing the list starts a fresh session.
  useEffect(() => {
    active.current = false;
    setReviewed(0);
  }, [listFilter]);

  // While idle, keep the deck in sync with the data (and late cloud loads).
  // Once the user grades a card, the deck is frozen so it plays out smoothly.
  useEffect(() => {
    if (!active.current) {
      setQueue(build());
      setFlipped(false);
    }
  }, [build]);

  const card = queue[0];
  const preview = useMemo(
    () => previewIntervals(card ? state.srs[card.key] ?? newCard() : newCard()),
    [card, state.srs],
  );

  function grade(g: Grade) {
    if (!card) return;
    active.current = true;
    reviewVocab(card.key, g);
    setReviewed((n) => n + 1);
    setFlipped(false);
    setQueue((q) => {
      const [head, ...rest] = q;
      // "Again" → keep the card in this session, a few slots back.
      const nextQ = g === "again" ? [...rest.slice(0, 3), head, ...rest.slice(3)] : rest;
      if (nextQ.length === 0) active.current = false; // session done → idle again
      return nextQ;
    });
  }

  // Keyboard shortcuts: space flips, 1-4 grade.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!card) return;
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped) {
        const hit = GRADES.find((x) => x.key === e.key);
        if (hit) grade(hit.g);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, flipped]);

  return (
    <div className="mx-auto max-w-xl space-y-5">
      {/* Stat strip */}
      <div className="grid grid-cols-4 gap-2">
        <Stat label="Due" value={stats.dueCount} tone="text-primary" />
        <Stat label="New" value={stats.newCount} tone="text-foreground" />
        <Stat label="Mature" value={stats.mature} tone="text-success" />
        <Stat label="Retention" value={`${stats.retention}%`} tone="text-warning" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <Select value={listFilter} onValueChange={setListFilter}>
          <SelectTrigger className="w-auto min-w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LISTS.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {queue.length} left · {reviewed} done
        </span>
      </div>

      {!card ? (
        <Card className="grid min-h-64 place-items-center p-8 text-center">
          <div>
            <div className="text-5xl">🎉</div>
            <div className="mt-3 text-2xl font-bold">All caught up!</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {reviewed > 0
                ? `You reviewed ${reviewed} ${reviewed === 1 ? "word" : "words"}. Come back tomorrow — the schedule will resurface words right before you'd forget them.`
                : "No words are due in this list right now. Switch lists or check back later."}
            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* 3D flip card */}
          <div className="[perspective:1400px]">
            <div
              className={`relative min-h-64 cursor-pointer transition-transform duration-500 [transform-style:preserve-3d] ${
                flipped ? "[transform:rotateY(180deg)]" : ""
              }`}
              onClick={() => setFlipped((f) => !f)}
            >
              {/* Front */}
              <Card className="absolute inset-0 grid place-items-center p-8 text-center [backface-visibility:hidden]">
                <div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    {card.list}
                  </span>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <div className="text-4xl font-bold text-primary">{card.w}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(card.w);
                      }}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      title="Hear pronunciation"
                    >
                      <Volume2 className="size-5" />
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">Tap or press Space to flip</p>
                </div>
              </Card>
              {/* Back */}
              <Card className="absolute inset-0 grid place-items-center bg-accent/30 p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div>
                  <div className="text-xl font-semibold">{card.d}</div>
                  <p className="mt-4 text-sm italic text-muted-foreground">"{card.e}"</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Grading */}
          {flipped ? (
            <div className="grid grid-cols-4 gap-2">
              {GRADES.map((b) => (
                <button
                  key={b.g}
                  onClick={() => grade(b.g)}
                  className={`flex flex-col items-center rounded-xl border py-2.5 text-sm font-semibold transition-colors ${b.cls}`}
                >
                  {b.label}
                  <span className="mt-0.5 text-[11px] font-normal opacity-80">{preview[b.g]}</span>
                </button>
              ))}
            </div>
          ) : (
            <Button className="w-full" size="lg" onClick={() => setFlipped(true)}>
              <Sparkles className="size-4" /> Reveal answer
            </Button>
          )}

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <RotateCcw className="size-3" />
            Grade honestly — the algorithm picks the perfect moment to remind you.
          </p>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number | string; tone: string }) {
  return (
    <div className="rounded-xl border bg-card/60 p-3 text-center">
      <div className={`text-2xl font-bold ${tone}`}>{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
