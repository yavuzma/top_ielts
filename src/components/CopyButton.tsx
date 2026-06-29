import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CopyButton({
  text,
  label = "Kopyala",
  className,
  variant = "outline",
  size = "sm",
}: {
  text: string;
  label?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
}) {
  const [done, setDone] = useState(false);
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch {
          /* ignore */
        }
      }}
    >
      {done ? <Check className="size-4" /> : <Copy className="size-4" />}
      {done ? "Kopyalandı" : label}
    </Button>
  );
}
