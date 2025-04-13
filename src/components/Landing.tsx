'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const taglines = [
  'Let\'s debug this together.',
  'Your AI code reviewer is ready.',
  'The fun side of clean code.',
  'AI meets GitHub brilliance.',
  'Say goodbye to code smell.'
];

export default function Landing() {
  const [tagline, setTagline] = useState('');

  useEffect(() => {
    const random = taglines[Math.floor(Math.random() * taglines.length)];
    setTagline(random);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-300 text-gray-800 p-6 overflow-hidden">
      {/* Animated robot illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <Image
          src="/robot-coder.svg" // You should add this SVG to /public
          alt="Friendly robot illustration"
          width={250}
          height={250}
        />
      </motion.div>

      {/* App title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-bold mb-2 text-center"
      >
        AI Code Review
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg text-gray-600 mb-6 text-center"
      >
        {tagline}
      </motion.p>

      {/* GitHub login button */}
      <motion.button
        onClick={() => window.location.href = '/api/auth/signin/github'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition"
      >
        Sign in with GitHub
      </motion.button>
    </div>
  );
}
