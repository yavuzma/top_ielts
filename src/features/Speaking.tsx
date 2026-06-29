import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "@/components/CopyButton";

const PART2 =
  "Let's do IELTS Speaking Part 2. Give me a cue card, let me prepare for 1 minute, then I'll answer in writing. Give a band score + corrections.";
const FULL =
  "Let's do a full IELTS Speaking round (Parts 1, 2 and 3). Ask questions in order; I'll answer in writing. At the end, give a band and improvement tips for each part.";

export default function Speaking() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🗣️ Speaking — Practise with Claude</CardTitle>
          <p className="text-sm text-muted-foreground">
            Fastest way to improve: copy a prompt below, paste it into a Claude chat, answer in
            writing, and get an instant band + corrections.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <PromptRow text={PART2} />
          <PromptRow text={FULL} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><b>Part 1:</b> everyday topics (home, work, hobbies) — short, clear answers.</li>
            <li><b>Part 2:</b> 2-minute monologue (cue card) — intro → detail → personal link → conclusion.</li>
            <li><b>Part 3:</b> abstract discussion — justify your opinion with examples.</li>
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
