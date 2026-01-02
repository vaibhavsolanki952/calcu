'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Trick, Question } from '@/lib/tricks'
import { Difficulty } from '@/lib/store'
import Header from './Header'
import { soundManager } from '@/lib/sound'

interface GameScreenProps {
  trick: Trick
  difficulty: Difficulty
  onEnd: (correct: number, total: number) => void
  startTime: number
  onProgressUpdate?: (correct: number, questionsAnswered: number) => void
  initialCorrect?: number
  initialAnswered?: number
}

const QUESTIONS_PER_LEVEL = 100

export default function GameScreen({
  trick,
  difficulty,
  onEnd,
  onProgressUpdate,
  initialCorrect = 0,
  initialAnswered = 0,
}: GameScreenProps) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [correct, setCorrect] = useState(initialCorrect)
  const [questionsAnswered, setQuestionsAnswered] = useState(initialAnswered)
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set())
  const [showFeedback, setShowFeedback] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    generateNewQuestion()
  }, [])

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Only respond to Enter or Space
      if (e.key !== 'Enter' && e.key !== ' ') return
      
      // Don't interfere with form submission
      if (e.target instanceof HTMLFormElement) return
      
      e.preventDefault()
      
      if (showFeedback) {
        handleNext()
      } else if (question && !showFeedback) {
        // Only submit if we have a question and are in question mode
        const form = document.querySelector('form') as HTMLFormElement
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true }))
        }
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [showFeedback, question])

  const generateNewQuestion = () => {
    let q: Question
    let attempts = 0
    do {
      q = trick.generateQuestion(difficulty)
      attempts++
    } while (usedQuestions.has(q.key) && attempts < 100)

    setQuestion(q)
    setUsedQuestions((prev) => new Set(prev).add(q.key))
    setAnswer('')
    setFeedback(null)
    setShowFeedback(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!question || !answer) return

    const userAnswer = parseInt(answer)
    const isCorrect = userAnswer === question.answer

    if (isCorrect) {
      setCorrect((prev) => prev + 1)
      soundManager.playCorrect()
      setFeedback(`✓ Correct!`)
    } else {
      soundManager.playIncorrect()
      setFeedback(
        `✗ Wrong. Answer: ${question.answer}`
      )
    }

    setShowFeedback(true)
  }

  const handleNext = () => {
    const newAnswered = questionsAnswered + 1
    const newCorrect = correct + (feedback?.includes('Correct') ? 1 : 0)

    // Save progress after each answer
    if (onProgressUpdate) {
      onProgressUpdate(newCorrect, newAnswered)
    }

    if (newAnswered >= QUESTIONS_PER_LEVEL) {
      soundManager.playLevelUp()
      onEnd(newCorrect, newAnswered)
      return
    }

    setQuestionsAnswered(newAnswered)
    setCorrect(newCorrect)
    generateNewQuestion()
  }

  const progress = (questionsAnswered / QUESTIONS_PER_LEVEL) * 100

  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col">
      <Header
        correct={correct}
        total={questionsAnswered}
        progress={progress}
      />

      <div className="flex-1 flex items-center justify-center px-6">
        {!showFeedback && question ? (
          <motion.div
            key={question.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center"
          >
            <p className="text-sm text-gray-500 mb-8 uppercase tracking-wide">
              Question {questionsAnswered + 1} of {QUESTIONS_PER_LEVEL}
            </p>
            <div className="text-7xl font-light text-gray-900 mb-16 font-mono tracking-wider">
              {question.display}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                ref={inputRef}
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer"
                className="w-full text-4xl font-light text-center py-4 border-b-2 border-gray-900 bg-transparent outline-none focus:border-indigo-600 transition-colors"
                autoFocus
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        ) : feedback && showFeedback ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center"
          >
            <div className="text-2xl font-light mb-6 text-gray-800">
              {feedback}
            </div>
            <motion.form
              onSubmit={(e) => {
                e.preventDefault()
                handleNext()
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.button
                type="submit"
                onClick={handleNext}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Next Question →
              </motion.button>
            </motion.form>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}
