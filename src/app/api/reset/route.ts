import { NextResponse } from 'next/server'

export async function GET() {
  // Return a response that clears the store on the client side
  return NextResponse.json(
    { message: 'Storage will be cleared. Redirecting...' },
    {
      status: 200,
      headers: {
        'Set-Cookie': 'game-store=; Path=/; Max-Age=0',
      },
    }
  )
}
