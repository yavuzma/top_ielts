import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Repeat, Check } from "lucide-react";
import { VOCAB } from "@/data/content";
import { useStudy } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LISTS = Object.keys(VOCAB);

export default function Vocab() {
  const { state, markVocabKnown } = useStudy();
  const [list, setList] = useState(LISTS[0]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const all = VOCAB[list];
  const known = all.filter((c) => state.vocab[`${list}::${c.w}`] === "known").length;
  const deck = useMemo(
    () => all.filter((c) => state.vocab[`${list}::${c.w}`] !== "known"),
    [all, list, state.vocab],
  );

  useEffect(() => {
    setIdx(0);
    setFlipped(false);
  }, [list]);
  useEffect(() => {
    if (idx >= deck.length) setIdx(0);
    setFlipped(false);
  }, [deck.length, idx]);

  const card = deck[idx];

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Select value={list} onValueChange={setList}>
          <SelectTrigger className="w-auto min-w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LISTS.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {known} / {all.length} öğrenildi
        </span>
      </div>

      <Card
        className="grid min-h-56 cursor-pointer place-items-center p-8 text-center transition-colors hover:border-primary/50"
        onClick={() => card && setFlipped((f) => !f)}
      >
        {!card ? (
          <div>
            <div className="text-2xl font-bold">🎉 Bu liste bitti!</div>
            <p className="mt-2 text-sm text-muted-foreground">Başka bir liste seç.</p>
          </div>
        ) : !flipped ? (
          <div>
            <div className="text-3xl font-bold text-primary">{card.w}</div>
            <p className="mt-3 text-xs text-muted-foreground">Çevirmek için tıkla</p>
          </div>
        ) : (
          <div>
            <div className="text-xl font-semibold">{card.d}</div>
            <p className="mt-3 text-sm italic text-muted-foreground">"{card.e}"</p>
          </div>
        )}
      </Card>

      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          disabled={!card}
          onClick={() => {
            setIdx((i) => (deck.length ? (i + 1) % deck.length : 0));
            setFlipped(false);
          }}
        >
          <RotateCcw className="size-4" /> Tekrar
        </Button>
        <Button variant="secondary" disabled={!card} onClick={() => setFlipped((f) => !f)}>
          <Repeat className="size-4" /> Çevir
        </Button>
        <Button
          variant="success"
          disabled={!card}
          onClick={() => card && markVocabKnown(`${list}::${card.w}`)}
        >
          <Check className="size-4" /> Biliyorum
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        "Biliyorum" dediklerin listeden çıkar; ilerlemen tüm cihazlarında senkronlanır.
      </p>
    </div>
  );
}
