'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const taglines = [
  "Let's debug this together.",
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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-red-600 text-white p-6 overflow-hidden">
      {/* Diagonal wave overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <svg
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-32 -left-32 w-[150%] h-[150%] rotate-45 opacity-20"
        >
          <path
            fill="white"
            d="M0,96L40,106.7C80,117,160,139,240,138.7C320,139,400,117,480,128C560,139,640,181,720,181.3C800,181,880,139,960,138.7C1040,139,1120,181,1200,202.7C1280,224,1360,224,1400,224L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>

      {/* Animated robot illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-6 z-10 relative"
      >
        <Image
          src="/robot-coder.svg"
          alt="Friendly robot illustration"
          width={250}
          height={250}
        />

        {/* Thought bubble */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-0 left-[220px] w-40 bg-white text-sm text-gray-700 p-3 rounded-lg shadow-lg"
        >
          <p>Analyzing code...</p>
        </motion.div>
      </motion.div>

      {/* App title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-bold mb-2 text-center z-10"
      >
        AI Code Review
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg text-white mb-6 text-center z-10"
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
        className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition z-10"
      >
        Sign in with GitHub
      </motion.button>
    </div>
  );
}
