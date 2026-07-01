import { useState } from "react";
import { Wand2, Sparkles, Loader2, KeyRound } from "lucide-react";
import { TACTICS, TAC_CATS, type TacticCat, type Tactic } from "@/data/tactics";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/CopyButton";
import ApiKeyForm from "@/components/ApiKeyForm";
import { chatStream, hasKey, type ChatMessage } from "@/lib/openai";
import { IELTS_SYSTEM } from "@/lib/ielts";

export default function Tactics() {
  const [cat, setCat] = useState<TacticCat>("writing");
  const groups = TACTICS.filter((g) => g.cat === cat);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="py-4">
          <h2 className="font-semibold">Templates &amp; Tactics</h2>
          <p className="text-sm text-muted-foreground">
            Exam-tested skeletons, phrase banks and strategies. Copy a template — or let AI fill it
            around your own topic.
          </p>
        </CardContent>
      </Card>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {TAC_CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary/50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {groups.map((g) => (
        <Card key={g.id}>
          <details open>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5">
              <div>
                <span className="font-semibold">{g.title}</span>
                <p className="mt-0.5 text-sm text-muted-foreground">{g.blurb}</p>
              </div>
              <Badge variant="secondary">{g.tactics.length}</Badge>
            </summary>
            <CardContent className="space-y-4 pt-0">
              {g.tactics.map((t, i) => (
                <TacticBlock key={i} t={t} />
              ))}
            </CardContent>
          </details>
        </Card>
      ))}
    </div>
  );
}

function TacticBlock({ t }: { t: Tactic }) {
  return (
    <div className="rounded-lg border bg-secondary/20 p-4">
      <div className="font-medium">{t.heading}</div>
      {t.body && <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>}
      {t.bullets && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {t.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {t.template && (
        <div className="mt-3 space-y-2">
          <pre className="whitespace-pre-wrap rounded-md border bg-card p-3 text-sm leading-relaxed">{t.template}</pre>
          <div className="flex flex-wrap items-center gap-2">
            <CopyButton text={t.template} label="Copy template" variant="ghost" size="default" />
            <ApplyTemplate template={t.template} heading={t.heading} />
          </div>
        </div>
      )}
    </div>
  );
}

// Inline: take the user's topic and stream an AI-filled version of the template.
function ApplyTemplate({ template, heading }: { template: string; heading: string }) {
  const [open, setOpen] = useState(false);
  const [keyReady, setKeyReady] = useState(hasKey());
  const [topic, setTopic] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const run = async () => {
    if (!topic.trim()) return;
    setBusy(true);
    setOut("");
    setErr("");
    const messages: ChatMessage[] = [
      { role: "system", content: IELTS_SYSTEM },
      {
        role: "user",
        content: `Apply this IELTS "${heading}" template to my topic and produce a strong Band 8–9 model, following the template's shape exactly.\n\nTEMPLATE:\n${template}\n\nMY TOPIC / PROMPT:\n${topic}`,
      },
    ];
    try {
      await chatStream(messages, (tok) => setOut((s) => s + tok));
    } catch (e) {
      setErr((e as Error).message || "Failed.");
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <Button variant="outline" size="default" onClick={() => setOpen(true)}>
        <Wand2 className="size-4" /> Apply with AI
      </Button>
    );
  }

  return (
    <div className="w-full space-y-2 rounded-lg border bg-card p-3">
      {!keyReady ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <KeyRound className="size-4 text-primary" /> Connect your AI to apply templates
          </div>
          <ApiKeyForm onSaved={() => setKeyReady(true)} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Your topic or the exact question…"
              className="h-10 min-w-48 flex-1"
              disabled={busy}
              onKeyDown={(e) => e.key === "Enter" && !busy && void run()}
            />
            {busy ? (
              <Button variant="outline" disabled>
                <Loader2 className="size-4 animate-spin" /> Writing…
              </Button>
            ) : (
              <Button onClick={() => void run()} disabled={!topic.trim()}>
                <Sparkles className="size-4" /> Generate
              </Button>
            )}
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          {out && (
            <div className="whitespace-pre-wrap rounded-md border bg-secondary/30 p-3 text-sm leading-relaxed">
              {out}
            </div>
          )}
        </>
      )}
    </div>
  );
}
