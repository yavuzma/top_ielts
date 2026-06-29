import { useMemo, useState } from "react";
import { Dice5, Save, Trash2 } from "lucide-react";
import { ESSAY_PROMPTS } from "@/data/content";
import { useStudy, todayStr } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/CopyButton";

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

  const save = () => {
    if (!text.trim()) return;
    addEssay({ date: todayStr(), type: prompt.type, topic: prompt.topic, q: prompt.q, text: text.trim(), words });
    setText("");
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
              <CopyButton text={claudePrompt} label="Score with Claude" variant="outline" size="default" />
              <Button variant="success" onClick={save} disabled={!text.trim()}>
                <Save className="size-4" /> Save
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Save → adds it to your essay history and extends your streak. "Score with Claude" →
            copies a band-assessment prompt to your clipboard; paste it into the chat.
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
