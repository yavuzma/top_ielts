import { useState } from "react";
import { Sparkles, Loader2, KeyRound, Wand2, Bookmark, BookmarkCheck, Trash2 } from "lucide-react";
import { READING } from "@/data/content";
import { useStudy, todayStr } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import CopyButton from "@/components/CopyButton";
import ApiKeyForm from "@/components/ApiKeyForm";
import { hasKey } from "@/lib/openai";
import { generateReading, type GenReading } from "@/lib/generate";

export default function Reading() {
  const { state, markReading } = useStudy();
  const items = READING.filter((r) => r.level === state.level);
  const doneN = items.filter((r) => state.reading[r.id]).length;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <h2 className="font-semibold">Reading — {state.level}</h2>
            <p className="text-sm text-muted-foreground">
              Generate a fresh exam-quality passage, or work through the library below.
            </p>
          </div>
          <Badge variant="secondary">{doneN} / {items.length} read</Badge>
        </CardContent>
      </Card>

      <Generator level={state.level} />

      {items.map((r) => {
        const last = state.reading[r.id];
        const doneToday = last === todayStr();
        const prompt = `Act as an IELTS examiner. Check my answers to the questions for the passage "${r.title}", explain what is right or wrong, and complete what I missed.\n\nMy answers:\n`;
        return (
          <Card key={r.id}>
            <details>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{r.title}</span>
                    <Badge variant="outline">{r.level}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {r.topic} · ~{r.words} words{last ? ` · last: ${last}` : ""}
                  </p>
                </div>
                {last && <Badge variant="success">✓</Badge>}
              </summary>
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-3 rounded-lg border bg-secondary/30 p-4 leading-relaxed">
                  {r.text.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div>
                  <h3 className="mb-1 font-semibold">Questions</h3>
                  <ol className="list-decimal space-y-1.5 pl-5 text-sm">
                    {r.questions.map((q, i) => (
                      <li key={i}>{q.q}</li>
                    ))}
                  </ol>
                </div>

                <details className="rounded-lg border bg-secondary/30 p-3">
                  <summary className="cursor-pointer text-sm font-medium text-primary">
                    Show answer key
                  </summary>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-success">
                    {r.questions.map((q, i) => (
                      <li key={i}>{q.a}</li>
                    ))}
                  </ol>
                </details>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CopyButton text={prompt} label="Check my answers with Claude" />
                  <Button
                    variant="success"
                    disabled={doneToday}
                    onClick={() => markReading(r.id)}
                  >
                    {doneToday ? "Read today ✓" : "Mark as read today ✓"}
                  </Button>
                </div>
              </CardContent>
            </details>
          </Card>
        );
      })}
    </div>
  );
}

// --- AI passage generator ------------------------------------------------
function Generator({ level }: { level: "B1" | "B2" | "C1" }) {
  const { state, saveToLibrary, deleteFromLibrary } = useStudy();
  const [keyReady, setKeyReady] = useState(hasKey());
  const [topic, setTopic] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [test, setTest] = useState<GenReading | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const saved = Object.values(state.library)
    .filter((i) => i.kind === "reading")
    .sort((a, b) => b.createdAt - a.createdAt);

  async function run() {
    setBusy(true);
    setError("");
    setSavedId(null);
    try {
      const r = await generateReading(level, topic);
      setTest(r);
    } catch (e) {
      setError((e as Error).message || "Generation failed.");
    } finally {
      setBusy(false);
    }
  }

  function save() {
    if (!test || savedId) return;
    const id = saveToLibrary({ kind: "reading", level: test.level, title: test.title, payload: test });
    setSavedId(id);
  }

  return (
    <Card className="border-primary/30 bg-primary/[0.03]">
      <CardContent className="space-y-3 py-4">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary">
            <Wand2 className="size-4" />
          </span>
          <div>
            <div className="text-sm font-semibold">AI reading generator</div>
            <div className="text-xs text-muted-foreground">
              Original {level} passage + IELTS questions, made to exam standard.
            </div>
          </div>
        </div>

        {!keyReady ? (
          <div className="space-y-2 rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <KeyRound className="size-4 text-primary" /> Connect your AI to generate practice
            </div>
            <ApiKeyForm onSaved={() => setKeyReady(true)} />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Optional topic (e.g. volcanoes, remote work)…"
              className="h-10 max-w-xs flex-1"
              disabled={busy}
              onKeyDown={(e) => e.key === "Enter" && !busy && void run()}
            />
            <Button onClick={() => void run()} disabled={busy}>
              {busy ? (
                <><Loader2 className="size-4 animate-spin" /> Writing…</>
              ) : (
                <><Sparkles className="size-4" /> Generate passage</>
              )}
            </Button>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {test && (
          <GeneratedTest
            test={test}
            onRegenerate={() => void run()}
            busy={busy}
            saved={!!savedId}
            onSave={save}
          />
        )}

        {saved.length > 0 && (
          <div className="space-y-1">
            <div className="text-xs font-semibold text-muted-foreground">Saved passages ({saved.length})</div>
            {saved.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm"
              >
                <button
                  className="flex-1 text-left hover:text-primary"
                  onClick={() => {
                    setTest(it.payload as GenReading);
                    setSavedId(it.id);
                  }}
                >
                  <span className="font-medium">{it.title}</span>{" "}
                  <span className="text-muted-foreground">· {it.level}</span>
                </button>
                <button
                  className="text-muted-foreground hover:text-destructive"
                  title="Delete"
                  onClick={() => {
                    deleteFromLibrary(it.id);
                    if (savedId === it.id) setSavedId(null);
                  }}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GeneratedTest({
  test,
  onRegenerate,
  busy,
  saved,
  onSave,
}: {
  test: GenReading;
  onRegenerate: () => void;
  busy: boolean;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{test.title}</span>
        <Badge variant="outline">{test.level}</Badge>
        <Badge variant="secondary">~{test.words} words</Badge>
      </div>

      <div className="space-y-3 rounded-lg border bg-secondary/30 p-4 leading-relaxed">
        {test.text.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div>
        <h3 className="mb-1 font-semibold">Questions</h3>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm">
          {test.questions.map((q, i) => (
            <li key={i}>
              <span className="mr-1 rounded bg-secondary px-1 text-[11px] font-medium text-muted-foreground">
                {q.type}
              </span>
              {q.q}
            </li>
          ))}
        </ol>
      </div>

      <details className="rounded-lg border bg-secondary/30 p-3">
        <summary className="cursor-pointer text-sm font-medium text-primary">Show answer key & explanations</summary>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm">
          {test.questions.map((q, i) => (
            <li key={i}>
              <span className="font-medium text-success">{q.a}</span>
              {q.why && <span className="text-muted-foreground"> — {q.why}</span>}
            </li>
          ))}
        </ol>
      </details>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onRegenerate} disabled={busy}>
          <Sparkles className="size-4" /> Generate another
        </Button>
        <Button variant={saved ? "ghost" : "success"} size="sm" onClick={onSave} disabled={saved}>
          {saved ? <><BookmarkCheck className="size-4" /> Saved</> : <><Bookmark className="size-4" /> Save to library</>}
        </Button>
      </div>
    </div>
  );
}
