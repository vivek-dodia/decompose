import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL('/?error=access_denied', request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token')
    }

    // Fetch user profile to get username
    const profileResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    const profile = await profileResponse.json()

    // Redirect to roast page with access token and username
    const redirectUrl = new URL('/roast', request.url)
    redirectUrl.searchParams.set('username', profile.display_name || profile.id)
    redirectUrl.searchParams.set('access_token', tokenData.access_token)

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
  }
}
