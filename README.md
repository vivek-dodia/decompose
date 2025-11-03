# decompose.lol

A web app that roasts your Spotify music taste using AI. Get brutally honest feedback about your playlists, top artists, and listening habits.

**Live:** [decompose.lol](https://decompose.lol)

## Features

- Spotify OAuth integration for secure authentication
- AI-powered roasts using OpenRouter (Grok model)
- Analyzes top artists, tracks, playlists, and listening patterns
- Special badges for unique music taste categories
- Glitch effects and animations on landing page
- Roast counter with persistent database storage
- Screenshot sharing functionality

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Auth:** NextAuth.js v4
- **Database:** Vercel Postgres (Neon)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **AI:** OpenRouter API (x-ai/grok-code-fast-1)
- **Deployment:** Vercel

## Prerequisites

- Node.js 18+ and pnpm
- Spotify Developer Account
- OpenRouter API Key
- Vercel Account (for deployment)

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/vivek-dodia/decompose.lol.git
cd decompose.lol
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://127.0.0.1:3000/api/auth/callback/spotify`
4. Copy Client ID and Client Secret

### 4. Get OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai)
2. Create an account and generate API key

### 5. Create `.env.local`

```bash
# Spotify OAuth
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# NextAuth
AUTH_SECRET=your_generated_secret  # Generate with: openssl rand -base64 32

# OpenRouter AI
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=x-ai/grok-code-fast-1

# Database (only needed for production, local uses file system)
# POSTGRES_URL=your_postgres_url
```

### 6. Initialize local counter

The app will automatically create `data/stats.json` to track roast counts locally.

### 7. Run development server

```bash
pnpm dev
```

Visit `http://127.0.0.1:3000`

## Production Deployment (Vercel)

### 1. Connect GitHub repo to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Framework: Next.js (auto-detected)
4. Root Directory: `./`

### 2. Set up Vercel Postgres (Neon)

1. Go to Vercel project → Storage tab
2. Create Database → Select **Neon** (Serverless Postgres)
3. Choose all environments (Development, Preview, Production)
4. Set custom prefix to **`POSTGRES`**
5. Create database

Vercel will automatically add all `POSTGRES_*` environment variables.

### 3. Add Environment Variables

Add these to Vercel project settings:

```bash
# Spotify OAuth
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# NextAuth
AUTH_SECRET=your_generated_secret
NEXTAUTH_URL=https://decompose.lol  # Your production domain

# OpenRouter AI
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=x-ai/grok-code-fast-1

# Postgres variables are auto-added by Vercel
```

### 4. Update Spotify Redirect URIs

Add ALL these redirect URIs to your Spotify app:

```
http://127.0.0.1:3000/api/auth/callback/spotify
https://decompose-lol.vercel.app/api/auth/callback/spotify
https://decompose.lol/api/auth/callback/spotify
https://www.decompose.lol/api/auth/callback/spotify
```

**Important:** Include both `www` and non-`www` versions!

### 5. Initialize Production Database

After deployment, visit once:
```
https://decompose.lol/api/db/init
```

This creates the table and initializes the roast counter.

## Project Structure

```
decompose/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth routes
│   │   ├── generate-roast/         # AI roast generation
│   │   └── db/init/                # Database initialization
│   ├── roast/                      # Roast results page
│   ├── page.tsx                    # Landing page
│   └── layout.tsx                  # Root layout with SessionProvider
├── components/
│   ├── session-provider.tsx        # Client-side session wrapper
│   └── mesh-gradient-svg.tsx       # Animated background
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   ├── db.ts                       # Database functions
│   └── spotify.ts                  # Spotify API client
├── types/
│   └── next-auth.d.ts              # TypeScript type extensions
└── data/
    └── stats.json                  # Local roast counter (dev only)
```

## Key Files

### Authentication (`lib/auth.ts`)
- NextAuth v4 configuration
- Spotify OAuth provider
- JWT and session callbacks for token management

### Database (`lib/db.ts`)
- Postgres connection using `@vercel/postgres`
- Roast counter increment/retrieve functions
- Table initialization

### Roast Generation (`app/api/generate-roast/route.ts`)
- Fetches Spotify user data
- Generates AI roasts using OpenRouter
- Increments global roast counter
- Returns special badges

### Spotify Client (`lib/spotify.ts`)
- Fetches top artists, tracks, playlists
- Handles Spotify Web API calls
- Uses NextAuth session tokens

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `SPOTIFY_CLIENT_ID` | Spotify app client ID | Yes |
| `SPOTIFY_CLIENT_SECRET` | Spotify app secret | Yes |
| `AUTH_SECRET` | NextAuth encryption secret | Yes |
| `NEXTAUTH_URL` | Production domain (e.g., https://decompose.lol) | Production only |
| `OPENROUTER_API_KEY` | OpenRouter API key | Yes |
| `OPENROUTER_MODEL` | AI model to use | Yes |
| `POSTGRES_URL` | Database connection string | Production only |

## Known Issues & Future Work

### Mobile Aspect Ratio
- **Status:** Needs optimization
- **Issue:** Layout not fully optimized for mobile screens
- **Priority:** High
- **Notes:** Landing page and roast results need responsive design improvements

### Future Enhancements
- [ ] Mobile-responsive layout
- [ ] Share roast directly to social media
- [ ] Multiple AI model options
- [ ] Roast history for logged-in users
- [ ] Custom roast intensity settings
- [ ] Dark/light mode toggle

## Development Notes

### NextAuth v4 Migration
- Migrated from v5 beta to v4 stable for production readiness
- Uses shared `authOptions` configuration
- JWT-based sessions with encrypted tokens

### Database Migration
- Migrated from file-based counter (`data/stats.json`) to Vercel Postgres
- Maintains counter across deployments
- Initialized with 99 from local development

### Spotify OAuth
- Requires exact redirect URI matches (including `www` vs non-`www`)
- Uses loopback IP `127.0.0.1` for local development (Spotify requirement)
- Scopes: user-read-email, user-top-read, user-library-read, playlist-read-private, etc.

## Troubleshooting

### "INVALID_CLIENT: Invalid redirect URI"
- Check all redirect URIs are added to Spotify Dashboard
- Ensure `NEXTAUTH_URL` is set in production
- Verify both `www` and non-`www` versions are registered

### Database connection errors
- Verify `POSTGRES_URL` is set in Vercel
- Run `/api/db/init` to initialize tables
- Check Neon database is active

### "Failed to generate roast"
- Check OpenRouter API key is valid
- Verify Spotify access token in session
- Check server logs for specific errors

## Contributing

This is a personal project, but feedback and suggestions are welcome!

## License

MIT

## Credits

Built by [vivek](https://github.com/vivek-dodia)
