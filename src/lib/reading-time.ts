/** Plain-text word count from Portable Text blocks (for read-time badges). */

function wordsFromSpans(blocks: unknown[] | undefined, words: string[]) {
  if (!blocks?.length) return;
  for (const block of blocks) {
    if (!block || typeof block !== "object") continue;
    const b = block as Record<string, unknown>;
    if (b._type === "block" && Array.isArray(b.children)) {
      for (const span of b.children as { text?: string }[]) {
        if (typeof span?.text === "string" && span.text) {
          words.push(...span.text.trim().split(/\s+/).filter(Boolean));
        }
      }
    }
  }
}

function wordsFromFaqs(faqs: { question: string; answer: string }[] | undefined, words: string[]) {
  for (const f of faqs ?? []) {
    if (f.question) words.push(...f.question.trim().split(/\s+/).filter(Boolean));
    if (f.answer) words.push(...f.answer.trim().split(/\s+/).filter(Boolean));
  }
}

export function estimateReadingMinutes(
  body: unknown[] | undefined,
  faqs?: { question: string; answer: string }[] | undefined,
  wpm = 200,
): number {
  const words: string[] = [];
  wordsFromSpans(body, words);
  wordsFromFaqs(faqs, words);
  return Math.max(1, Math.round(words.length / wpm));
}
