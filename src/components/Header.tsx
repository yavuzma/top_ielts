import { Cloud, CloudOff, LogOut, Moon, Sun, User as UserIcon } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useAuth } from "@/store/auth";
import { useStudy } from "@/store/store";
import { LEVELS, type Level } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LEVEL_KEYS = Object.keys(LEVELS) as Level[];

export default function Header({ theme, onToggleTheme }: { theme: string; onToggleTheme: () => void }) {
  const { user, enabled, logout } = useAuth();
  const { state, setLevel, syncing } = useStudy();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-success text-base font-black text-primary-foreground">
            9
          </div>
          <div className="leading-tight">
            <div className="font-bold">{BRAND.name}</div>
            <div className="text-[11px] text-muted-foreground">IELTS 9 yolculuğu</div>
          </div>
        </div>

        {/* Level switcher */}
        <div className="ml-auto flex items-center gap-1 rounded-lg border bg-card p-1">
          {LEVEL_KEYS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                state.level === l
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title={LEVELS[l].title}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {enabled &&
            (syncing ? (
              <Badge variant="secondary" className="gap-1">
                <Cloud className="size-3 animate-pulse" /> Senkron
              </Badge>
            ) : user ? (
              <Badge variant="success" className="gap-1">
                <Cloud className="size-3" /> Bulut
              </Badge>
            ) : (
              <Badge variant="warning" className="gap-1">
                <CloudOff className="size-3" /> Yerel
              </Badge>
            ))}

          <Button variant="ghost" size="icon" onClick={onToggleTheme} title="Tema">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {user ? (
            <Button variant="ghost" size="icon" onClick={() => void logout()} title="Çıkış">
              <LogOut className="size-4" />
            </Button>
          ) : (
            <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
              <UserIcon className="size-3.5" /> Misafir
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
