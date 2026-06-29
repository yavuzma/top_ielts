import { READING } from "@/data/content";
import { useStudy, todayStr } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/CopyButton";

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
              Read the text, answer the questions, then check with the answer key.
            </p>
          </div>
          <Badge variant="secondary">{doneN} / {items.length} read</Badge>
        </CardContent>
      </Card>

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
