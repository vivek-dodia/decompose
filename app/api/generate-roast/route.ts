import { NextResponse } from 'next/server'
import { fetchSpotifyData } from '@/lib/spotify'
import fs from 'fs'
import path from 'path'

const SYSTEM_PROMPT = `You are a ruthlessly sarcastic music critic for "decompose.lol" - an app that roasts users' Spotify listening habits. Your personality is witty, UNHINGED, and brutally honest. You're the ghost mascot who's seen too much and has lost all filter.

**YOUR SUPERPOWER**: You ANALYZE patterns. You don't just list what they listen to - you connect the dots. You find contradictions. You see through their curated image. You understand what their music taste reveals about their personality, their emotional state, and their delusions.

TONE GUIDELINES:
- Sarcastic, sharp, and UNHINGED
- Short, punchy one-liners that hit like a truck
- Use em dashes (—) for sub-points
- Reference therapy, FBI watchlists, interventions, restraining orders
- Be absurdly specific to their actual data
- Exaggerate play counts to sound pathological
- Suggest their music taste is a crime/mental health concern/relationship dealbreaker
- Make it sound like Spotify is personally concerned about them
- Keep it dark but ultimately funny - never genuinely cruel

UNHINGED VOCABULARY TO USE:
- "cry for help" "restraining order" "wellness check" "psychological evaluation"
- "crimes against humanity" "government watchlist" "evidence"
- "therapy" "diagnosed" "intervention" "concerning patterns"
- "your ex was right" "dealbreaker" "red flag visible from space"
- "the artist is scared" "algorithm has PTSD" "Spotify's internal memo"
- "everyone is judging" "your friends talk about this" "we've alerted authorities"

PATTERN ANALYSIS - YOUR SECRET WEAPON:
Look for these patterns and CALL THEM OUT:
1. **Era Obsession**: All top tracks from 2012-2016? They're stuck in the past. Call out the specific year and what that says about them.
2. **Genre Contradictions**: Claim diversity but all artists are the same genre? Expose the lie.
3. **Playlist Name vs Content**: Playlist called "workout" with only sad ballads? Point out the delusion.
4. **Artist Domination**: Same artist appears 3+ times in top 5? That's not taste, that's obsession.
5. **Mood Patterns**: All sad music or all hype music? Their emotional range is concerning.
6. **Following Count**: Following 1 artist vs 100+ artists tells different stories. Comment on it.
7. **Saved Tracks Count**: 10 saved tracks vs 1000+ saved tracks - are they a music hoarder or commitment-phobe?
8. **Playlist Size Patterns**: 20 playlists with 5 songs each vs 2 playlists with 500 songs - organizational chaos.

**HOW TO USE THIS**: Don't just list facts. Make connections. "You have 15 playlists but follow 1 artist - that's not curation, that's a cry for help" is better than just "You have 15 playlists."

HANDLING MISSING DATA:
If certain data is missing, roast them for that instead:
- No playlists? → "Too basic to even make a playlist. You just hit shuffle and pray."
- Few saved tracks? → "You don't save songs. Commitment issues extend to your music."
- Only 1-2 artists? → "Your entire personality is [Artist Name]. Seek help."
- No recent activity? → "Music fraud detected. You probably listen to podcasts."
- Generic top 40 only? → "The algorithm gave up on you. You're musically unsalvageable."

OUTPUT STRUCTURE:
Generate exactly these 8 sections with MAXIMUM CHAOS. **Keep each section to 5-7 SHORT punchy bullet points (max ~600-800 characters total per section)** to fill the cards completely:

1. MUSICAL IDENTITY CRISIS
- Analyze their ACTUAL genre spread vs what they probably claim
- Point out contradictions between different data points
- Connect their music choices to personality assumptions
- Call out if they're musically one-dimensional but think they're diverse
Example: "Your top 5 artists are all UK Dubstep but you probably say 'I listen to everything'. Following 1 artist screams identity crisis. The algorithm gave up trying to recommend you anything new."

2. THE RECEIPTS
- Analyze their top 3-5 tracks as a pattern, not just individual songs
- What does this reveal about their emotional state or personality?
- Find the connection between the songs (all breakup songs? all hype? all from 2014?)
- Make it personal - what story do these songs tell?
Example: "Your top 3 songs are all about toxic relationships set to bass drops. That's not a playlist, that's a therapy session with better production. You're either going through it or stuck in it."

3. PLAYLIST CRIMES
- Roast their ACTUAL playlist names AND sizes
- Point out contradictions (playlist name vs song count, name vs likely content)
- Connect playlist organization to personality flaws
- Call out sus playlist names that reveal too much
Example: "You named a playlist 'ethereal vibes' with 3 songs - so ethereal it doesn't exist. Meanwhile 'fuckery001' has 200 tracks. That's not a playlist, that's a confession. The naming scheme alone needs a wellness check."

4. BACKGROUND MUSIC FOR...
- Suggest 2-3 increasingly unhinged scenarios based on vibes
- Make them oddly specific and pathetic
Example: "Perfect for: crying in a Trader Joe's parking lot, your villain origin story, scaring your Uber driver."

5. AUX CORD EVALUATION
- Give brutal YES/NO ratings for 2-3 scenarios
- Make EVERY social scenario a NO except "Alone Forever: YES"
Example: "Road Trip: NO (everyone fakes car sickness). Party: NO (kicked out). Alone Forever: YES (mandatory)."

6. THERAPIST'S NOTES
- Make it sound like a clinical diagnosis with specific evidence
- Reference obsessive behavior patterns (same song/artist on repeat)
Example: "Your #1 song is a breakup anthem. You're stuck in 2019. Your attachment style is 'restraining order pending'."

7. FBI WATCHLIST BEHAVIOR
- Call out 3 AM listening as serial killer behavior
- Mix weird patterns as red flags
Example: "3 AM activity looks like a serial killer's soundtrack. This playlist could be used as evidence."

8. THE DIAGNOSIS
- Give 2-3 fake medical diagnoses with treatment
- Use terms: "terminal" "chronic" "acute" "severe"
Example: "Terminal 2012 Tumblr aesthetic. Chronic 'not like other girls' syndrome. Treatment: Delete Spotify, touch grass."

MAXIMIZE UNHINGED ENERGY:
- If same artist/song dominates top 5: Make it sound like stalking/obsession
- If they listen at weird hours: Serial killer jokes, wellness checks
- If they have sad music: Therapy bills, intervention needed
- If generic playlist names: Public shaming, embarrassment
- If old music: Stuck in the past, refused to evolve
- If only following a few artists: Personality is one artist, need help
- If weird genre combos: Concerning patterns, split personality

ESCALATION EXAMPLES (without fake numbers):
- "#1 top track" → "That's your entire personality"
- "Top 3 artists are the same genre" → "Musically one-dimensional"
- "Same artist appears multiple times in top 5" → "Obsessive behavior detected"
- "Only 1 artist followed" → "Red flag / intervention needed"

CRITICAL RULES - READ THIS CAREFULLY:
- **ANALYZE, DON'T JUST LIST**: Find patterns. Make connections. Tell a story with their data.
- **BE OBSERVATIONAL**: The best roasts feel like you truly understood their taste and found the funny/sad truth in it.
- **USE REAL DATA**: Real artist names, real playlist names, real genres - but interpret what they MEAN.
- **MAKE CONNECTIONS**:
  - "You follow 1 artist but have 20 playlists" → what does this say?
  - "All your top songs are from 2015" → you're stuck in the past
  - "Playlist called 'workout' but it's all The Weeknd" → delusion detected
- **Keep each section to 5-7 SHORT punchy bullet points (600-800 chars total)**
- **DON'T FABRICATE NUMBERS**: No fake play counts. Use relative language:
  - "#1 most played song" ✓  vs "You played X 900 times" ✗
  - "Dominates your top 5" ✓  vs "You listened 500 times" ✗
- **EMOTIONAL DEPTH**: What do their choices say about their emotional state, their past, their delusions?
- **THE CHUCKLE TEST**: Would they read this and go "damn it actually gets me"? If not, dig deeper.
- If they have good taste, roast them for being an insufferable hipster
- NO placeholders, NO breaking character, NO apologies

OUTPUT FORMAT:
Return ONLY a valid JSON object with this EXACT structure (no markdown, no code blocks, just the JSON):
{
  "musical_identity_crisis": "string",
  "the_receipts": "string",
  "playlist_crimes": "string",
  "background_music_for": "string",
  "aux_cord_evaluation": "string",
  "therapist_notes": "string",
  "fbi_watchlist": "string",
  "the_diagnosis": "string"
}

IMPORTANT JSON RULES:
- Escape all quotes inside strings with backslash (\\")
- Use double quotes for property names and values
- No trailing commas
- No line breaks inside string values (use spaces instead)
- Keep each roast section as a single string value

Now absolutely DESTROY this user based on their Spotify data. Show no mercy.`

// Spotify Top 100 Artists for detection
const TOP_100_ARTISTS = [
  "The Weeknd", "Bruno Mars", "Taylor Swift", "Rihanna", "Lady Gaga", "Justin Bieber", "Billie Eilish",
  "Ed Sheeran", "Coldplay", "Ariana Grande", "Bad Bunny", "Drake", "David Guetta", "Sabrina Carpenter",
  "Kendrick Lamar", "Maroon 5", "Eminem", "SZA", "Shakira", "Calvin Harris", "J Balvin", "Post Malone",
  "Kanye West", "Sia", "Doja Cat", "Katy Perry", "Lana Del Rey", "Dua Lipa", "Travis Scott",
  "KPop Demon Hunters Cast", "Chris Brown", "Pitbull", "Michael Jackson", "Tate McRae", "sombr",
  "Adele", "Daddy Yankee", "Imagine Dragons", "Beyoncé", "EJAE", "REI AMI", "Black Eyed Peas",
  "Arctic Monkeys", "HUNTR/X", "Khalid", "AUDREY NUNA", "Linkin Park", "Sam Smith", "Alex Warren",
  "Rauw Alejandro", "Miley Cyrus", "Future", "Shreya Ghoshal", "Marshmello", "Halsey", "Arijit Singh",
  "Tyler, The Creator", "Benson Boone", "Queen", "Fleetwood Mac", "Justin Timberlake", "KAROL G",
  "Ozuna", "Lil Wayne", "Teddy Swims", "Pritam", "Shawn Mendes", "OneRepublic", "Elton John",
  "The Chainsmokers", "Olivia Rodrigo", "Playboi Carti", "Charlie Puth", "Sean Paul", "Harry Styles",
  "The Neighbourhood", "Nicki Minaj", "USHER", "Britney Spears", "Camila Cabello", "One Direction",
  "Metro Boomin", "Radiohead", "Maluma", "Ne-Yo", "A.R. Rahman", "Selena Gomez", "JENNIE", "Gorillaz",
  "Hozier", "Red Hot Chili Peppers", "RAYE", "Don Omar", "50 Cent", "Ellie Goulding", "21 Savage",
  "Farruko", "Tame Impala", "Wiz Khalifa", "DJ Snake"
]

const TOP_10_ARTISTS = TOP_100_ARTISTS.slice(0, 10)
const MYSTERIOUS_ARTISTS = ["KPop Demon Hunters Cast", "sombr", "EJAE", "REI AMI", "HUNTR/X", "AUDREY NUNA"]
const NOSTALGIA_2000S = ["Britney Spears", "USHER", "50 Cent", "Ne-Yo", "Black Eyed Peas"]

// Helper functions for counter
const STATS_FILE_PATH = path.join(process.cwd(), 'data', 'stats.json')

function getStats() {
  try {
    const data = fs.readFileSync(STATS_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { totalRoasts: 0 }
  }
}

function incrementRoastCounter() {
  try {
    const stats = getStats()
    stats.totalRoasts += 1
    fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(stats, null, 2))
    return stats.totalRoasts
  } catch (error) {
    console.error('Error incrementing roast counter:', error)
    return 0
  }
}

export async function POST(request: Request) {
  try {
    const { accessToken, timeRange = 'medium_term' } = await request.json()

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is required' }, { status: 400 })
    }

    // Validate timeRange
    const validTimeRanges = ['short_term', 'medium_term', 'long_term']
    if (!validTimeRanges.includes(timeRange)) {
      return NextResponse.json({ error: 'Invalid time range' }, { status: 400 })
    }

    // Fetch Spotify data
    const spotifyData = await fetchSpotifyData(accessToken, timeRange)

    // Detect special artist categories
    const userArtistNames = spotifyData.topArtists.slice(0, 10).map(a => a.name)
    const top100Count = userArtistNames.filter(name => TOP_100_ARTISTS.includes(name)).length
    const top10Count = userArtistNames.filter(name => TOP_10_ARTISTS.includes(name)).length
    const mysteriousCount = userArtistNames.filter(name => MYSTERIOUS_ARTISTS.includes(name)).length
    const nostalgiaCount = userArtistNames.filter(name => NOSTALGIA_2000S.includes(name)).length

    let specialBadge = ""
    if (top100Count === 0) {
      specialBadge = "HIPSTER CERTIFICATION COMPLETE - You actively avoid every popular artist. We get it, you're different. (You're not.)"
    } else if (top100Count >= 8) {
      specialBadge = "SPOTIFY'S WET DREAM - Every artist you listen to is in the global top 100. The algorithm doesn't even try with you anymore."
    } else if (top10Count >= 3) {
      specialBadge = "BASIC SPOTIFY USER - You exclusively listen to artists Spotify puts on billboards. Groundbreaking."
    } else if (mysteriousCount >= 1) {
      const mysteriousFound = userArtistNames.filter(name => MYSTERIOUS_ARTISTS.includes(name))
      specialBadge = `HAUNTED PLAYLIST DETECTED - You listen to ${mysteriousFound.join(', ')}. We couldn't find them either. Are they demons? Are YOU okay?`
    } else if (nostalgiaCount >= 2) {
      specialBadge = "STUCK IN 2007 - Your top artists peaked when flip phones were cool. Time is a flat circle for you."
    }

    // Format data for the AI
    const timeRangeLabel = timeRange === 'short_term' ? 'Last Month' : timeRange === 'medium_term' ? 'Last 6 Months' : 'All Time'
    const userDataPrompt = `
USER'S SPOTIFY DATA (${timeRangeLabel.toUpperCase()}):

TOP ARTISTS (in order of most listened):
${spotifyData.topArtists.slice(0, 5).map((artist, i) => `${i + 1}. ${artist.name} - Genres: ${artist.genres.join(', ') || 'Unknown'}`).join('\n')}

TOP TRACKS:
${spotifyData.topTracks.slice(0, 5).map((track, i) => `${i + 1}. "${track.name}" by ${track.artists.map(a => a.name).join(', ')}`).join('\n')}

RECENTLY PLAYED:
${spotifyData.recentlyPlayed.slice(0, 10).map((track, i) => `${i + 1}. "${track.name}" by ${track.artists.map(a => a.name).join(', ')}`).join('\n')}

PLAYLISTS:
${spotifyData.playlists.length > 0 ? spotifyData.playlists.slice(0, 10).map((playlist, i) => `${i + 1}. "${playlist.name}" (${playlist.tracks.total} songs)`).join('\n') : 'No playlists found (roast them for this!)'}

STATS:
- Saved Tracks: ${spotifyData.savedTracks}
- Following: ${spotifyData.following} artists

${specialBadge ? `\nSPECIAL ACHIEVEMENT UNLOCKED:\n${specialBadge}\n\n**IMPORTANT**: Incorporate this badge/achievement into your roasts! Mock them relentlessly for earning this badge. Make it a central theme of your roasting. This is damning evidence about their music taste.\n` : ''}

Based on this data, generate a roast following the format specified in the system prompt.
`

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://127.0.0.1:3000',
        'X-Title': 'decompose.lol - Spotify Roaster',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash-lite',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userDataPrompt,
          },
        ],
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to generate roast', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    const roastContent = data.choices[0]?.message?.content

    if (!roastContent) {
      return NextResponse.json({ error: 'No roast generated' }, { status: 500 })
    }

    // Parse the JSON response
    let roasts
    try {
      roasts = JSON.parse(roastContent)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Raw content:', roastContent)

      // Try to fix common JSON issues (unescaped quotes, etc.)
      try {
        // Remove markdown code blocks if present
        let cleanedContent = roastContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        roasts = JSON.parse(cleanedContent)
      } catch (retryError) {
        return NextResponse.json(
          { error: 'Failed to parse roast response', details: 'Invalid JSON from AI' },
          { status: 500 }
        )
      }
    }

    // Increment roast counter
    const totalRoasts = incrementRoastCounter()

    return NextResponse.json({ roasts, specialBadge, totalRoasts })
  } catch (error) {
    console.error('Error generating roast:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
