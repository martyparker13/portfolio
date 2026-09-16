import "server-only";

import { cache } from "react";
import { client } from "@/sanity/lib/client";

const CHAT_PORTFOLIO_QUERY = `{
  "profile": *[_id == "singleton-profile"][0]{
    firstName,
    lastName,
    headline,
    shortBio,
    location,
    availability,
    yearsOfExperience
  },
  "experience": *[_type == "experience"] | order(startDate desc){
    company,
    position,
    employmentType,
    location,
    startDate,
    endDate,
    current,
    description,
    responsibilities,
    achievements,
    technologies[]->{name, category}
  }
}`;

type PortableTextBlock = {
  children?: { text?: string }[];
};

function portableTextToPlain(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((block) => {
      const b = block as PortableTextBlock;
      return (b.children ?? []).map((c) => c.text ?? "").join("");
    })
    .join("\n")
    .trim();
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "present";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export type ChatPortfolioData = {
  profile: {
    firstName?: string;
    lastName?: string;
    headline?: string;
    shortBio?: string;
    location?: string;
    availability?: string;
    yearsOfExperience?: number;
  } | null;
  experience: {
    company?: string;
    position?: string;
    employmentType?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    description?: unknown;
    responsibilities?: string[];
    achievements?: string[];
    technologies?: { name?: string; category?: string }[];
  }[];
};

/** Formats Sanity portfolio data as plain text for the twin system prompt. */
export function formatPortfolioContext(data: ChatPortfolioData): string {
  const lines: string[] = [];
  const p = data.profile;
  if (p) {
    const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
    if (name) lines.push(`Name: ${name}`);
    if (p.headline) lines.push(`Headline: ${p.headline}`);
    if (p.shortBio) lines.push(`Bio: ${p.shortBio}`);
    if (p.location) lines.push(`Location: ${p.location}`);
    if (p.availability) lines.push(`Availability: ${p.availability}`);
    if (typeof p.yearsOfExperience === "number") {
      lines.push(`Years of experience (profile field): ${p.yearsOfExperience}`);
    }
  }

  if (data.experience.length === 0) {
    lines.push("Work experience: (none in CMS)");
  } else {
    lines.push("Work experience (most recent first):");
    for (const exp of data.experience) {
      const range = `${formatDate(exp.startDate)} – ${
        exp.current ? "present" : formatDate(exp.endDate)
      }`;
      lines.push(
        `- ${exp.position ?? "Role"} at ${exp.company ?? "Company"} (${range})${
          exp.location ? `, ${exp.location}` : ""
        }${exp.employmentType ? `, ${exp.employmentType}` : ""}`,
      );
      const desc = portableTextToPlain(exp.description);
      if (desc) lines.push(`  Summary: ${desc}`);
      if (exp.responsibilities?.length) {
        lines.push(`  Responsibilities: ${exp.responsibilities.join("; ")}`);
      }
      if (exp.achievements?.length) {
        lines.push(`  Achievements: ${exp.achievements.join("; ")}`);
      }
      const tech = (exp.technologies ?? [])
        .map((t) => t.name)
        .filter(Boolean)
        .join(", ");
      if (tech) lines.push(`  Technologies: ${tech}`);
    }
  }

  return lines.join("\n");
}

export const loadChatPortfolioContext = cache(async (): Promise<string> => {
  try {
    const data = await client.fetch<ChatPortfolioData>(CHAT_PORTFOLIO_QUERY);
    return formatPortfolioContext({
      profile: data?.profile ?? null,
      experience: data?.experience ?? [],
    });
  } catch (err) {
    console.error("loadChatPortfolioContext failed:", err);
    return "";
  }
});
