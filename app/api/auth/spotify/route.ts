import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI

  // Scopes needed to get user data
  const scopes = [
    'user-read-email',
    'user-read-private',
    'user-top-read',
    'user-read-recently-played',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-read',
  ].join(' ')

  const params = new URLSearchParams({
    client_id: clientId!,
    response_type: 'code',
    redirect_uri: redirectUri!,
    scope: scopes,
  })

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`

  return NextResponse.redirect(authUrl)
}
