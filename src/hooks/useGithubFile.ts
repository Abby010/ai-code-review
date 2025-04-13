'use client';

import { useState } from 'react';

export function useGithubFile() {
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFile = async (owner: string, repo: string, path: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/github/file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner, repo, path }),
      });

      const data = await res.json();
      setFileContent(data.content || '');
    } catch (err) {
      console.error('Error fetching file:', err);
    } finally {
      setLoading(false);
    }
  };

  return { fileContent, loading, fetchFile };
}
