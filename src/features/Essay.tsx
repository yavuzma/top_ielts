import { useMemo, useRef, useState } from "react";
import { Dice5, Save, Trash2, Sparkles, Square, KeyRound } from "lucide-react";
import { ESSAY_PROMPTS } from "@/data/content";
import { useStudy, todayStr } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/CopyButton";
import ApiKeyForm from "@/components/ApiKeyForm";
import { chatStream, hasKey, type ChatMessage } from "@/lib/openai";
import { IELTS_SYSTEM, WRITING_BANDS } from "@/lib/ielts";

const wordCount = (t: string) => (t.trim().match(/\S+/g) || []).length;
const rnd = () => ESSAY_PROMPTS[Math.floor(Math.random() * ESSAY_PROMPTS.length)];

export default function Essay() {
  const { state, addEssay, deleteEssay } = useStudy();
  const [prompt, setPrompt] = useState(() => rnd());
  const [text, setText] = useState("");
  const words = wordCount(text);

  const claudePrompt = `You are an IELTS examiner. Score the following ${prompt.type} essay using the official band descriptors. Give a band for each of the four criteria (Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy), an overall band, then specific corrections and an improved version.\n\nQUESTION: ${prompt.q}\n\nESSAY:\n${text}`;

  const history = useMemo(
    () => Object.values(state.essays).sort((a, b) => b.id.localeCompare(a.id)),
    [state.essays],
  );

  // --- in-app AI scoring ---
  const [keyReady, setKeyReady] = useState(hasKey());
  const [showKeyForm, setShowKeyForm] = useState(false);
  const [score, setScore] = useState("");
  const [scoring, setScoring] = useState(false);
  const [scoreErr, setScoreErr] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const scoreWithAI = async () => {
    if (!text.trim()) return;
    if (!keyReady) {
      setShowKeyForm(true);
      return;
    }
    setScoring(true);
    setScore("");
    setScoreErr("");
    const messages: ChatMessage[] = [
      { role: "system", content: `${IELTS_SYSTEM}\n\n${WRITING_BANDS}` },
      {
        role: "user",
        content: `Score this ${prompt.type} answer. Give: (1) a band for each of Task Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy, (2) an overall band, (3) the 3 highest-impact fixes — each quoting my actual words and rewriting them to Band 9, (4) one model sentence I could have used. Be strict.\n\nQUESTION: ${prompt.q}\n\nMY ANSWER (${words} words):\n${text}`,
      },
    ];
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await chatStream(messages, (tok) => setScore((s) => s + tok), ctrl.signal);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setScoreErr((e as Error).message || "Scoring failed.");
    } finally {
      setScoring(false);
      abortRef.current = null;
    }
  };

  const save = () => {
    if (!text.trim()) return;
    addEssay({ date: todayStr(), type: prompt.type, topic: prompt.topic, q: prompt.q, text: text.trim(), words });
    setText("");
    setScore("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Today's Essay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-secondary/40 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <Badge>{prompt.type} · {prompt.topic}</Badge>
              <Button variant="ghost" size="sm" onClick={() => setPrompt(rnd())}>
                <Dice5 className="size-4" /> Another question
              </Button>
            </div>
            <p className="font-medium">{prompt.q}</p>
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your essay here… (aim for at least 250 words for Task 2)"
            className="min-h-72 leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">{words} words</span>
            <div className="flex gap-2">
              <CopyButton text={claudePrompt} label="Copy prompt" variant="ghost" size="default" />
              {scoring ? (
                <Button variant="outline" onClick={() => abortRef.current?.abort()}>
                  <Square className="size-4" /> Stop
                </Button>
              ) : (
                <Button onClick={() => void scoreWithAI()} disabled={!text.trim()}>
                  <Sparkles className="size-4" /> Score with AI
                </Button>
              )}
              <Button variant="success" onClick={save} disabled={!text.trim()}>
                <Save className="size-4" /> Save
              </Button>
            </div>
          </div>

          {showKeyForm && !keyReady && (
            <div className="space-y-2 rounded-lg border bg-secondary/30 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <KeyRound className="size-4 text-primary" /> Connect your AI to score instantly
              </div>
              <ApiKeyForm
                onSaved={() => {
                  setKeyReady(true);
                  setShowKeyForm(false);
                  void scoreWithAI();
                }}
              />
            </div>
          )}

          {scoreErr && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {scoreErr}
            </div>
          )}

          {score && (
            <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/[0.03] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="size-4" /> Examiner feedback
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{score}</div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            "Score with AI" → an examiner bands your answer and rewrites your weakest lines to Band 9,
            right here. Save → adds it to your history and extends your streak.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Essay history</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">No essays yet. Write your first one above!</p>
          ) : (
            history.map((e) => (
              <div key={e.id} className="rounded-lg border bg-secondary/30 p-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold">{e.date}</span>
                  <Badge variant="secondary">{e.type}</Badge>
                  <span className="text-muted-foreground">{e.topic}</span>
                  <span className="text-muted-foreground">· {e.words} words</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto text-destructive"
                    onClick={() => {
                      if (confirm("Delete this essay?")) deleteEssay(e.id);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{e.q}</p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-primary">Show essay</summary>
                  <pre className="mt-2 whitespace-pre-wrap rounded-md bg-card p-3 text-sm leading-relaxed">
                    {e.text}
                  </pre>
                </details>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
