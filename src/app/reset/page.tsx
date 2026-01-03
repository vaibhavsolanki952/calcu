'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/store'

export default function ResetPage() {
  const router = useRouter()
  const { reset } = useGameStore()

  useEffect(() => {
    // Clear the zustand store
    reset()
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('game-store')
      sessionStorage.clear()
    }

    // Redirect to home after 1 second
    setTimeout(() => {
      router.push('/')
      router.refresh()
    }, 1000)
  }, [reset, router])

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-light text-gray-900 mb-4">Resetting...</h1>
        <p className="text-gray-600">All data is being cleared. You'll be redirected shortly.</p>
      </div>
    </div>
  )
}
