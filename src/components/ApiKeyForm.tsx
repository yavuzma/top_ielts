import { useState } from "react";
import { Check, ExternalLink, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MODELS, getKey, getModel, setKey, setModel } from "@/lib/openai";

export default function ApiKeyForm({ onSaved }: { onSaved?: () => void }) {
  const [value, setValue] = useState(getKey());
  const [model, setModelState] = useState(getModel());
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  function save() {
    setKey(value);
    setModel(model);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    if (value.trim()) onSaved?.();
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="apikey">OpenAI API key</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="apikey"
              type={show ? "text" : "password"}
              placeholder="sk-…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="pr-9 font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="model">Model</Label>
        <Select value={model} onValueChange={setModelState}>
          <SelectTrigger id="model">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={save} disabled={!value.trim()}>
          {saved ? (
            <>
              <Check className="size-4" /> Saved
            </>
          ) : (
            "Save key"
          )}
        </Button>
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Get a key <ExternalLink className="size-3.5" />
        </a>
      </div>

      <p className="text-xs text-muted-foreground">
        Stored only in this browser (localStorage) and sent directly to OpenAI. It is never uploaded
        to NineBands' cloud or shared across devices. Usage is billed to your own OpenAI account.
      </p>
    </div>
  );
}
