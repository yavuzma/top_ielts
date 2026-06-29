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
          <CardTitle>Günün Essay'i</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-secondary/40 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <Badge>{prompt.type} · {prompt.topic}</Badge>
              <Button variant="ghost" size="sm" onClick={() => setPrompt(rnd())}>
                <Dice5 className="size-4" /> Başka soru
              </Button>
            </div>
            <p className="font-medium">{prompt.q}</p>
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Essay'ini buraya yaz… (Task 2 için en az 250 kelime hedefle)"
            className="min-h-72 leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">{words} kelime</span>
            <div className="flex gap-2">
              <CopyButton text={claudePrompt} label="Claude'a puanlat" variant="outline" size="default" />
              <Button variant="success" onClick={save} disabled={!text.trim()}>
                <Save className="size-4" /> Kaydet
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Kaydet → essay geçmişine ekler ve seriyi artırır. "Claude'a puanlat" → band değerlendirme
            istemini panoya kopyalar, sohbete yapıştır.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Essay geçmişi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz essay yok. Yukarıdan ilkini yaz!</p>
          ) : (
            history.map((e) => (
              <div key={e.id} className="rounded-lg border bg-secondary/30 p-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold">{e.date}</span>
                  <Badge variant="secondary">{e.type}</Badge>
                  <span className="text-muted-foreground">{e.topic}</span>
                  <span className="text-muted-foreground">· {e.words} kelime</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto text-destructive"
                    onClick={() => {
                      if (confirm("Bu essay silinsin mi?")) deleteEssay(e.id);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{e.q}</p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-primary">Essay'i göster</summary>
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
