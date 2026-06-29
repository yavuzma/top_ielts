import { ExternalLink } from "lucide-react";
import { RESOURCES } from "@/data/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Resources() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Hepsi ücretsiz ve yasal kaynaklar.</p>
      {RESOURCES.map((g) => (
        <Card key={g.group}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{g.group}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {g.items.map((it) => (
              <a
                key={it.name}
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border bg-card p-3 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center gap-1.5 font-medium text-primary">
                  {it.name} <ExternalLink className="size-3.5" />
                </div>
                <p className="text-sm text-muted-foreground">{it.desc}</p>
              </a>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
