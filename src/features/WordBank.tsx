import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, Volume2, Loader2, KeyRound, ArrowLeft, Library } from "lucide-react";
import { WORDS, BANK_KEY, CEFR_ORDER, LEVEL_COUNTS, decksForLevel, type Cefr } from "@/data/words10k";
import { useStudy } from "@/store/store";
import { newCard, previewIntervals, isDue, type Grade } from "@/lib/srs";
import { defineWord } from "@/lib/generate";
import { hasKey } from "@/lib/openai";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ApiKeyForm from "@/components/ApiKeyForm";

const bankKey = (w: string) => `${BANK_KEY}::${w}`;

const GRADES: { g: Grade; label: string; cls: string }[] = [
  { g: "again", label: "Again", cls: "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/25" },
  { g: "hard", label: "Hard", cls: "bg-warning/15 text-warning border-warning/30 hover:bg-warning/25" },
  { g: "good", label: "Good", cls: "bg-primary/15 text-primary border-primary/30 hover:bg-primary/25" },
  { g: "easy", label: "Easy", cls: "bg-success/15 text-success border-success/30 hover:bg-success/25" },
];

function speak(word: string) {
  try {
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-GB";
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* not supported */
  }
}

export default function WordBank() {
  const { state } = useStudy();
  const [cefr, setCefr] = useState<Cefr>("C1");
  const [queue, setQueue] = useState<string[] | null>(null);

  const { learned, due } = useMemo(() => {
    let learned = 0;
    let due = 0;
    for (const k in state.srs) {
      if (!k.startsWith(BANK_KEY + "::")) continue;
      learned++;
      if (isDue(state.srs[k])) due++;
    }
    return { learned, due };
  }, [state.srs]);

  if (queue) return <Session words={queue} onExit={() => setQueue(null)} />;

  function startDue() {
    const words = Object.keys(state.srs)
      .filter((k) => k.startsWith(BANK_KEY + "::") && isDue(state.srs[k]))
      .map((k) => k.slice(BANK_KEY.length + 2));
    if (words.length) setQueue(words.slice(0, 40));
  }

  function startDeck(words: string[]) {
    const dueW = words.filter((w) => state.srs[bankKey(w)] && isDue(state.srs[bankKey(w)]));
    const newW = words.filter((w) => !state.srs[bankKey(w)]);
    const q = [...dueW, ...newW];
    setQueue((q.length ? q : words).slice(0, 25));
  }

  const decks = decksForLevel(cefr);

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-semibold">
              <Library className="size-5 text-primary" /> Word Bank — Oxford {WORDS.length.toLocaleString()} (CEFR A1–C1)
            </h2>
            <p className="text-sm text-muted-foreground">
              Real Oxford 3000/5000 words at their true CEFR level. Definitions are written by AI on
              first study and locked in with spaced repetition.
            </p>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{learned.toLocaleString()}</div>
              <div className="text-[11px] text-muted-foreground">learned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{due}</div>
              <div className="text-[11px] text-muted-foreground">due</div>
            </div>
          </div>
        </div>
        {due > 0 && (
          <Button className="mt-4" onClick={startDue}>
            <Sparkles className="size-4" /> Review {due} due {due === 1 ? "word" : "words"}
          </Button>
        )}
      </Card>

      {/* CEFR level selector */}
      <div className="flex flex-wrap gap-2">
        {CEFR_ORDER.map((c) => (
          <button
            key={c}
            onClick={() => setCefr(c)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              cefr === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary/50"
            }`}
          >
            {c} <span className="opacity-70">· {LEVEL_COUNTS[c]}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {decks.map((d) => {
          const done = d.words.filter((w) => state.srs[bankKey(w)]).length;
          return (
            <button
              key={d.index}
              onClick={() => startDeck(d.words)}
              className="rounded-xl border bg-card/60 p-3 text-left transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Deck {d.index + 1}</span>
                <Badge variant="outline">{d.cefr}</Badge>
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{d.words.length} words</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-primary" style={{ width: `${(done / d.words.length) * 100}%` }} />
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">{done}/{d.words.length} learned</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Review session ------------------------------------------------------
function Session({ words, onExit }: { words: string[]; onExit: () => void }) {
  const { state, reviewVocab, setWordDef } = useStudy();
  const [queue, setQueue] = useState(words);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [keyReady, setKeyReady] = useState(hasKey());

  const word = queue[0];
  const preview = useMemo(
    () => previewIntervals(word ? state.srs[bankKey(word)] ?? newCard() : newCard()),
    [word, state.srs],
  );

  function grade(g: Grade) {
    if (!word) return;
    reviewVocab(bankKey(word), g);
    setReviewed((n) => n + 1);
    setFlipped(false);
    setQueue((q) => {
      const [head, ...rest] = q;
      return g === "again" ? [...rest.slice(0, 3), head, ...rest.slice(3)] : rest;
    });
  }

  if (!word) {
    return (
      <Card className="grid min-h-64 place-items-center p-8 text-center">
        <div>
          <div className="text-5xl">🎉</div>
          <div className="mt-3 text-2xl font-bold">Session complete!</div>
          <p className="mt-2 text-sm text-muted-foreground">
            You reviewed {reviewed} {reviewed === 1 ? "word" : "words"}. They'll resurface right before
            you'd forget them.
          </p>
          <Button className="mt-4" onClick={onExit}>
            <ArrowLeft className="size-4" /> Back to decks
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onExit}>
          <ArrowLeft className="size-4" /> Decks
        </Button>
        <span className="text-sm text-muted-foreground">{queue.length} left · {reviewed} done</span>
      </div>

      <Card className="min-h-64 p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="text-4xl font-bold text-primary">{word}</div>
            <button
              onClick={() => speak(word)}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title="Hear pronunciation"
            >
              <Volume2 className="size-5" />
            </button>
          </div>

          {!flipped ? (
            <Button className="mt-6" size="lg" onClick={() => setFlipped(true)}>
              <Sparkles className="size-4" /> Reveal meaning
            </Button>
          ) : (
            <Definition
              word={word}
              cached={state.wordDefs[word]}
              keyReady={keyReady}
              onKey={() => setKeyReady(true)}
              onDefined={(def) => setWordDef(word, def)}
            />
          )}
        </div>
      </Card>

      {flipped && (
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
      )}
    </div>
  );
}

function Definition({
  word,
  cached,
  keyReady,
  onKey,
  onDefined,
}: {
  word: string;
  cached?: { d: string; e: string };
  keyReady: boolean;
  onKey: () => void;
  onDefined: (def: { d: string; e: string }) => void;
}) {
  const [def, setDef] = useState(cached);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fetchedFor = useRef<string>("");

  useEffect(() => {
    setDef(cached);
    setErr("");
  }, [word, cached]);

  useEffect(() => {
    if (def || !keyReady || busy || fetchedFor.current === word) return;
    fetchedFor.current = word;
    setBusy(true);
    defineWord(word)
      .then((d) => {
        setDef(d);
        onDefined(d);
      })
      .catch((e) => setErr((e as Error).message || "Could not fetch definition."))
      .finally(() => setBusy(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, keyReady, def]);

  if (!keyReady) {
    return (
      <div className="mt-4 space-y-2 text-left">
        <div className="flex items-center gap-2 text-sm font-medium">
          <KeyRound className="size-4 text-primary" /> Connect your AI to auto-define words
        </div>
        <ApiKeyForm onSaved={onKey} />
      </div>
    );
  }

  if (busy) {
    return (
      <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Writing a definition…
      </div>
    );
  }
  if (err) return <p className="mt-6 text-sm text-destructive">{err}</p>;
  if (!def) return null;

  return (
    <div className="mt-5">
      <div className="text-xl font-semibold">{def.d}</div>
      <p className="mt-3 text-sm italic text-muted-foreground">"{def.e}"</p>
    </div>
  );
}
