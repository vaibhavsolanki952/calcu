'use client'

import { useState, useCallback, useEffect } from 'react'
import TipScreen from '@/components/TipScreen'
import GameScreen from '@/components/GameScreen'
import ResultScreen from '@/components/ResultScreen'
import { Level, useGameStore } from '@/lib/store'
import { tricks } from '@/lib/tricks'

const TOTAL_LEVELS = 5 as const

export default function AdditionTricks() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [screen, setScreen] = useState<'tip' | 'game' | 'result'>('tip')
  const [currentTrickIndex, setCurrentTrickIndex] = useState(0)
  const [currentLevel, setCurrentLevel] = useState<Level>(1)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [lastGameStats, setLastGameStats] = useState<{ correct: number; total: number } | null>(null)
  const { initializeLevel, updateProgress } = useGameStore()

  const currentTrick = tricks[currentTrickIndex]

  // Hydrate and check for incomplete games
  useEffect(() => {
    const store = useGameStore.getState()
    
    // Check if there's incomplete progress to resume
    for (let trickIdx = 0; trickIdx < tricks.length; trickIdx++) {
      for (let level = 1; level <= TOTAL_LEVELS; level++) {
        const levelNum = level as Level
        const progress = store.getProgress(levelNum)
        
        if (progress && !progress.completed && progress.questionsAnswered < 25) {
          setCurrentTrickIndex(trickIdx)
          setCurrentLevel(levelNum)
          setStartTime(progress.startTime || Date.now())
          setScreen('game')
          setIsHydrated(true)
          return
        }
      }
    }
    
    setIsHydrated(true)
  }, [])

  const handleStartGame = useCallback(() => {
    initializeLevel(currentLevel)
    setStartTime(Date.now())
    setScreen('game')
  }, [currentLevel, initializeLevel])

  const handleProgressUpdate = useCallback(
    (correct: number, questionsAnswered: number) => {
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
    // Move to next level within same trick
    if (currentLevel < TOTAL_LEVELS) {
      const nextLevel = (currentLevel + 1) as Level
      setCurrentLevel(nextLevel)
      setStartTime(Date.now())
      setScreen('game')
      initializeLevel(nextLevel)
    } else {
      // All levels of current trick completed
      if (currentTrickIndex < tricks.length - 1) {
        // Move to next trick
        setCurrentTrickIndex((prev) => prev + 1)
        setCurrentLevel(1)
        setScreen('tip')
      } else {
        // All tricks completed - restart from beginning
        setCurrentTrickIndex(0)
        setCurrentLevel(1)
        setScreen('tip')
      }
    }
  }, [currentLevel, currentTrickIndex, initializeLevel])

  const handleRestart = useCallback(() => {
    setCurrentTrickIndex(0)
    setCurrentLevel(1)
    setStartTime(null)
    setEndTime(null)
    setLastGameStats(null)
    setScreen('tip')
    initializeLevel(1)
  }, [initializeLevel])

  if (!isHydrated) {
    return null
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {screen === 'tip' && (
        <TipScreen
          trick={currentTrick}
          level={currentLevel}
          trickIndex={currentTrickIndex + 1}
          totalTricks={tricks.length}
          difficultyIndex={currentLevel}
          totalDifficulties={TOTAL_LEVELS}
          onStart={handleStartGame}
        />
      )}
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