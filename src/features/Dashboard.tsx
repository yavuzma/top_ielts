import { BookOpen, Flame, Headphones, PenLine, Target } from "lucide-react";
import { BANDS, LEVELS, ROUTINES } from "@/data/content";
import { useStudy, todayStr } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { state, setBand } = useStudy();
  const lvl = LEVELS[state.level];

  let total = 0;
  let done = 0;
  lvl.modules.forEach((m) =>
    m.tasks.forEach((_, ti) => {
      total++;
      if (state.tasks[`${m.id}#${ti}`]) done++;
    }),
  );
  const pct = total ? Math.round((done / total) * 100) : 0;

  const today = todayStr();
  const rDone = Object.values(state.reading).includes(today);
  const lDone = Object.values(state.listening).includes(today);
  const wDone = Object.values(state.essays).some((e) => e.date === today);

  const exam = state.examDate ? new Date(state.examDate) : null;
  const daysLeft = exam ? Math.max(0, Math.ceil((exam.getTime() - Date.now()) / 86400000)) : null;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              {state.level} ilerlemesi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{pct}%</div>
            <Progress value={pct} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              {done} / {total} görev
            </p>
          </CardContent>
        </Card>

        <StatCard icon={<Flame className="size-5 text-warning" />} label="Çalışma serisi" value={`${state.streak.count} gün`} hint="Her gün en az 1 aktivite" />
        <StatCard icon={<PenLine className="size-5 text-primary" />} label="Essay serisi" value={`${state.essayStreak.count} gün`} hint={`${Object.keys(state.essays).length} essay yazıldı`} />
        <StatCard
          icon={<Target className="size-5 text-success" />}
          label="Sınava kalan"
          value={daysLeft !== null ? `${daysLeft} gün` : "—"}
          hint={daysLeft !== null ? "Profil'den güncelle" : "Hesap sekmesinden tarih gir"}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Bugünün pratiği</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <PracticePill ok={rDone} icon={<BookOpen className="size-4" />} label="Okuma" />
          <PracticePill ok={lDone} icon={<Headphones className="size-4" />} label="Dinleme" />
          <PracticePill ok={wDone} icon={<PenLine className="size-4" />} label="Yazma" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Band hedefleri</CardTitle>
          <p className="text-sm text-muted-foreground">
            Deneme yaptıkça güncelle. 9/9 için her beceride 8.5+ hedefle.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BANDS.map((b) => (
            <div key={b.key} className="rounded-lg border bg-card p-3 text-center">
              <Label className="justify-center text-xs text-muted-foreground">{b.label}</Label>
              <Input
                type="number"
                min={0}
                max={9}
                step={0.5}
                placeholder="-"
                value={state.bands[b.key] ?? ""}
                onChange={(e) => setBand(b.key, e.target.value)}
                className="mt-2 h-10 text-center text-lg font-bold"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            Bugün ne yapmalıyım? <Badge variant="secondary">{state.level}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {ROUTINES[state.level].map((r, i) => (
              <li key={i} className="flex gap-2 border-b pb-2 text-sm last:border-0 last:pb-0">
                <span className="text-primary">▸</span>
                {r}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
          {icon} {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

function PracticePill({ ok, icon, label }: { ok: boolean; icon: React.ReactNode; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
        ok ? "border-success/40 bg-success/15 text-success" : "bg-card text-muted-foreground"
      }`}
    >
      {ok ? "✅" : icon} {label}
    </span>
  );
}

function Label({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={className} {...props} />;
}
