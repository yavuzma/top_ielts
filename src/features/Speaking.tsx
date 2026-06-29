import { useEffect, useRef, useState } from "react";
import { Send, Square, Sparkles, RefreshCw, KeyRound, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ApiKeyForm from "@/components/ApiKeyForm";
import { chatStream, hasKey, type ChatMessage } from "@/lib/openai";

const BASE_SYSTEM =
  "You are Iris, a warm but rigorous IELTS Speaking examiner and coach. Ask ONE question at a time, then wait for the student's reply. Keep your own turns short and natural. The student types their spoken answers, so forgive minor typos. Whenever the student types 'SCORE' (or asks for feedback), give: an estimated band (0–9, half-bands allowed) and 2–3 concrete upgrades across Fluency & Coherence, Lexical Resource, and Grammatical Range & Accuracy — quote a better phrasing of something they actually said. Be encouraging but honest. The student is aiming for Band 9.";

interface Scenario {
  id: string;
  title: string;
  blurb: string;
  prompt: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "part1",
    title: "Part 1 — Interview",
    blurb: "Everyday topics, short answers",
    prompt:
      "Run IELTS Speaking Part 1. Greet me, then ask familiar-topic questions (home, work/study, hobbies) one at a time, about 8 questions total.",
  },
  {
    id: "part2",
    title: "Part 2 — Cue card",
    blurb: "Long turn, 2-minute monologue",
    prompt:
      "Run IELTS Speaking Part 2. Give me one cue card with bullet points, tell me I have 1 minute to prepare, and wait. After my answer, ask 1–2 rounding-off questions.",
  },
  {
    id: "part3",
    title: "Part 3 — Discussion",
    blurb: "Abstract, opinion-driven",
    prompt:
      "Run IELTS Speaking Part 3. Ask abstract discussion questions linked to a Part 2 topic, pushing me to justify opinions with examples. One question at a time.",
  },
  {
    id: "full",
    title: "Full mock test",
    blurb: "Parts 1 → 2 → 3, then score",
    prompt:
      "Run a complete IELTS Speaking mock: Part 1, then Part 2 with a cue card, then Part 3. Move through the parts in order, one question at a time. At the very end, give a full band breakdown for each criterion with improvement tips.",
  },
  {
    id: "free",
    title: "Free conversation",
    blurb: "Just talk — gentle corrections",
    prompt:
      "Have a natural conversation with me on any topic I raise. Keep it flowing, but slip in gentle corrections and richer vocabulary suggestions as we go.",
  },
];

export default function Speaking() {
  const [keyReady, setKeyReady] = useState(hasKey());
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  if (!keyReady) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="size-5 text-primary" /> Connect your AI coach
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Speaking practice runs on your own OpenAI API key. It's stored only on this device and
              talks straight to OpenAI — your essays and answers never pass through our servers.
            </p>
          </CardHeader>
          <CardContent>
            <ApiKeyForm onSaved={() => setKeyReady(true)} />
          </CardContent>
        </Card>
      </div>
    );
  }

  async function send(text: string, history: ChatMessage[]) {
    const sys: ChatMessage = { role: "system", content: BASE_SYSTEM };
    const next: ChatMessage[] = [...history, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError("");
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await chatStream(
        [sys, ...next],
        (tok) =>
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = {
              role: "assistant",
              content: copy[copy.length - 1].content + tok,
            };
            return copy;
          }),
        ctrl.signal,
      );
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setError((e as Error).message || "Something went wrong.");
        setMessages((m) => m.slice(0, -1)); // drop the empty assistant bubble
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function start(s: Scenario) {
    setScenario(s);
    setMessages([]);
    setError("");
    void send(s.prompt, []);
  }

  function stop() {
    abortRef.current?.abort();
  }

  // Hide the hidden kickoff prompt (index 0) and any empty streaming placeholder.
  const visible = messages.filter((m, i) => i !== 0 && m.content !== "");

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Scenario chips */}
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => start(s)}
            disabled={busy}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
              scenario?.id === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card hover:border-primary/50"
            }`}
            title={s.blurb}
          >
            {s.title}
          </button>
        ))}
      </div>

      {!scenario ? (
        <Card className="grid min-h-72 place-items-center p-8 text-center">
          <div className="max-w-md">
            <GraduationCap className="mx-auto size-10 text-primary" />
            <div className="mt-3 text-xl font-bold">Pick a scenario to begin</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Iris, your AI examiner, asks one question at a time. Type your answers as if you were
              speaking. Type <code className="rounded bg-secondary px-1">SCORE</code> any time for an
              instant band and corrections.
            </p>
          </div>
        </Card>
      ) : (
        <Card className="flex h-[60vh] flex-col overflow-hidden p-0">
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {visible.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {busy && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-1 px-1 text-muted-foreground">
                <Dot delay="0ms" /> <Dot delay="120ms" /> <Dot delay="240ms" />
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>

          <div className="border-t bg-card/60 p-3">
            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() && !busy) void send(input.trim(), messages);
                  }
                }}
                placeholder="Type your answer…  (Enter to send, Shift+Enter for a new line)"
                className="max-h-32 min-h-11 resize-none"
                disabled={busy}
              />
              {busy ? (
                <Button variant="outline" size="icon" onClick={stop} title="Stop">
                  <Square className="size-4" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  disabled={!input.trim()}
                  onClick={() => void send(input.trim(), messages)}
                  title="Send"
                >
                  <Send className="size-4" />
                </Button>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Quick label="SCORE me" onClick={() => !busy && void send("SCORE", messages)} disabled={busy} />
              <Quick
                label="Harder question"
                onClick={() => !busy && void send("Push me with a harder, more abstract follow-up.", messages)}
                disabled={busy}
              />
              <button
                onClick={() => scenario && start(scenario)}
                disabled={busy}
                className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
              >
                <RefreshCw className="size-3" /> Restart
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function Bubble({ role, content }: { role: string; content: string }) {
  const me = role === "user";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          me
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm border bg-card"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function Quick({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1 rounded-full border bg-secondary/50 px-3 py-1 text-xs font-medium transition-colors hover:bg-secondary disabled:opacity-50"
    >
      <Sparkles className="size-3" /> {label}
    </button>
  );
}

function Dot({ delay }: { delay: string }) {
  return <span className="size-2 animate-bounce rounded-full bg-current" style={{ animationDelay: delay }} />;
}
