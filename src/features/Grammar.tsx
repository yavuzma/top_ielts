import { GRAMMAR, LEVEL_ORDER } from "@/data/content";
import { useStudy } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/CopyButton";

export default function Grammar() {
  const { state, toggleGrammar } = useStudy();
  const items = GRAMMAR.filter((g) => LEVEL_ORDER[g.level] <= LEVEL_ORDER[state.level]);
  const doneN = items.filter((g) => state.grammar[g.id]).length;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <h2 className="font-semibold">Grammar lessons</h2>
            <p className="text-sm text-muted-foreground">
              Topics for your level ({state.level}) and below. Read, generate examples, then mark "learned".
            </p>
          </div>
          <Badge variant="secondary">{doneN} / {items.length}</Badge>
        </CardContent>
      </Card>

      {items.map((g) => {
        const learned = !!state.grammar[g.id];
        return (
          <Card key={g.id}>
            <details>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{g.title}</span>
                    <Badge variant="outline">{g.level}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{g.summary}</p>
                </div>
                {learned && <Badge variant="success">✓</Badge>}
              </summary>
              <CardContent className="space-y-4 pt-0">
                <ul className="list-disc space-y-1.5 pl-5 text-sm">
                  {g.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <div className="rounded-lg border bg-secondary/40 p-3">
                  <div className="mb-1 text-sm font-semibold">Examples</div>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {g.examples.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border bg-secondary/40 p-3">
                  <code className="text-xs text-success">{g.practice}</code>
                  <CopyButton text={g.practice} />
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={learned}
                    onChange={(e) => toggleGrammar(g.id, e.target.checked)}
                    className="size-5 accent-[var(--success)]"
                  />
                  I've learned this topic
                </label>
              </CardContent>
            </details>
          </Card>
        );
      })}
    </div>
  );
}
