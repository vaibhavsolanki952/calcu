'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Level = 1 | 2 | 3 | 4 | 5

export interface LevelProgress {
  level: Level
  questionsAnswered: number
  correct: number
  startTime: number | null
  endTime: number | null
  completed: boolean
}

interface GameStore {
  currentLevel: Level
  levelProgress: Record<Level, LevelProgress>
  totalQuestionsCompleted: number
  totalCorrect: number

  initializeLevel: (level: Level) => void
  updateProgress: (
    level: Level,
    correct: number,
    questionsAnswered: number,
    startTime: number,
    endTime: number
  ) => void
  setCurrentLevel: (level: Level) => void
  getProgress: (level: Level) => LevelProgress
  reset: () => void
}

const createLevelProgress = (level: Level): LevelProgress => ({
  level,
  questionsAnswered: 0,
  correct: 0,
  startTime: null,
  endTime: null,
  completed: false,
})

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentLevel: 1,
      levelProgress: {
        1: createLevelProgress(1),
        2: createLevelProgress(2),
        3: createLevelProgress(3),
        4: createLevelProgress(4),
        5: createLevelProgress(5),
      },
      totalQuestionsCompleted: 0,
      totalCorrect: 0,

      initializeLevel: (level: Level) => {
        set((state) => {
          if (!state.levelProgress[level].startTime) {
            state.levelProgress[level].startTime = Date.now()
          }
          return state
        })
      },

      updateProgress: (level, correct, questionsAnswered, startTime, endTime) => {
        set((state) => {
          state.levelProgress[level] = {
            level,
            questionsAnswered,
            correct,
            startTime,
            endTime,
            completed: questionsAnswered >= 25,
          }
          state.totalQuestionsCompleted += 1
          state.totalCorrect += (correct > 0 ? 1 : 0)
          return state
        })
      },

      setCurrentLevel: (level: Level) => {
        set({ currentLevel: level })
      },

      getProgress: (level: Level) => {
        const state = get()
        return state.levelProgress[level]
      },

      reset: () => {
        set({
          currentLevel: 1,
          levelProgress: {
            1: createLevelProgress(1),
            2: createLevelProgress(2),
            3: createLevelProgress(3),
            4: createLevelProgress(4),
            5: createLevelProgress(5),
          },
          totalQuestionsCompleted: 0,
          totalCorrect: 0,
        })
      },
    }),
    {
      name: 'game-store',
      skipHydration: false,
    }
  )
)
