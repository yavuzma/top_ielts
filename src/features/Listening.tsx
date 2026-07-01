import { useEffect, useRef, useState } from "react";
import { ExternalLink, Wand2, KeyRound, Sparkles, Loader2, Play, Square, Eye } from "lucide-react";
import { LISTENING } from "@/data/content";
import { useStudy, todayStr } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ApiKeyForm from "@/components/ApiKeyForm";
import { hasKey } from "@/lib/openai";
import { generateListening, type GenListening } from "@/lib/generate";
import { speak, ttsSupported, type Speaker } from "@/lib/tts";
import type { Level } from "@/data/content";

export default function Listening() {
  const { state, markListening } = useStudy();
  const items = LISTENING.filter((l) => l.level === state.level);
  const doneN = items.filter((l) => state.listening[l.id]).length;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <h2 className="font-semibold">Listening — {state.level}</h2>
            <p className="text-sm text-muted-foreground">
              AI-generated practice you can play aloud, plus free real-world sources.
            </p>
          </div>
          <Badge variant="secondary">{doneN} / {items.length} done</Badge>
        </CardContent>
      </Card>

      <ListeningGenerator level={state.level} />

      {items.map((l) => {
        const last = state.listening[l.id];
        const doneToday = last === todayStr();
        return (
          <Card key={l.id}>
            <details>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{l.title}</span>
                    <Badge variant="outline">{l.level}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {l.topic} · ~{l.mins} min · {l.source}
                    {last ? ` · last: ${last}` : ""}
                  </p>
                </div>
                {last && <Badge variant="success">✓</Badge>}
              </summary>
              <CardContent className="space-y-4 pt-0">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border bg-secondary/40 p-3 text-sm font-medium text-primary hover:border-primary/50"
                >
                  <ExternalLink className="size-4" /> Open source — {l.source}
                </a>

                <Steps title="1) Before listening" items={l.before} />
                <Steps title="2) While listening" items={l.during} />
                <Steps title="3) After listening" items={l.after} />

                <div className="flex justify-end">
                  <Button
                    variant="success"
                    disabled={doneToday}
                    onClick={() => markListening(l.id)}
                  >
                    {doneToday ? "Listened today ✓" : "Mark as listened today ✓"}
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

function Steps({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-1 text-sm font-semibold">{title}</div>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

// --- AI listening generator (with text-to-speech playback) --------------
const SECTIONS = [1, 2, 3, 4] as const;

function ListeningGenerator({ level }: { level: Level }) {
  const [keyReady, setKeyReady] = useState(hasKey());
  const [section, setSection] = useState<1 | 2 | 3 | 4>(1);
  const [topic, setTopic] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [test, setTest] = useState<GenListening | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playing, setPlaying] = useState(false);
  const speakerRef = useRef<Speaker | null>(null);

  // Stop any narration when the component unmounts.
  useEffect(() => () => speakerRef.current?.stop(), []);

  async function run() {
    speakerRef.current?.stop();
    setPlaying(false);
    setBusy(true);
    setError("");
    setShowTranscript(false);
    try {
      const t = await generateListening(level, section, topic);
      setTest(t);
    } catch (e) {
      setError((e as Error).message || "Generation failed.");
    } finally {
      setBusy(false);
    }
  }

  function play() {
    if (!test) return;
    setPlaying(true);
    speakerRef.current = speak(test.transcript.replace(/^[A-Z][a-z]*:/gm, ""), () => setPlaying(false));
  }
  function stop() {
    speakerRef.current?.stop();
    setPlaying(false);
  }

  return (
    <Card className="border-primary/30 bg-primary/[0.03]">
      <CardContent className="space-y-3 py-4">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary">
            <Wand2 className="size-4" />
          </span>
          <div>
            <div className="text-sm font-semibold">AI listening generator</div>
            <div className="text-xs text-muted-foreground">
              Original {level} transcript played aloud + IELTS questions.
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
            <div className="flex overflow-hidden rounded-lg border">
              {SECTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSection(s)}
                  disabled={busy}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    section === s ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                  title={`Section ${s}`}
                >
                  S{s}
                </button>
              ))}
            </div>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Optional topic…"
              className="h-10 max-w-[12rem] flex-1"
              disabled={busy}
              onKeyDown={(e) => e.key === "Enter" && !busy && void run()}
            />
            <Button onClick={() => void run()} disabled={busy}>
              {busy ? (
                <><Loader2 className="size-4 animate-spin" /> Writing…</>
              ) : (
                <><Sparkles className="size-4" /> Generate</>
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
          <div className="space-y-4 rounded-lg border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{test.title}</span>
              <Badge variant="outline">{test.level}</Badge>
              <Badge variant="secondary">Section {test.section}</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {ttsSupported() ? (
                playing ? (
                  <Button variant="outline" size="sm" onClick={stop}>
                    <Square className="size-4" /> Stop audio
                  </Button>
                ) : (
                  <Button size="sm" onClick={play}>
                    <Play className="size-4" /> Play audio
                  </Button>
                )
              ) : (
                <span className="text-xs text-muted-foreground">Audio playback not supported on this browser.</span>
              )}
              <Button variant="ghost" size="sm" onClick={() => setShowTranscript((v) => !v)}>
                <Eye className="size-4" /> {showTranscript ? "Hide" : "Show"} transcript
              </Button>
            </div>

            {showTranscript && (
              <div className="whitespace-pre-wrap rounded-lg border bg-secondary/30 p-4 text-sm leading-relaxed">
                {test.transcript}
              </div>
            )}

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
              <summary className="cursor-pointer text-sm font-medium text-primary">Show answer key</summary>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm">
                {test.questions.map((q, i) => (
                  <li key={i}>
                    <span className="font-medium text-success">{q.a}</span>
                    {q.why && <span className="text-muted-foreground"> — {q.why}</span>}
                  </li>
                ))}
              </ol>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
