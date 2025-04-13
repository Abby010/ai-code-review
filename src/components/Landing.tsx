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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 text-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-bold mb-2 text-center"
      >
        AI Code Review
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg text-gray-300 mb-6 text-center"
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
        className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Sign in with GitHub
      </motion.button>
    </div>
  );
}
