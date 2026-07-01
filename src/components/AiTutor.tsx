import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Square, RefreshCw, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ApiKeyForm from "@/components/ApiKeyForm";
import { chatStream, hasKey, type ChatMessage } from "@/lib/openai";
import { systemFor } from "@/lib/ielts";

// A short human label + starter questions per tab, so the tutor already
// knows what you're looking at and offers relevant prompts.
const CONTEXTS: Record<string, { label: string; starters: string[] }> = {
  dashboard: {
    label: "the student's dashboard / study overview",
    starters: ["What should I study today?", "Explain the IELTS band scale", "Make me a 4-week plan"],
  },
  plan: {
    label: "the level plan (B1/B2/C1 modules)",
    starters: ["Which level am I really at?", "How long until Band 7?", "What order should I learn things?"],
  },
  grammar: {
    label: "grammar lessons",
    starters: ["Explain present perfect vs past simple", "Fix this sentence: …", "Quiz me on articles"],
  },
  vocab: {
    label: "vocabulary & spaced repetition",
    starters: ["Give me 10 Band-9 synonyms for 'important'", "Use 'mitigate' in a sentence", "Test my collocations"],
  },
  wordbank: {
    label: "the Oxford CEFR word bank (A1–C1)",
    starters: ["Which C1 words matter most for IELTS?", "Quiz me on the words I'm learning", "Make a story with 5 new words"],
  },
  reading: {
    label: "IELTS reading practice",
    starters: ["Give me a True/False/Not Given tip", "Why is this answer 'Not Given'?", "How do I skim faster?"],
  },
  listening: {
    label: "IELTS listening practice",
    starters: ["How do I catch answers I miss?", "Explain map-labelling questions", "Common listening traps?"],
  },
  essay: {
    label: "IELTS writing",
    starters: ["Give me a Task 2 essay prompt", "Score my introduction", "Band-9 linking words"],
  },
  speaking: {
    label: "IELTS speaking",
    starters: ["Give me a Part 2 cue card", "How do I fill silence naturally?", "Upgrade my answer to Band 9"],
  },
  tactics: {
    label: "IELTS templates & tactics",
    starters: ["Apply the opinion-essay template to my topic", "Best structure for a discussion essay?", "Band 7→9 quick wins"],
  },
  resources: { label: "study resources", starters: ["Best free IELTS resources?", "How do I use these?"] },
  account: { label: "account settings", starters: ["How is my data stored?"] },
};

export default function AiTutor({ tab }: { tab: string }) {
  const [open, setOpen] = useState(false);
  const [keyReady, setKeyReady] = useState(hasKey());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ctx = CONTEXTS[tab] ?? { label: tab, starters: [] };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const sys: ChatMessage = {
      role: "system",
      content: systemFor(
        `The student is on ${ctx.label}. Answer as their personal IELTS tutor: direct, exam-focused, and practical. Use short paragraphs and examples.`,
      ),
    };
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
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
        setMessages((m) => m.slice(0, -1));
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const visible = messages.filter((m) => m.content !== "");

  return (
    <>
      {/* Floating launcher — present on every tab */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
          title="Ask your AI tutor (anytime)"
        >
          <Sparkles className="size-5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      )}

      {/* Slide-over panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-full max-w-md flex-col border-l bg-background shadow-2xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold">Iris — your IELTS tutor</div>
                  <div className="text-xs text-muted-foreground">Knows the exam. Ask anything.</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <Button variant="ghost" size="icon" title="New chat" onClick={() => setMessages([])}>
                    <RefreshCw className="size-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" title="Close" onClick={() => setOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {!keyReady ? (
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <KeyRound className="size-4 text-primary" /> Connect your AI tutor
                </div>
                <p className="text-sm text-muted-foreground">
                  The tutor runs on your own OpenAI key. It's stored only on this device and talks
                  straight to OpenAI — nothing passes through our servers.
                </p>
                <ApiKeyForm onSaved={() => setKeyReady(true)} />
              </div>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                  {visible.length === 0 && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        I can see you're on <span className="font-medium text-foreground">{ctx.label}</span>. Ask me
                        anything, or start with:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ctx.starters.map((s) => (
                          <button
                            key={s}
                            onClick={() => void send(s)}
                            className="rounded-full border bg-secondary/50 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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
                          void send(input);
                        }
                      }}
                      placeholder="Ask your tutor…  (Enter to send)"
                      className="max-h-32 min-h-11 resize-none"
                      disabled={busy}
                    />
                    {busy ? (
                      <Button variant="outline" size="icon" onClick={() => abortRef.current?.abort()} title="Stop">
                        <Square className="size-4" />
                      </Button>
                    ) : (
                      <Button size="icon" disabled={!input.trim()} onClick={() => void send(input)} title="Send">
                        <Send className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ role, content }: { role: string; content: string }) {
  const me = role === "user";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          me ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border bg-card"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return <span className="size-2 animate-bounce rounded-full bg-current" style={{ animationDelay: delay }} />;
}
