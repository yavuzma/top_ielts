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
            <h2 className="font-semibold">Okuma — {state.level}</h2>
            <p className="text-sm text-muted-foreground">
              Metni oku, soruları yanıtla, cevap anahtarıyla kontrol et.
            </p>
          </div>
          <Badge variant="secondary">{doneN} / {items.length} okundu</Badge>
        </CardContent>
      </Card>

      {items.map((r) => {
        const last = state.reading[r.id];
        const doneToday = last === todayStr();
        const prompt = `IELTS examiner gibi davran. "${r.title}" metninin sorularına verdiğim cevapları kontrol et, doğru/yanlışı açıkla ve eksiklerimi tamamla.\n\nCevaplarım:\n`;
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
                    {r.topic} · ~{r.words} kelime{last ? ` · son: ${last}` : ""}
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
                  <h3 className="mb-1 font-semibold">Sorular</h3>
                  <ol className="list-decimal space-y-1.5 pl-5 text-sm">
                    {r.questions.map((q, i) => (
                      <li key={i}>{q.q}</li>
                    ))}
                  </ol>
                </div>

                <details className="rounded-lg border bg-secondary/30 p-3">
                  <summary className="cursor-pointer text-sm font-medium text-primary">
                    Cevap anahtarını göster
                  </summary>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-success">
                    {r.questions.map((q, i) => (
                      <li key={i}>{q.a}</li>
                    ))}
                  </ol>
                </details>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CopyButton text={prompt} label="Cevaplarımı Claude'a kontrol ettir" />
                  <Button
                    variant="success"
                    disabled={doneToday}
                    onClick={() => markReading(r.id)}
                  >
                    {doneToday ? "Bugün okundu ✓" : "Bugün okudum ✓"}
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
