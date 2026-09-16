/**
 * Fast path for obvious portfolio-intent questions. The LLM topic filter often
 * treats "about yourself" / "your background" as unrelated personal chat.
 */
export function isClearlyPortfolioTopic(message: string): boolean {
  const text = message.toLowerCase().trim();
  if (!text) return false;

  const patterns: RegExp[] = [
    /\babout (?:yourself|you)\b/,
    /\btell me about (?:yourself|you)\b/,
    /\b(?:your|my) background\b/,
    /\bprofessional (?:background|history|journey|story)\b/,
    /\bcareer (?:history|journey|path|story|background)\b/,
    /\bwork (?:history|background|experience)\b/,
    /\byears of experience\b/,
    /\bwhere (?:have you|did you) work/,
    /\bwhat (?:do you|did you) do (?:for work|professionally)/,
    /\bwho are you\b/,
    /\bintroduce yourself\b/,
    /\bwhat(?:'s| is) your (?:role|job|title)\b/,
    /\bexperience at\b/,
    /\b(?:your|my) (?:skills|projects|certifications|education)\b/,
    /\bhow (?:can|do) i (?:reach|contact|hire) you\b/,
    /\bavailability\b/,
  ];

  return patterns.some((re) => re.test(text));
}
