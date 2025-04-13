'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!session) return;
      setLoading(true);

      try {
        const res = await fetch('/api/github/repos');
        const data = await res.json();
        setRepos(data.repos || []);
      } catch (err) {
        console.error('Failed to load repos', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [session]);

  if (!session) {
    return (
      <main className="p-4">
        <h1 className="text-2xl mb-4">Welcome to AI Code Review</h1>
        <button
          onClick={() => signIn('github')}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Sign in with GitHub
        </button>
      </main>
    );
  }

  return (
    <main className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <img src={session.user?.image || ''} alt="avatar" className="w-10 h-10 rounded-full" />
        <h1 className="text-xl">Hello, {session.user?.name} 👋</h1>
        <button
          onClick={() => signOut()}
          className="ml-auto px-3 py-1 bg-gray-200 rounded"
        >
          Sign out
        </button>
      </div>

      <h2 className="text-lg mb-2 font-semibold">Your GitHub Repositories:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {repos.map((repo) => (
            <li key={repo.id}>{repo.name} {repo.private && '(private)'}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
