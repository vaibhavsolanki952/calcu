'use client'

interface HeaderProps {
  correct: number
  total: number
  progress: number
}

export default function Header({ correct, total, progress }: HeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{correct}</span> Correct
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{total}</span> Done
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{Math.round(progress)}%</span> Progress
          </div>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-indigo-700 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
