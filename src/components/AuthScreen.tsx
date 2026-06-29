import { useState } from "react";
import { BookOpen, Brain, Cloud, Headphones, PenLine, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FEATURES = [
  { icon: Brain, title: "Seviyeli içerik", desc: "B1 kelime & grammar, B2–C1 tam IELTS" },
  { icon: BookOpen, title: "Günlük okuma", desc: "Cevap anahtarlı, seviyeye göre metinler" },
  { icon: Headphones, title: "Günlük dinleme", desc: "Yapılandırılmış, ücretsiz kaynaklar" },
  { icon: PenLine, title: "Günlük essay", desc: "Yaz, kaydet, anında geri bildirim al" },
  { icon: Cloud, title: "Her cihazda senkron", desc: "Telefon, tablet, bilgisayar tek hesap" },
  { icon: Sparkles, title: "İlerleme & seri", desc: "Streak, band takibi, modül planı" },
];

export default function AuthScreen({ onGuest }: { onGuest: () => void }) {
  const { enabled, signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (mode === "up") await signUp(name, email, password);
      else await signIn(email, password);
    } catch (e2) {
      setErr(humanError(e2));
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setErr("");
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (e2) {
      setErr(humanError(e2));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="app-aurora min-h-screen">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
        {/* Hero */}
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-sm backdrop-blur">
            <span className="text-lg font-black text-primary">9</span>
            <span className="font-semibold">{BRAND.name}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {BRAND.tagline}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{BRAND.pitch}</p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-lg border bg-card/50 p-3 backdrop-blur">
                <f.icon className="mb-2 size-5 text-primary" />
                <div className="text-sm font-semibold">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Auth card */}
        <Card className="mx-auto w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            {enabled ? (
              <>
                <Tabs value={mode} onValueChange={(v) => setMode(v as "in" | "up")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="in">Giriş yap</TabsTrigger>
                    <TabsTrigger value="up">Kayıt ol</TabsTrigger>
                  </TabsList>

                  <form onSubmit={submit} className="mt-5 space-y-4">
                    <TabsContent value="up" className="mt-0 space-y-2">
                      <Label htmlFor="name">İsim</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Adın" />
                    </TabsContent>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@mail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pw">Şifre</Label>
                      <Input id="pw" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
                    </div>
                    {err && <p className="text-sm text-destructive">{err}</p>}
                    <Button type="submit" className="w-full" disabled={busy}>
                      {busy ? "Bekle…" : mode === "up" ? "Hesap oluştur" : "Giriş yap"}
                    </Button>
                  </form>
                </Tabs>

                <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-px flex-1 bg-border" /> veya <span className="h-px flex-1 bg-border" />
                </div>
                <Button variant="outline" className="w-full" onClick={google} disabled={busy}>
                  Google ile devam et
                </Button>
                <button onClick={onGuest} className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground">
                  Hesapsız dene (yalnızca bu cihaz)
                </button>
              </>
            ) : (
              <div className="space-y-4 py-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Bulut hesapları için Firebase henüz ayarlanmadı. Uygulamayı misafir modunda
                  hemen kullanabilirsin; verin bu cihazda saklanır.
                </p>
                <Button className="w-full" onClick={onGuest}>
                  Çalışmaya başla
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function humanError(e: unknown): string {
  const code = (e as { code?: string })?.code || "";
  const map: Record<string, string> = {
    "auth/invalid-email": "Geçersiz e-posta.",
    "auth/missing-password": "Şifre gir.",
    "auth/weak-password": "Şifre en az 6 karakter olmalı.",
    "auth/email-already-in-use": "Bu e-posta zaten kayıtlı.",
    "auth/invalid-credential": "E-posta veya şifre hatalı.",
    "auth/user-not-found": "Kullanıcı bulunamadı.",
    "auth/wrong-password": "Şifre hatalı.",
    "auth/popup-closed-by-user": "Google penceresi kapatıldı.",
  };
  return map[code] || "Bir şeyler ters gitti. Tekrar dene.";
}
