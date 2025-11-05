'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const handleSignIn = () => {
    // Clear cookies and session before signing in
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    })

    signIn('spotify', { callbackUrl: '/roast' })
  }

  return (
    <div className="min-h-screen bg-[#191414] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/50 border border-[#1DB954]/20 rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>

        {error === 'OAuthCallback' && (
          <div className="space-y-4">
            <p className="text-gray-300">
              It looks like you tried to sign in with a different Spotify account.
            </p>
            <p className="text-gray-400 text-sm">
              Please try signing in again. We'll clear your session first.
            </p>
          </div>
        )}

        {error && error !== 'OAuthCallback' && (
          <p className="text-gray-300 mb-4">
            Error: {error}
          </p>
        )}

        <button
          onClick={handleSignIn}
          className="mt-6 w-full bg-[#1DB954] hover:bg-[#1ED760] text-white font-semibold py-3 px-6 rounded-full transition-colors"
        >
          Try Again with Spotify
        </button>

        <a
          href="/"
          className="block mt-4 text-gray-400 hover:text-white text-sm transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}
