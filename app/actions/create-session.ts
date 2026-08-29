"use server";

import { auth } from "@clerk/nextjs/server";
import { WORKFLOW_ID } from "@/lib/config";

export async function createSession() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized - Please sign in");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  if (!WORKFLOW_ID) {
    throw new Error("WORKFLOW_ID not configured");
  }

  // Create ChatKit session with Clerk user ID
  const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
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
  });

  if (!response.ok) {
    // Log the full upstream reason server-side only — it echoes back a masked
    // form of the API key, so it must never reach the client bundle / logs UI.
    const detail = await response.text();
    console.error(
      `ChatKit session creation failed (${response.status}): ${detail}`,
    );
    throw new Error(
      "The AI chat is temporarily unavailable. Please try again later.",
    );
  }

  const data = await response.json();
  return data.client_secret as string;
}
