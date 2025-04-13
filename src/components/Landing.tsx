'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

const taglines = [
  '🔥 Built with OpenAI + GitHub API',
  '⚡ Instant AI Code Reviews',
  '🔐 Secure GitHub Integration',
  '🚀 Launch Your PRs With Confidence',
  '💡 Find Bugs Before They Bite'
];

export default function Landing() {
  const [tagline, setTagline] = useState('');

  useEffect(() => {
    const random = taglines[Math.floor(Math.random() * taglines.length)];
    setTagline(random);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 text-white p-6">
      {/* 🔵 Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-purple-600 opacity-30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute top-[200px] right-[-100px] w-72 h-72 bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-100px] left-[40%] w-72 h-72 bg-blue-500 opacity-30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* 🔤 Content */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-bold mb-2 text-center z-10"
      >
        AI Code Review
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg text-gray-300 mb-6 text-center z-10"
      >
        {tagline}
      </motion.p>

      <motion.button
        onClick={() => signIn('github')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition z-10"
      >
        Sign in with GitHub
      </motion.button>
    </div>
  );
}
