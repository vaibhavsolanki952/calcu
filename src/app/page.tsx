'use client'

import { useState, useCallback, useEffect } from 'react'
import TipScreen from '@/components/TipScreen'
import GameScreen from '@/components/GameScreen'
import ResultScreen from '@/components/ResultScreen'
import { Difficulty, useGameStore } from '@/lib/store'
import { tricks } from '@/lib/tricks'

const difficulties: Difficulty[] = ['scratch', 'beginner', 'medium', 'advanced']

export default function AdditionTricks() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [screen, setScreen] = useState<'tip' | 'game' | 'result'>('tip')
  const [currentTrickIndex, setCurrentTrickIndex] = useState(0)
  const [currentDifficultyIndex, setCurrentDifficultyIndex] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [lastGameStats, setLastGameStats] = useState<{ correct: number; total: number } | null>(null)
  const { initializeTrick, updateProgress } = useGameStore()

  // Hydrate store from localStorage and check for incomplete games
  useEffect(() => {
    const store = useGameStore.getState()
    
    // Check if there's incomplete progress to resume
    for (let i = 0; i < tricks.length; i++) {
      const trick = tricks[i]
      for (let d = 0; d < difficulties.length; d++) {
        const difficulty = difficulties[d]
        const progress = store.getProgress(trick.id, difficulty)
        
        // If progress exists but not completed, restore and resume
        if (progress && !progress.completed && progress.questionsAnswered < 100) {
          setCurrentTrickIndex(i)
          setCurrentDifficultyIndex(d)
          setStartTime(progress.startTime || Date.now())
          setScreen('game')
          setIsHydrated(true)
          return
        }
      }
    }
    
    setIsHydrated(true)
  }, [])

  const currentTrick = tricks[currentTrickIndex]
  const currentDifficulty = difficulties[currentDifficultyIndex]

  const handleStartGame = useCallback(() => {
    initializeTrick(currentTrick.id)
    setStartTime(Date.now())
    setScreen('game')
  }, [currentTrick.id, initializeTrick])

  const handleProgressUpdate = useCallback(
    (correct: number, questionsAnswered: number) => {
      // Save progress periodically during gameplay
      if (startTime) {
        updateProgress(
          currentTrick.id,
          currentDifficulty,
          correct,
          questionsAnswered,
          startTime,
          Date.now()
        )
      }
    },
    [currentTrick.id, currentDifficulty, startTime, updateProgress]
  )

  const handleGameEnd = useCallback(
    (correct: number, total: number) => {
      const now = Date.now()
      setLastGameStats({ correct, total })
      setEndTime(now)
      
      // Save progress to localStorage via Zustand
      if (startTime) {
        updateProgress(
          currentTrick.id,
          currentDifficulty,
          correct,
          total,
          startTime,
          now
        )
      }
      
      setScreen('result')
    },
    [currentTrick.id, currentDifficulty, startTime, updateProgress]
  )

  const handleNextLevel = useCallback(() => {
    // Move to next difficulty
    if (currentDifficultyIndex < difficulties.length - 1) {
      setCurrentDifficultyIndex((prev) => prev + 1)
      setScreen('tip')
    } else if (currentTrickIndex < tricks.length - 1) {
      // Move to next trick
      setCurrentTrickIndex((prev) => prev + 1)
      setCurrentDifficultyIndex(0)
      setScreen('tip')
    } else {
      // All tricks completed - reset
      setCurrentTrickIndex(0)
      setCurrentDifficultyIndex(0)
      setScreen('tip')
    }
  }, [currentTrickIndex, currentDifficultyIndex])

  const handleRestart = useCallback(() => {
    setScreen('tip')
    setCurrentTrickIndex(0)
    setCurrentDifficultyIndex(0)
    setStartTime(null)
    setEndTime(null)
    setLastGameStats(null)
  }, [])

  if (!isHydrated) {
    return null
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {screen === 'tip' && (
        <TipScreen
          trick={currentTrick}
          difficulty={currentDifficulty}
          trickIndex={currentTrickIndex + 1}
          totalTricks={tricks.length}
          difficultyIndex={currentDifficultyIndex + 1}
          totalDifficulties={difficulties.length}
          onStart={handleStartGame}
        />
      )}
      {screen === 'game' && startTime && (
        <GameScreen
          trick={currentTrick}
          difficulty={currentDifficulty}
          onEnd={handleGameEnd}
          startTime={startTime}
          onProgressUpdate={handleProgressUpdate}
          initialCorrect={useGameStore.getState().getProgress(currentTrick.id, currentDifficulty)?.correct || 0}
          initialAnswered={useGameStore.getState().getProgress(currentTrick.id, currentDifficulty)?.questionsAnswered || 0}
        />
      )}
      {screen === 'result' && startTime && endTime && lastGameStats && (
        <ResultScreen
          correct={lastGameStats.correct}
          total={lastGameStats.total}
          timeTaken={endTime - startTime}
          difficulty={currentDifficulty}
          onNext={handleNextLevel}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

