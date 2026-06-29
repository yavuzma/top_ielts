import { LEVELS } from "@/data/content";
import { useStudy } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LevelPlan() {
  const { state, toggleTask } = useStudy();
  const lvl = LEVELS[state.level];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{lvl.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{lvl.desc}</p>
        </CardHeader>
      </Card>

      {lvl.modules.map((mod) => {
        const done = mod.tasks.filter((_, ti) => state.tasks[`${mod.id}#${ti}`]).length;
        const pct = Math.round((done / mod.tasks.length) * 100);
        return (
          <Card key={mod.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base">{mod.name}</CardTitle>
                <Badge variant={pct === 100 ? "success" : "secondary"}>{pct}%</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{mod.focus}</p>
            </CardHeader>
            <CardContent className="space-y-1">
              {mod.tasks.map((t, ti) => {
                const id = `${mod.id}#${ti}`;
                const checked = !!state.tasks[id];
                return (
                  <label
                    key={id}
                    className="flex cursor-pointer items-start gap-3 rounded-md border-b py-2.5 last:border-0 hover:text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => toggleTask(id, e.target.checked)}
                      className="mt-0.5 size-5 shrink-0 accent-[var(--success)]"
                    />
                    <span className={`text-sm ${checked ? "text-muted-foreground line-through" : ""}`}>
                      {t}
                    </span>
                  </label>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
