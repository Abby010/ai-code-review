'use client';

import { useState } from 'react';

type Props = {
  code: string;
};

export default function ReviewButton({ code }: Props) {
  const [feedback, setFeedback] = useState<{ line: number; message: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setFeedback(data.feedback || []);
    } catch (err) {
      console.error('AI review failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleReview}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Reviewing...' : 'Get AI Review'}
      </button>

      {feedback.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-gray-700">🔍 AI Feedback:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-800">
            {feedback.map((f, idx) => (
              <li key={idx}>
                Line {f.line}: {f.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
