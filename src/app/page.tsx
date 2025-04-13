'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Landing from '@/components/Landing';

export default function Home() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  // Fetch user repos
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

  // Fetch files when a repo is selected
  useEffect(() => {
    const fetchFiles = async () => {
      if (!selectedRepo) return;
      const [owner, repo] = selectedRepo.split('/');
      const res = await fetch('/api/github/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner, repo }),
      });
      const data = await res.json();
      setFiles(data.files || []);
    };

    fetchFiles();
  }, [selectedRepo]);

  // Not logged in — show animated landing page
  if (!session) {
    return <Landing />;
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
            <li
              key={repo.id}
              className="cursor-pointer hover:underline"
              onClick={() => setSelectedRepo(repo.fullName)}
            >
              {repo.name} {repo.private && '(private)'}
            </li>
          ))}
        </ul>
      )}

      {selectedRepo && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Selected repo: <strong>{selectedRepo}</strong>
          </p>
          {files.length > 0 ? (
            <ul className="pl-5 list-disc">
              {files.map((file) => (
                <li key={file.path}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p>No files found or loading...</p>
          )}
        </div>
      )}
    </main>
  );
}
