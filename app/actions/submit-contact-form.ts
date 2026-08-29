"use server";

import { serverClient } from "@/sanity/lib/serverClient";

const MAX = { name: 100, email: 200, subject: 150, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Result = { success: boolean; error?: string };

export async function submitContactForm(formData: FormData): Promise<Result> {
  try {
    // Honeypot: real users never see or fill this field. Bots do.
    // Pretend success so we don't tell them why nothing happened.
    if (((formData.get("company") as string) || "").trim()) {
      return { success: true };
    }

    const name = ((formData.get("name") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const subject = ((formData.get("subject") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();

    if (!name || !email || !message) {
      return { success: false, error: "Please fill in all required fields" };
    }
    if (!EMAIL_RE.test(email)) {
      return { success: false, error: "Please enter a valid email address" };
    }
    if (
      name.length > MAX.name ||
      email.length > MAX.email ||
      subject.length > MAX.subject ||
      message.length > MAX.message
    ) {
      return { success: false, error: "One or more fields are too long" };
    }

    await serverClient.create({
      _type: "contact",
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Failed to submit the form. Please try again later.",
    };
  }
}
