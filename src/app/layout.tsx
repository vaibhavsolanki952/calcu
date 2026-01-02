import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Addition Speed Master',
  description: 'Learn fast addition tricks through gamified practice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </body>
    </html>
  )
}
