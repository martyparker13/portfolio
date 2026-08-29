"use server";

import { auth } from "@clerk/nextjs/server";
import { WORKFLOW_ID } from "@/lib/config";

const OPENAI_TIMEOUT_MS = 10_000;
const UNAVAILABLE =
  "The AI chat is temporarily unavailable. Please try again later.";

export async function createSession() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized - Please sign in");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("createSession: OPENAI_API_KEY not configured");
    throw new Error(UNAVAILABLE);
  }

  if (!WORKFLOW_ID) {
    console.error(
      "createSession: NEXT_PUBLIC_CHATKIT_WORKFLOW_ID not configured",
    );
    throw new Error(UNAVAILABLE);
  }

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "chatkit_beta=v1",
      },
      body: JSON.stringify({
        workflow: { id: WORKFLOW_ID },
        user: userId,
      }),
      signal: AbortSignal.timeout(OPENAI_TIMEOUT_MS),
    });
  } catch (error) {
    // Network error or timeout — never surface upstream detail to the client.
    console.error("createSession: request to OpenAI failed:", error);
    throw new Error(UNAVAILABLE);
  }

  if (!response.ok) {
    // Log the full upstream reason server-side only — it echoes back a masked
    // form of the API key, so it must never reach the client bundle / logs UI.
    const detail = await response.text().catch(() => "<no body>");
    console.error(
      `createSession: ChatKit session creation failed (${response.status}): ${detail}`,
    );
    throw new Error(UNAVAILABLE);
  }

  const data = (await response.json().catch(() => null)) as {
    client_secret?: string;
  } | null;

  if (!data?.client_secret) {
    console.error("createSession: response missing client_secret", data);
    throw new Error(UNAVAILABLE);
  }

  return data.client_secret;
}
