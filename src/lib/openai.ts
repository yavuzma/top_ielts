// =====================================================================
//  Minimal OpenAI client — talks straight from the browser using the
//  user's own API key. The key is stored locally (never synced to the
//  cloud) so it stays on this device only.
// =====================================================================

const KEY_LS = "nb_openai_key";
const MODEL_LS = "nb_openai_model";

export const MODELS = [
  { id: "gpt-4o-mini", label: "GPT-4o mini — fast & cheap (recommended)" },
  { id: "gpt-4o", label: "GPT-4o — strongest, pricier" },
  { id: "gpt-4.1-mini", label: "GPT-4.1 mini — balanced" },
] as const;

export const DEFAULT_MODEL = MODELS[0].id;

export function getKey() {
  return localStorage.getItem(KEY_LS) ?? "";
}
export function setKey(k: string) {
  if (k) localStorage.setItem(KEY_LS, k.trim());
  else localStorage.removeItem(KEY_LS);
}
export function hasKey() {
  return !!getKey();
}
export function getModel() {
  return localStorage.getItem(MODEL_LS) ?? DEFAULT_MODEL;
}
export function setModel(m: string) {
  localStorage.setItem(MODEL_LS, m);
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Streams a completion, calling onToken with each text chunk.
export async function chatStream(
  messages: ChatMessage[],
  onToken: (t: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const key = getKey();
  if (!key) throw new Error("No API key set.");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: getModel(),
      messages,
      stream: true,
      temperature: 0.7,
    }),
    signal,
  });

  if (!res.ok || !res.body) {
    let detail = `${res.status}`;
    try {
      const j = await res.json();
      detail = j?.error?.message ?? detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  let buffer = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const t = line.trim();
      if (!t.startsWith("data:")) continue;
      const data = t.slice(5).trim();
      if (data === "[DONE]") return full;
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) {
          full += delta;
          onToken(delta);
        }
      } catch {
        /* partial JSON, skip */
      }
    }
  }
  return full;
}
