"use client";

import { ArrowUp, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  CHAT_DISCLAIMER,
  CHAT_STYLES,
  type ChatStyle,
  DEFAULT_STYLE,
  STARTER_PROMPTS,
} from "@/lib/chat/config";
import type { CHAT_PROFILE_QUERY_RESULT } from "@/sanity.types";
import { useSidebar } from "../ui/sidebar";

type Msg = { role: "user" | "assistant"; content: string };

export function Chat({
  profile,
}: {
  profile: CHAT_PROFILE_QUERY_RESULT | null;
}) {
  const { toggleSidebar } = useSidebar();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [style, setStyle] = useState<ChatStyle>(DEFAULT_STYLE);
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const firstName = profile?.firstName ?? "Me";
  const greeting = profile?.firstName
    ? `Hi! I'm ${[profile.firstName, profile.lastName].filter(Boolean).join(" ")}. Ask me about my work, experience, or projects.`
    : "Hi there! Ask me anything about my work, experience, or projects.";

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  };

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;

    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    scrollToEnd();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, style }),
      });

      if (!res.ok || !res.body) {
        throw new Error(
          res.status === 401 ? "unauthorized" : `http ${res.status}`,
        );
      }

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += value;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
        scrollToEnd();
      }
      if (!acc.trim()) {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: "I didn't catch that — mind rephrasing?",
          };
          return next;
        });
      }
    } catch (err) {
      const msg =
        err instanceof Error && err.message === "unauthorized"
          ? "Please sign in to chat."
          : "Something went wrong — please try again.";
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: msg };
        return next;
      });
    } finally {
      setBusy(false);
      scrollToEnd();
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-semibold">Chat with {firstName}</span>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Close chat"
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{greeting}</p>
            <div className="grid gap-2">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  disabled={busy}
                  onClick={() => send(p.prompt)}
                  className="rounded-lg border px-3 py-2 text-left text-sm hover:bg-muted disabled:opacity-50"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: messages are append-only
              key={i}
              className={
                m.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] rounded-2xl bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "max-w-[85%] whitespace-pre-wrap rounded-2xl bg-muted px-3 py-2 text-sm"
                }
              >
                {m.content ||
                  (m.role === "assistant" && busy ? (
                    <span className="text-muted-foreground">…</span>
                  ) : null)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Composer */}
      <div className="border-t p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="rounded-xl border bg-card p-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={2}
            maxLength={2000}
            placeholder={`Message ${firstName}…`}
            disabled={busy}
            className="w-full resize-none bg-transparent px-2 py-1 text-sm outline-none disabled:opacity-50"
          />
          <div className="flex items-center justify-between px-1">
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as ChatStyle)}
              className="rounded-md bg-transparent text-xs text-muted-foreground outline-none"
              aria-label="Response style"
            >
              {(Object.keys(CHAT_STYLES) as ChatStyle[]).map((k) => (
                <option key={k} value={k}>
                  {CHAT_STYLES[k].label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="rounded-full bg-primary p-1.5 text-primary-foreground disabled:opacity-40"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </form>
        <p className="mt-2 px-1 text-center text-[11px] text-muted-foreground">
          {CHAT_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}

export default Chat;
