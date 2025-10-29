"use client"

import { MeshGradientSVG } from "@/components/mesh-gradient-svg"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Suspense, useEffect, useState } from "react"

interface RoastData {
  musical_identity_crisis: string
  the_receipts: string
  playlist_crimes: string
  background_music_for: string
  aux_cord_evaluation: string
  therapist_notes: string
  fbi_watchlist: string
  the_diagnosis: string
}

type TimeRange = 'short_term' | 'medium_term' | 'long_term'

function RoastContent() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "Anonymous"
  const accessToken = searchParams.get("access_token")
  const [selectedEffect, setSelectedEffect] = useState<number>(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [flicker, setFlicker] = useState(1)
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })
  const [roastData, setRoastData] = useState<RoastData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term')
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [specialBadge, setSpecialBadge] = useState<string>("")
  const titleText = "decompose"
  const usernameText = `@${username}'s spotify roast`

  // Unhinged loading messages
  const loadingMessages = [
    { main: "Analyzing your terrible taste...", sub: "This might take a moment. We need time to process this much cringe." },
    { main: "Consulting the therapy bills...", sub: "Your listening history is... concerning." },
    { main: "Contacting your ex for confirmation...", sub: "They said they're not surprised." },
    { main: "Cross-referencing with FBI database...", sub: "Multiple red flags detected." },
    { main: "Your friends are being notified...", sub: "They already knew, tbh." },
    { main: "Calculating emotional damage...", sub: "The numbers don't look good." },
    { main: "Spotify's algorithm is crying...", sub: "You broke it. Congratulations." },
  ]

  // Randomly select effect on page load
  useEffect(() => {
    const randomEffect = Math.floor(Math.random() * 9)
    setSelectedEffect(randomEffect)
    console.log(`Roast page - Effect ${randomEffect + 1} activated!`)
  }, [])

  // Cycle through loading messages
  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2500) // Change message every 2.5 seconds

    return () => clearInterval(interval)
  }, [isLoading, loadingMessages.length])

  // Fetch roast data
  useEffect(() => {
    const generateRoast = async () => {
      if (!accessToken) {
        setError("No access token found. Please log in again.")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/generate-roast', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken, timeRange }),
        })

        if (!response.ok) {
          throw new Error('Failed to generate roast')
        }

        const data = await response.json()
        setRoastData(data.roasts)
        setSpecialBadge(data.specialBadge || "")
        setIsLoading(false)
      } catch (err) {
        console.error('Error generating roast:', err)
        setError('Failed to generate roast. Please try again.')
        setIsLoading(false)
      }
    }

    generateRoast()
  }, [accessToken, timeRange])

  // Effect 3: Micro-glitches
  useEffect(() => {
    if (selectedEffect !== 2 && selectedEffect !== 8) return

    const glitch = () => {
      const randomDelay = Math.random() * 3000 + 3000

      setTimeout(() => {
        const x = (Math.random() - 0.5) * 6
        const y = (Math.random() - 0.5) * 6
        setGlitchOffset({ x, y })

        const resetTime = Math.random() * 100 + 50
        setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), resetTime)

        glitch()
      }, randomDelay)
    }

    glitch()
  }, [selectedEffect])

  // Effect 6: Cursor trail glow
  useEffect(() => {
    if (selectedEffect !== 5 && selectedEffect !== 8) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [selectedEffect])

  // Effect 8: Flickering opacity
  useEffect(() => {
    if (selectedEffect !== 7 && selectedEffect !== 8) return

    const flicker = () => {
      const randomDelay = Math.random() * 2000 + 1000

      setTimeout(() => {
        const opacity = Math.random() * 0.15 + 0.85
        setFlicker(opacity)

        setTimeout(() => setFlicker(1), Math.random() * 100 + 50)

        flicker()
      }, randomDelay)
    }

    flicker()
  }, [selectedEffect])

  const roasts = roastData ? [
    {
      title: "Musical Identity Crisis",
      content: roastData.musical_identity_crisis,
    },
    {
      title: "The Receipts",
      content: roastData.the_receipts,
    },
    {
      title: "Playlist Crimes",
      content: roastData.playlist_crimes,
    },
    {
      title: "Background Music For...",
      content: roastData.background_music_for,
    },
    {
      title: "Aux Cord Evaluation",
      content: roastData.aux_cord_evaluation,
    },
    {
      title: "Therapist's Notes",
      content: roastData.therapist_notes,
    },
    {
      title: "FBI Watchlist Behavior",
      content: roastData.fbi_watchlist,
    },
    {
      title: "The Diagnosis",
      content: roastData.the_diagnosis,
    },
  ] : []

  return (
    <div
      className="min-h-screen bg-[#191414] p-8 relative overflow-hidden"
      style={{
        opacity: selectedEffect === 7 || selectedEffect === 8 ? flicker : 1,
        transition: 'opacity 0.05s'
      }}
    >
      {/* Full page scanline effect */}
      {(selectedEffect === 0 || selectedEffect === 8) && (
        <div
          className="absolute inset-0 pointer-events-none z-50 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 2px, transparent 2px, transparent 4px)",
          }}
        />
      )}

      {/* Full page noise/grain */}
      {(selectedEffect === 3 || selectedEffect === 8) && (
        <div
          className="absolute inset-0 pointer-events-none z-50 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />
      )}

      {/* Full page cursor glow */}
      {(selectedEffect === 5 || selectedEffect === 8) && (
        <div
          className="absolute w-64 h-64 bg-[#1DB954] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{
            left: mousePos.x - 128,
            top: mousePos.y - 128,
            transition: "left 0.5s ease-out, top 0.5s ease-out",
          }}
        />
      )}

      {/* Full page chromatic aberration vignette */}
      {(selectedEffect === 6 || selectedEffect === 8) && (
        <div
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            boxShadow: "inset 0 0 200px rgba(255,0,255,0.1), inset 0 0 200px rgba(0,255,255,0.1)",
          }}
        />
      )}

      {/* Title - Top Center */}
      <motion.div
        className="text-center mb-4 mt-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-5xl md:text-6xl tracking-wider mb-2"
          style={{
            fontFamily: "var(--font-bitcount)",
            fontWeight: 300,
            color: '#1ED760'
          }}
        >
          {titleText}
        </h1>
        <p
          className="text-gray-500 text-lg"
          style={{ fontFamily: "var(--font-geist)", fontWeight: 200 }}
        >
          {usernameText}
        </p>
      </motion.div>

      {/* Time Range Filter */}
      <motion.div
        className="flex justify-center gap-3 mb-8 px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          { label: '1 Month', value: 'short_term' as TimeRange, rotation: -1 },
          { label: '6 Months', value: 'medium_term' as TimeRange, rotation: 0.5 },
          { label: 'Lifetime', value: 'long_term' as TimeRange, rotation: -0.5 },
        ].map((option) => (
          <motion.button
            key={option.value}
            onClick={() => setTimeRange(option.value)}
            className={`
              relative px-6 py-2 rounded-lg font-semibold text-sm transition-all
              border-2
              ${timeRange === option.value
                ? 'bg-[#1ED760] text-[#191414] border-[#1ED760] shadow-[3px_3px_0px_0px_rgba(29,185,84,0.5)]'
                : 'bg-[#191414] text-[#1ED760] border-[#1ED760] shadow-[2px_2px_0px_0px_rgba(29,185,84,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(29,185,84,0.4)]'
              }
            `}
            style={{
              fontFamily: "var(--font-geist)",
              fontWeight: 500,
              transform: `rotate(${option.rotation}deg)`
            }}
            whileHover={{ scale: 1.05, rotate: option.rotation * 2 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {option.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Special Badge Display */}
      {specialBadge && !isLoading && (
        <motion.div
          className="flex justify-center px-4 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-[#191414] border-2 border-[#1ED760] rounded-lg px-6 py-4 shadow-[4px_4px_0px_0px_rgba(29,185,84,0.4)] max-w-2xl">
            <p
              className="text-[#1ED760] text-center text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: "var(--font-geist)",
                fontWeight: 400,
              }}
            >
              {specialBadge}
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Content - Ghost Left, Cards Right - Full Width */}
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-between px-4 lg:px-16 mt-8">
        {/* Ghost SVG - Left Side with Button */}
        <div className="flex-shrink-0 flex flex-col items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-80 lg:w-96">
              <MeshGradientSVG />
            </div>
          </motion.div>

          {/* Button - Below Ghost with Effects */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [-1.5, 1, -0.5, 1.5, -1],
              scale: [1, 1.01, 1, 1.02, 1],
              x: glitchOffset.x,
            }}
            transition={{
              opacity: { delay: 1, duration: 0.6 },
              y: { delay: 1, duration: 0.6 },
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              x: { duration: 0.05 },
            }}
          >
            {/* Scanline overlay */}
            {(selectedEffect === 0 || selectedEffect === 8) && (
              <div
                className="absolute inset-0 pointer-events-none z-20 opacity-30 rounded-lg"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)",
                }}
              />
            )}

            {/* Animated gradient border */}
            {(selectedEffect === 1 || selectedEffect === 8) && (
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1DB954] via-[#1ED760] to-[#1DB954] rounded-lg opacity-50 blur-sm animate-gradient-rotate" />
            )}

            <motion.a
              href="/"
              className="relative block px-8 py-3 bg-[#1ED760] text-[#191414] rounded-lg font-semibold text-lg hover:bg-[#1DB954] transition-all shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(29,185,84,0.5)]"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 500 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              roast another victim
            </motion.a>
          </motion.div>
        </div>

        {/* Roast Cards - Right Side Grid - Full Width */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
          {isLoading ? (
            <div className="col-span-2 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <motion.div
                  key={loadingMessageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="animate-pulse text-[#1ED760] text-2xl mb-4"
                  style={{ fontFamily: "var(--font-bitcount)" }}
                >
                  {loadingMessages[loadingMessageIndex].main}
                </motion.div>
                <motion.div
                  key={`sub-${loadingMessageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-500"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {loadingMessages[loadingMessageIndex].sub}
                </motion.div>
              </div>
            </div>
          ) : error ? (
            <div className="col-span-2 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-red-500 text-2xl mb-4" style={{ fontFamily: "var(--font-bitcount)" }}>
                  Error: {error}
                </div>
                <a
                  href="/"
                  className="text-[#1ED760] underline hover:text-[#1DB954]"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  Try again
                </a>
              </div>
            </div>
          ) : roasts.map((roast, index) => {
            // Alternating slight rotations for unhinged effect
            const rotations = [0.5, -0.8, 0.6, -0.5, 0.7, -0.6, 0.4, -0.7]

            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: rotations[index]
                }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  rotate: 0,
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                style={{
                  rotate: `${rotations[index]}deg`,
                }}
              >
                {/* Glitchy border effect on hover */}
                {(selectedEffect === 1 || selectedEffect === 8) && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#1DB954] via-[#1ED760] to-[#1DB954] rounded-xl opacity-0 group-hover:opacity-50 blur-sm animate-gradient-rotate transition-opacity" />
                )}

                <div
                  className="bg-[#191414] p-8 rounded-xl border-2 border-[#1ED760] shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(29,185,84,0.5)] transition-all relative min-h-[220px] flex flex-col"
                  style={{
                    transform: `rotate(${rotations[index] * 0.5}deg)`,
                  }}
                >
                  <h3
                    className="text-[#1ED760] text-xl md:text-2xl font-bold mb-4"
                    style={{
                      fontFamily: "var(--font-bitcount)",
                      fontWeight: 600,
                      textShadow: "0 0 10px rgba(29,185,84,0.3)",
                    }}
                  >
                    {roast.title}
                  </h3>
                  <p
                    className="text-gray-400 text-base leading-relaxed"
                    style={{
                      fontFamily: "var(--font-geist)",
                      fontWeight: 200,
                    }}
                  >
                    {roast.content}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default function RoastPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#191414]" />}>
      <RoastContent />
    </Suspense>
  )
}
