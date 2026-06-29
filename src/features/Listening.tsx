import { ExternalLink } from "lucide-react";
import { LISTENING } from "@/data/content";
import { useStudy, todayStr } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Listening() {
  const { state, markListening } = useStudy();
  const items = LISTENING.filter((l) => l.level === state.level);
  const doneN = items.filter((l) => state.listening[l.id]).length;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <h2 className="font-semibold">Dinleme — {state.level}</h2>
            <p className="text-sm text-muted-foreground">
              Ücretsiz gerçek kaynaklar + önce / sırasında / sonra adımları.
            </p>
          </div>
          <Badge variant="secondary">{doneN} / {items.length} yapıldı</Badge>
        </CardContent>
      </Card>

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
                    {l.topic} · ~{l.mins} dk · {l.source}
                    {last ? ` · son: ${last}` : ""}
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
                  <ExternalLink className="size-4" /> Kaynağı aç — {l.source}
                </a>

                <Steps title="1) Dinlemeden önce" items={l.before} />
                <Steps title="2) Dinlerken" items={l.during} />
                <Steps title="3) Dinledikten sonra" items={l.after} />

                <div className="flex justify-end">
                  <Button
                    variant="success"
                    disabled={doneToday}
                    onClick={() => markListening(l.id)}
                  >
                    {doneToday ? "Bugün dinlendi ✓" : "Bugün dinledim ✓"}
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
