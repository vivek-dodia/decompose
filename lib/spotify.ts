export interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: { name: string }
}

export interface SpotifyArtist {
  name: string
  genres: string[]
}

export interface SpotifyPlaylist {
  name: string
  tracks: { total: number }
}

export interface SpotifyUserData {
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
  recentlyPlayed: SpotifyTrack[]
  playlists: SpotifyPlaylist[]
  savedTracks: number
  following: number
}

export async function fetchSpotifyData(
  accessToken: string,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
): Promise<SpotifyUserData> {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  }

  try {
    // Fetch all data in parallel
    const [topTracksRes, topArtistsRes, recentlyPlayedRes, playlistsRes, savedTracksRes, followingRes] =
      await Promise.all([
        fetch(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`, { headers }),
        fetch(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`, { headers }),
        fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', { headers }),
        fetch('https://api.spotify.com/v1/me/playlists?limit=50', { headers }),
        fetch('https://api.spotify.com/v1/me/tracks?limit=1', { headers }),
        fetch('https://api.spotify.com/v1/me/following?type=artist&limit=1', { headers }),
      ])

    const [topTracks, topArtists, recentlyPlayed, playlists, savedTracks, following] = await Promise.all([
      topTracksRes.json(),
      topArtistsRes.json(),
      recentlyPlayedRes.json(),
      playlistsRes.json(),
      savedTracksRes.json(),
      followingRes.json(),
    ])

    return {
      topTracks: topTracks.items || [],
      topArtists: topArtists.items || [],
      recentlyPlayed: recentlyPlayed.items?.map((item: any) => item.track) || [],
      playlists: playlists.items || [],
      savedTracks: savedTracks.total || 0,
      following: following.artists?.total || 0,
    }
  } catch (error) {
    console.error('Error fetching Spotify data:', error)
    throw error
  }
}
