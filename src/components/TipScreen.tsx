'use client'

import { motion } from 'framer-motion'
import { Trick } from '@/lib/tricks'
import { Difficulty } from '@/lib/store'

interface TipScreenProps {
  trick: Trick
  difficulty: Difficulty
  trickIndex: number
  totalTricks: number
  difficultyIndex: number
  totalDifficulties: number
  onStart: () => void
}

const difficultyLabels: Record<Difficulty, string> = {
  scratch: '🌱 Scratch - Start Here',
  beginner: '🚀 Beginner',
  medium: '⚡ Medium',
  advanced: '🔥 Advanced',
}

export default function TipScreen({
  trick,
  difficulty,
  trickIndex,
  totalTricks,
  difficultyIndex,
  totalDifficulties,
  onStart,
}: TipScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-2xl bg-white"
    >
      <div className="px-8 py-12">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-3">
            {trick.title}
          </h1>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Trick {trickIndex}/{totalTricks}</span>
            <span>•</span>
            <span>Level {difficultyIndex}/{totalDifficulties}</span>
          </div>
          <div className="mt-3 px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium inline-block">
            {difficultyLabels[difficulty]}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed font-light">
            {trick.description}
          </p>

          <div>
            <p className="font-medium text-gray-900 mb-3">Step 1:</p>
            <p className="text-gray-700 font-light">
              Add the necessary amount to make the number end in 0.
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-900 mb-3">Step 2:</p>
            <p className="text-gray-700 font-light">
              Add the remaining amount.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            {trick.examples.map((example, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center font-mono text-lg text-gray-800 mb-2"
              >
                {example}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          onClick={onStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  )
}

