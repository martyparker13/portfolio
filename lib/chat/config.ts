// Shared constants for the AI Twin chat (migrated off OpenAI Agent Builder to
// the Agents SDK — see lib/chat/workflow.ts).

export const CHAT_MODELS = {
  // Cheap classifier / short-reply agents.
  fast: "gpt-4.1-nano",
  // The main responder: does MCP tool calls + synthesises the answer.
  twin: "gpt-4.1-mini",
} as const;

export type ChatStyle = "crisp" | "clear" | "chatty";

export const CHAT_STYLES: Record<
  ChatStyle,
  { label: string; description: string }
> = {
  crisp: { label: "Crisp", description: "Concise and factual" },
  clear: { label: "Clear", description: "Focused and helpful" },
  chatty: { label: "Chatty", description: "Conversational companion" },
};

export const DEFAULT_STYLE: ChatStyle = "clear";

export const CHAT_DISCLAIMER =
  "This is my AI-powered twin. It may not be 100% accurate — please verify anything important.";

export const STARTER_PROMPTS = [
  {
    label: "What's your experience?",
    prompt: "Tell me about your professional experience and previous roles.",
  },
  {
    label: "What skills do you have?",
    prompt: "What technologies and languages do you specialise in?",
  },
  {
    label: "What have you built?",
    prompt: "Show me some of your most interesting projects.",
  },
  {
    label: "Who are you?",
    prompt: "Tell me a bit about yourself and your background.",
  },
] as const;

export const CHAT_UNAVAILABLE =
  "I'm having trouble answering right now — try again in a moment.";
