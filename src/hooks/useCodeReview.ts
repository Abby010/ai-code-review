import { useState } from 'react';

export type Feedback = { line: number; message: string };

export function useCodeReview() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reviewCode = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error('Failed to get review');
      const data = await res.json();
      setFeedback(data.feedback);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { reviewCode, feedback, loading, error };
}
