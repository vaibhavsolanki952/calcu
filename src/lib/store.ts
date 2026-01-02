'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Difficulty = 'scratch' | 'beginner' | 'medium' | 'advanced'

export interface LevelProgress {
  difficulty: Difficulty
  questionsAnswered: number
  correct: number
  startTime: number | null
  endTime: number | null
  completed: boolean
}

export interface TrickProgress {
  trickId: string
  levels: Record<Difficulty, LevelProgress>
  allCompleted: boolean
}

interface GameStore {
  progress: Record<string, TrickProgress>
  currentTrickId: string | null
  currentDifficulty: Difficulty
  totalQuestionsCompleted: number
  totalCorrect: number

  initializeTrick: (trickId: string) => void
  updateProgress: (
    trickId: string,
    difficulty: Difficulty,
    correct: number,
    questionsAnswered: number,
    startTime: number,
    endTime: number
  ) => void
  setCurrentTrick: (trickId: string) => void
  setCurrentDifficulty: (difficulty: Difficulty) => void
  getProgress: (trickId: string, difficulty: Difficulty) => LevelProgress | null
  reset: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      progress: {},
      currentTrickId: null,
      currentDifficulty: 'scratch',
      totalQuestionsCompleted: 0,
      totalCorrect: 0,

      initializeTrick: (trickId: string) => {
        set((state) => {
          if (!state.progress[trickId]) {
            state.progress[trickId] = {
              trickId,
              levels: {
                scratch: {
                  difficulty: 'scratch',
                  questionsAnswered: 0,
                  correct: 0,
                  startTime: null,
                  endTime: null,
                  completed: false,
                },
                beginner: {
                  difficulty: 'beginner',
                  questionsAnswered: 0,
                  correct: 0,
                  startTime: null,
                  endTime: null,
                  completed: false,
                },
                medium: {
                  difficulty: 'medium',
                  questionsAnswered: 0,
                  correct: 0,
                  startTime: null,
                  endTime: null,
                  completed: false,
                },
                advanced: {
                  difficulty: 'advanced',
                  questionsAnswered: 0,
                  correct: 0,
                  startTime: null,
                  endTime: null,
                  completed: false,
                },
              },
              allCompleted: false,
            }
          }
          return state
        })
      },

      updateProgress: (trickId, difficulty, correct, questionsAnswered, startTime, endTime) => {
        set((state) => {
          if (!state.progress[trickId]) {
            state.progress[trickId] = {
              trickId,
              levels: {
                scratch: {
                  difficulty: 'scratch',
                  questionsAnswered: 0,
                  correct: 0,
                  startTime: null,
                  endTime: null,
                  completed: false,
                },
                beginner: {
                  difficulty: 'beginner',
                  questionsAnswered: 0,
                  correct: 0,
                  startTime: null,
                  endTime: null,
                  completed: false,
                },
                medium: {
                  difficulty: 'medium',
                  questionsAnswered: 0,
                  correct: 0,
                  startTime: null,
                  endTime: null,
                  completed: false,
                },
                advanced: {
                  difficulty: 'advanced',
                  questionsAnswered: 0,
                  correct: 0,
                  startTime: null,
                  endTime: null,
                  completed: false,
                },
              },
              allCompleted: false,
            }
          }
          
          state.progress[trickId].levels[difficulty] = {
            difficulty,
            questionsAnswered,
            correct,
            startTime,
            endTime,
            completed: true,
          }
          
          return state
        })
      },

      setCurrentTrick: (trickId: string) => {
        set({ currentTrickId: trickId })
      },

      setCurrentDifficulty: (difficulty: Difficulty) => {
        set({ currentDifficulty: difficulty })
      },

      getProgress: (trickId: string, difficulty: Difficulty) => {
        const state = get()
        return state.progress[trickId]?.levels[difficulty] || null
      },

      reset: () => {
        set({
          progress: {},
          currentTrickId: null,
          currentDifficulty: 'scratch',
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
