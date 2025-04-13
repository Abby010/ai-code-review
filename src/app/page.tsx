'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Landing from '@/components/Landing';
import { useGithubFile } from '@/hooks/useGithubFile';

export default function Home() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const { fileContent, loading: fileLoading, fetchFile } = useGithubFile();

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

  useEffect(() => {
    if (selectedRepo && selectedFilePath) {
      const [owner, repo] = selectedRepo.split('/');
      fetchFile(owner, repo, selectedFilePath);
    }
  }, [selectedRepo, selectedFilePath]);

  if (!session) return <Landing />;

  return (
    <main className="p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-6"
      >
        <img
          src={session.user?.image || ''}
          alt="avatar"
          className="w-12 h-12 rounded-full shadow"
        />
        <div>
          <h1 className="text-2xl font-semibold">Hello, {session.user?.name} 👋</h1>
          <p className="text-sm text-gray-500">{session.user?.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="ml-auto px-3 py-1 bg-gray-200 rounded"
        >
          Sign out
        </button>
      </motion.div>

      <h2 className="text-lg mb-2 font-semibold">Your GitHub Repositories:</h2>

      {loading ? (
        <p>Loading...</p>
      ) : repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {repos.map((repo) => (
            <motion.li
              key={repo.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white text-black rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedRepo(repo.fullName)}
            >
              <h3 className="font-semibold">{repo.name}</h3>
              {repo.private && (
                <span className="text-xs text-gray-500">🔒 Private</span>
              )}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {selectedRepo && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            📁 Selected repo: <strong>{selectedRepo}</strong>
          </p>
          {files.length > 0 ? (
            <ul className="pl-5 list-disc">
              {files.map((file) => (
                <li
                  key={file.path}
                  className="cursor-pointer hover:underline text-sm"
                  onClick={() => setSelectedFilePath(file.path)}
                >
                  {file.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No files found or loading...</p>
          )}
        </div>
      )}

      {selectedFilePath && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2">📄 Viewing: {selectedFilePath}</h3>
          {fileLoading ? (
            <p>Loading file content...</p>
          ) : (
            <pre className="bg-gray-100 text-black text-sm p-4 rounded whitespace-pre-wrap overflow-x-auto">
              {fileContent}
            </pre>
          )}
        </div>
      )}
    </main>
  );
}
