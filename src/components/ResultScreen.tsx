'use client'

import { motion } from 'framer-motion'
import { Difficulty } from '@/lib/store'

interface ResultScreenProps {
  correct: number
  total: number
  timeTaken: number
  difficulty: Difficulty
  onNext: () => void
  onRestart: () => void
}

export default function ResultScreen({
  correct,
  total,
  timeTaken,
  difficulty,
  onNext,
  onRestart,
}: ResultScreenProps) {
  const accuracy = Math.round((correct / total) * 100)
  const timeInSeconds = Math.round(timeTaken / 1000)
  const timeInMinutes = Math.floor(timeInSeconds / 60)

  // Calculate stars based on accuracy and time
  let stars = 0
  let starMessage = ''

  if (accuracy >= 95 && timeInSeconds <= 60) {
    stars = 5
    starMessage = 'Perfect! Lightning Fast! 🚀'
  } else if (accuracy >= 90 && timeInSeconds <= 90) {
    stars = 5
    starMessage = 'Excellent Performance! 🌟'
  } else if (accuracy >= 85 && timeInSeconds <= 120) {
    stars = 4
    starMessage = 'Great Job! 👏'
  } else if (accuracy >= 80 && timeInSeconds <= 150) {
    stars = 4
    starMessage = 'Very Good! 💪'
  } else if (accuracy >= 70) {
    stars = 3
    starMessage = 'Good Progress! 😊'
  } else if (accuracy >= 60) {
    stars = 2
    starMessage = 'Keep Practicing! 📚'
  } else {
    stars = 1
    starMessage = 'Great Start! 🌱'
  }

  const starDisplay = '⭐'.repeat(stars) + '☆'.repeat(5 - stars)
  const difficultyLabels: Record<Difficulty, string> = {
    scratch: 'Scratch',
    beginner: 'Beginner',
    medium: 'Medium',
    advanced: 'Advanced',
  }

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
      <div className="px-8 py-16 text-center">
        <motion.h1 variants={itemVariants} className="text-4xl font-light text-gray-900 mb-4">
          Level Complete! 🎉
        </motion.h1>
        <motion.p variants={itemVariants} className="text-gray-600 mb-8">
          {difficultyLabels[difficulty]} Difficulty
        </motion.p>

        <motion.div variants={itemVariants} className="my-12 space-y-8">
          <div>
            <p className="text-6xl font-light text-indigo-600 mb-2">
              {starDisplay}
            </p>
            <p className="text-2xl font-light text-gray-800">{starMessage}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-8 rounded-lg">
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-600 mb-2">Correct</p>
              <p className="text-3xl font-light text-gray-900">
                {correct}/{total}
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-600 mb-2">Accuracy</p>
              <p className="text-3xl font-light text-gray-900">{accuracy}%</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-600 mb-2">Time</p>
              <p className="text-3xl font-light text-gray-900">
                {timeInMinutes}:{(timeInSeconds % 60).toString().padStart(2, '0')}
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-3 bg-blue-50 p-6 rounded-lg">
            <p className="text-lg font-light text-gray-800">
              Average: {Math.round(timeInSeconds / total)}s per question
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Next Level
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Restart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

