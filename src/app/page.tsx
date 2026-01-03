'use client'

import { useState, useCallback, useEffect } from 'react'
import GameScreen from '@/components/GameScreen'
import ResultScreen from '@/components/ResultScreen'
import { Level, useGameStore } from '@/lib/store'
import { tricks } from '@/lib/tricks'

const TOTAL_LEVELS = 5 as const

export default function AdditionTricks() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [screen, setScreen] = useState<'game' | 'result'>('game')
  const [currentLevel, setCurrentLevel] = useState<Level>(1)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [lastGameStats, setLastGameStats] = useState<{ correct: number; total: number } | null>(null)
  const { initializeLevel, updateProgress } = useGameStore()

  const currentTrick = tricks[0] // Single trick for all levels

  // Hydrate and check for incomplete games
  useEffect(() => {
    const store = useGameStore.getState()
    
    // Check if there's incomplete progress to resume
    for (let level = 1; level <= TOTAL_LEVELS; level++) {
      const levelNum = level as Level
      const progress = store.getProgress(levelNum)
      
      // If progress exists but not completed, restore and resume
      if (progress && !progress.completed && progress.questionsAnswered < 25) {
        setCurrentLevel(levelNum)
        setStartTime(progress.startTime || Date.now())
        setScreen('game')
        setIsHydrated(true)
        return
      }
    }
    
    // Check if all levels completed
    let allCompleted = true
    for (let level = 1; level <= TOTAL_LEVELS; level++) {
      const levelNum = level as Level
      const progress = store.getProgress(levelNum)
      if (!progress.completed) {
        allCompleted = false
        break
      }
    }

    if (!allCompleted) {
      setCurrentLevel(1)
      setStartTime(Date.now())
      setScreen('game')
    } else {
      // All completed, show last level result
      const lastProgress = store.getProgress(5)
      if (lastProgress) {
        setCurrentLevel(5)
        setLastGameStats({ correct: lastProgress.correct, total: lastProgress.questionsAnswered })
        setStartTime(lastProgress.startTime || 0)
        setEndTime(lastProgress.endTime || 0)
        setScreen('result')
      }
    }

    setIsHydrated(true)
  }, [])

  const handleProgressUpdate = useCallback(
    (correct: number, questionsAnswered: number) => {
      // Save progress periodically during gameplay
      if (startTime) {
        updateProgress(
          currentLevel,
          correct,
          questionsAnswered,
          startTime,
          Date.now()
        )
      }
    },
    [currentLevel, startTime, updateProgress]
  )

  const handleGameEnd = useCallback(
    (correct: number, total: number) => {
      const now = Date.now()
      setLastGameStats({ correct, total })
      setEndTime(now)
      
      // Save progress to localStorage via Zustand
      if (startTime) {
        updateProgress(
          currentLevel,
          correct,
          total,
          startTime,
          now
        )
      }
      
      setScreen('result')
    },
    [currentLevel, startTime, updateProgress]
  )

  const handleNextLevel = useCallback(() => {
    // Move to next level
    if (currentLevel < TOTAL_LEVELS) {
      const nextLevel = (currentLevel + 1) as Level
      setCurrentLevel(nextLevel)
      setStartTime(Date.now())
      setScreen('game')
      initializeLevel(nextLevel)
    } else {
      // All levels completed - restart
      setCurrentLevel(1)
      setStartTime(Date.now())
      setScreen('game')
      initializeLevel(1)
    }
  }, [currentLevel, initializeLevel])

  const handleRestart = useCallback(() => {
    setCurrentLevel(1)
    setStartTime(Date.now())
    setScreen('game')
    setLastGameStats(null)
    setEndTime(null)
    initializeLevel(1)
  }, [initializeLevel])

  if (!isHydrated) {
    return null
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {screen === 'game' && startTime && (
        <GameScreen
          trick={currentTrick}
          level={currentLevel}
          onEnd={handleGameEnd}
          startTime={startTime}
          onProgressUpdate={handleProgressUpdate}
          initialCorrect={useGameStore.getState().getProgress(currentLevel)?.correct || 0}
          initialAnswered={useGameStore.getState().getProgress(currentLevel)?.questionsAnswered || 0}
        />
      )}
      {screen === 'result' && startTime && endTime && lastGameStats && (
        <ResultScreen
          correct={lastGameStats.correct}
          total={lastGameStats.total}
          timeTaken={endTime - startTime}
          level={currentLevel}
          onNext={handleNextLevel}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}