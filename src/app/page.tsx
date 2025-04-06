'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="p-4">
      {!session ? (
        <>
          <h1 className="text-2xl mb-4">Welcome to AI Code Review</h1>
          <button
            onClick={() => signIn('github')}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Sign in with GitHub
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl mb-2">Hello, {session.user?.name} 👋</h1>
          <img src={session.user?.image || ''} alt="avatar" className="w-12 h-12 rounded-full mb-2" />
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Sign out
          </button>
        </>
      )}
    </main>
  );
}
