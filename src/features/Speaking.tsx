import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "@/components/CopyButton";

const PART2 =
  "IELTS Speaking Part 2 yapalım. Bana bir cue card ver, 1 dk hazırlanayım, sonra cevabımı yazıyla vereceğim. Band puanı + düzeltme yap.";
const FULL =
  "IELTS Speaking tam tur yapalım (Part 1, 2, 3). Sırayla soru sor, ben yazıyla cevaplayayım. Sonunda her parça için band ve gelişim önerisi ver.";

export default function Speaking() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🗣️ Speaking — Claude ile pratik</CardTitle>
          <p className="text-sm text-muted-foreground">
            En hızlı gelişim: aşağıdaki istemi kopyala, Claude sohbetine yapıştır, yazıyla cevap ver,
            anında band + düzeltme al.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <PromptRow text={PART2} />
          <PromptRow text={FULL} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bölümler</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><b>Part 1:</b> günlük konular (ev, iş, hobiler) — kısa, net cevaplar.</li>
            <li><b>Part 2:</b> 2 dk monolog (cue card) — giriş → detay → kişisel bağ → sonuç.</li>
            <li><b>Part 3:</b> soyut tartışma — fikrini örnekle gerekçelendir.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function PromptRow({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-secondary/40 p-3">
      <code className="text-xs text-success">{text}</code>
      <CopyButton text={text} />
    </div>
  );
}
