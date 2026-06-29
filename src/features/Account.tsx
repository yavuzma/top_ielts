import { CalendarDays, Cloud, CloudOff, Trash2 } from "lucide-react";
import { useAuth } from "@/store/auth";
import { useStudy } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Account({ onSignIn }: { onSignIn: () => void }) {
  const { user, enabled, logout } = useAuth();
  const { state, setExamDate, resetLocal } = useStudy();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {user ? <Cloud className="size-5 text-success" /> : <CloudOff className="size-5 text-warning" />}
            Hesap & senkron
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {user ? (
            <>
              <p className="text-sm">
                <b>{user.displayName || user.email}</b> olarak giriş yaptın. İlerlemen tüm
                cihazlarında otomatik senkronlanıyor.
              </p>
              <Button variant="outline" onClick={() => void logout()}>
                Çıkış yap
              </Button>
            </>
          ) : enabled ? (
            <>
              <p className="text-sm text-muted-foreground">
                Şu an misafir modundasın — ilerlemen yalnızca bu cihazda. Hesap açarsan telefon,
                tablet ve bilgisayarda aynı veriyi görürsün. (Misafir ilerlemen hesabına taşınır.)
              </p>
              <Button onClick={onSignIn}>Giriş yap / Kayıt ol</Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Bulut senkron için Firebase ayarlanmamış (misafir modu). Kurulum adımları README'de.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="size-5" /> Sınav tarihi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="exam">Geri sayım için tarih gir</Label>
          <Input
            id="exam"
            type="date"
            value={state.examDate ?? ""}
            onChange={(e) => setExamDate(e.target.value || null)}
            className="max-w-xs"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-5" /> İlerlemeyi sıfırla
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Bu hesabın/cihazın ilerlemesini siler. Geri alınamaz.
          </p>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Tüm ilerlemen silinecek. Emin misin?")) resetLocal();
            }}
          >
            Sıfırla
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
