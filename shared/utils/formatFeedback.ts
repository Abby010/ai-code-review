import type { CodeReviewFeedback } from '@/../shared/types/codeReview';

export function parseFeedback(raw: string): CodeReviewFeedback[] {
  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      console.warn('[Formatter] Feedback is not an array');
      return [];
    }

    // Validate each entry
    return parsed
      .filter((item) => typeof item.line === 'number' && typeof item.message === 'string')
      .map((item) => ({
        line: item.line,
        message: item.message.trim(),
      }));
  } catch (err) {
    console.error('[Formatter] Failed to parse OpenAI output:', err);
    return [];
  }
}
