import { auth } from "@clerk/nextjs/server";
import { CHAT_STYLES, type ChatStyle, DEFAULT_STYLE } from "@/lib/chat/config";
import { type ChatMessage, runChat } from "@/lib/chat/workflow";

// The Agents SDK needs the Node runtime; the twin's MCP calls can be slow.
export const runtime = "nodejs";
export const maxDuration = 60;

function isMessage(v: unknown): v is ChatMessage {
  if (!v || typeof v !== "object") return false;
  const m = v as Record<string, unknown>;
  return (
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string"
  );
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Sign in to chat.", { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON.", { status: 400 });
  }

  const raw = (body as { messages?: unknown })?.messages;
  const messages = Array.isArray(raw) ? raw.filter(isMessage) : [];
  if (messages.length === 0) {
    return new Response("No messages.", { status: 400 });
  }
  // Cap history to keep latency and token use bounded.
  const trimmed = messages.slice(-20);

  const styleInput = (body as { style?: unknown })?.style;
  const style: ChatStyle =
    typeof styleInput === "string" && styleInput in CHAT_STYLES
      ? (styleInput as ChatStyle)
      : DEFAULT_STYLE;

  const textStream = await runChat({ messages: trimmed, style });

  return new Response(textStream.pipeThrough(new TextEncoderStream()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
