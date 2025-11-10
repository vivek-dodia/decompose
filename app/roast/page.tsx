"use client"

import { MeshGradientSVG } from "@/components/mesh-gradient-svg"
import { motion } from "framer-motion"
import { Suspense, useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"

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

// Easter egg function for time/date based messages
function getEasterEgg(): string {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const date = now.getDate()
  const month = now.getMonth() // 0 = January, 1 = February, etc.

  // Helper to check if it's a weekday
  const isWeekday = day >= 1 && day <= 5
  const isWeekend = day === 0 || day === 6

  // Super specific time combos (check first for priority)
  if (hour >= 3 && hour < 5 && isWeekday) {
    return "3 AM on a weekday. Either insomnia or poor life choices. Your music suggests both."
  }
  if (hour >= 3 && hour < 5 && day === 0) {
    return "3 AM on a Sunday. The existential dread is real. So is your bad taste."
  }
  if (hour >= 3 && hour < 5 && isWeekend) {
    return "3 AM weekend browsing. Either just got home or never left. Both sad."
  }
  if (hour === 9 && day === 1) {
    return "Monday 9 AM roast session. Starting the week with emotional damage. Bold."
  }
  if ((hour === 17 || hour === 18) && day === 5) {
    return "Happy Hour and you're here? Your social life needs more help than your playlists."
  }

  // Obscure date-based
  if (month === 1 && date === 29) {
    return "Leap Day only comes every 4 years. Unlike your music taste, which is consistently bad."
  }
  if (month === 3 && date === 1) {
    return "April Fools! Just kidding, your music taste really is this bad."
  }
  if (month === 3 && date === 15) {
    return "Tax Day and getting roasted? At least the IRS can't audit your terrible playlists."
  }
  if (month === 4 && date === 4) {
    return "May the 4th be with you. Your music taste? Not so much."
  }
  if ((month === 5 && date === 21) || (month === 11 && date === 21)) {
    const season = month === 5 ? "Longest" : "Shortest"
    return `${season} day of the year and you're spending it getting roasted. Time well spent.`
  }
  if (month === 6 && date === 4) {
    return "Celebrating independence while being enslaved to the same 5 artists. Ironic."
  }
  if (month === 9 && date === 31) {
    return "Your music taste is the real horror story this Halloween."
  }
  if (month === 10 && date === 1) {
    return "Post-Halloween sugar crash or just your music taste hitting rock bottom?"
  }
  if (month === 1 && date === 14) {
    return "Valentine's Day roast? Your love life is as empty as your good playlists."
  }
  if (month === 2 && date === 14) {
    return "Pi Day: 3.14159... The number of people who respect your music taste: 0."
  }
  if (month === 3 && date === 20) {
    return "420 and getting roasted in a different way. Your music taste is still the bigger problem."
  }
  if (date === 13 && day === 5) {
    return "Friday the 13th. Your music taste is the real horror story."
  }

  // Black Friday (4th Friday of November)
  if (month === 10 && day === 5 && date >= 23 && date <= 29) {
    return "Black Friday deals on therapy for your music taste. You need it."
  }

  // Cyber Monday (Monday after Black Friday)
  if (month === 10 && day === 1 && date >= 26 && date <= 30) {
    return "Shopping online and getting roasted. Your credit card AND ego taking hits today."
  }

  // Labor Day (first Monday in September)
  if (month === 8 && day === 1 && date <= 7) {
    return "Labor Day weekend and you're working on... getting roasted? Productive."
  }

  // Thanksgiving week (4th Thursday of November)
  if (month === 10 && day === 4 && date >= 22 && date <= 28) {
    return "Giving thanks? Maybe thank Spotify for trying despite your terrible taste."
  }

  // December holiday season
  if (month === 11 && date >= 1 && date <= 10) {
    return "Spotify Wrapped drops soon. Prepare for public embarrassment."
  }
  if (month === 11 && date >= 11 && date <= 23) {
    return "Already shared your Wrapped? Everyone's judging you. We warned you."
  }
  if (month === 11 && date === 24) {
    return "Christmas Eve roast session. Santa's checking his list. You're on the naughty one."
  }
  if (month === 11 && date === 25) {
    return "Merry Christmas! Your gift is brutal honesty about your music taste."
  }
  if (month === 11 && date === 31) {
    return "New Year's Eve and you're here. Your plans are as sad as your top tracks."
  }

  // New Year period
  if (month === 0 && date <= 7) {
    return "New year, same terrible music taste. Some things never change."
  }

  // Time-based (general)
  if (hour >= 3 && hour < 5) {
    return "3 AM and reading your roast? This checks out. Your sleep schedule is as broken as your music taste."
  }
  if (hour >= 5 && hour < 8) {
    return "Up before 8 AM on purpose? Either morning person or never went to sleep. Both are concerning."
  }
  if (hour >= 9 && hour <= 17 && isWeekday) {
    return "Reading this during work hours? Your productivity is as questionable as your playlists."
  }
  if (hour >= 12 && hour < 13) {
    return "Lunch break roast session. Bold choice. Your coworkers are judging you."
  }
  if (hour >= 23 || hour < 3) {
    return "Past midnight and still scrolling? Your FBI agent is taking notes."
  }

  // Day-based
  if (day === 1) {
    return "It's Monday and you're getting roasted. Your week is off to a great start."
  }
  if (day === 5 && hour >= 18) {
    return "Friday night and you're here? Your weekend plans are as sad as your top tracks."
  }
  if (day === 0 && hour >= 20) {
    return "Sunday night existential crisis + Spotify roast = therapy bills incoming."
  }

  return ""
}

function RoastContent() {
  const { data: session, status } = useSession()
  const username = session?.user?.name || "Anonymous"
  const accessToken = session?.accessToken
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
  const [totalRoasts, setTotalRoasts] = useState<number>(0)
  const [easterEgg, setEasterEgg] = useState<string>("")
  const [easterEggExpanded, setEasterEggExpanded] = useState<boolean>(false)
  const [metaRoast, setMetaRoast] = useState<string>("")
  const [timeRangeSwitches, setTimeRangeSwitches] = useState<number>(0)
  const [easterEggClicks, setEasterEggClicks] = useState<number>(0)
  const [pageLoadTime, setPageLoadTime] = useState<number>(Date.now())
  const titleText = "decompose.lol"
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
    if (process.env.NODE_ENV === 'development') {
      console.log(`Roast page - Effect ${randomEffect + 1} activated!`)
    }
  }, [])

  // Set easter egg on mount
  useEffect(() => {
    const egg = getEasterEgg()
    setEasterEgg(egg)
  }, [])

  // Check for return visitor (expires after 24 hours)
  useEffect(() => {
    const visitData = localStorage.getItem('decompose_visited')
    const now = Date.now()
    const oneDayInMs = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    if (visitData) {
      try {
        const { timestamp } = JSON.parse(visitData)
        const timeSinceVisit = now - timestamp

        // If visited within last 24 hours, show meta-roast
        if (timeSinceVisit < oneDayInMs) {
          setMetaRoast("Back for more? Either brave or masochistic.")
        } else {
          // Expired - treat as new visitor
          localStorage.setItem('decompose_visited', JSON.stringify({ timestamp: now }))
        }
      } catch (e) {
        // Invalid data - reset
        localStorage.setItem('decompose_visited', JSON.stringify({ timestamp: now }))
      }
    } else {
      // First visit
      localStorage.setItem('decompose_visited', JSON.stringify({ timestamp: now }))
    }
  }, [])

  // Track time on page for meta-roasts
  useEffect(() => {
    const checkTime = setInterval(() => {
      const timeOnPage = (Date.now() - pageLoadTime) / 1000 / 60 // in minutes

      if (timeOnPage >= 15 && !metaRoast) {
        setMetaRoast("You've been reading this for 15 minutes. This is the most attention your music taste has ever gotten.")
      } else if (timeOnPage >= 10 && !metaRoast) {
        setMetaRoast("10 minutes of staring at the truth. Still in denial?")
      } else if (timeOnPage >= 5 && !metaRoast) {
        setMetaRoast("5 minutes of denial. The truth is still the truth.")
      } else if (timeOnPage >= 3 && !metaRoast) {
        setMetaRoast("Still here? The roasts don't get better with time. Neither does your taste.")
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(checkTime)
  }, [pageLoadTime, metaRoast])

  // Track easter egg clicks
  const handleEasterEggClick = () => {
    setEasterEggExpanded(!easterEggExpanded)
    const newCount = easterEggClicks + 1
    setEasterEggClicks(newCount)

    if (newCount >= 5) {
      setMetaRoast("Clicking it repeatedly won't change reality. Your taste is still questionable.")
    } else if (newCount >= 3) {
      setMetaRoast("Still clicking? The warning doesn't get funnier.")
    }
  }

  // Track time range switches
  const handleTimeRangeChange = (newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange)

    // Track switches
    const newSwitchCount = timeRangeSwitches + 1
    setTimeRangeSwitches(newSwitchCount)

    if (newSwitchCount >= 7) {
      setMetaRoast("This is just sad. Accept it. Your music taste is a problem across all timelines.")
    } else if (newSwitchCount >= 5) {
      setMetaRoast("Stop. The data doesn't lie. Your taste is consistently questionable.")
    } else if (newSwitchCount >= 3) {
      setMetaRoast("Desperately refreshing won't improve your taste. It's bad in all time periods.")
    }
  }

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
      // Check if user is authenticated
      if (status === 'loading') {
        return // Still loading session
      }

      if (!session || !accessToken) {
        setError("No access token found. Please log in again.")
        setIsLoading(false)
        // Redirect to home after a delay
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
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
          body: JSON.stringify({ timeRange }),
        })

        if (!response.ok) {
          throw new Error('Failed to generate roast')
        }

        const data = await response.json()
        setRoastData(data.roasts)
        setSpecialBadge(data.specialBadge || "")
        setTotalRoasts(data.totalRoasts || 0)
        setIsLoading(false)
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error generating roast:', err)
        }
        setError('Failed to generate roast. Please try again.')
        setIsLoading(false)
      }
    }

    generateRoast()
  }, [session, timeRange, status])

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
      className="bg-[#191414] p-4 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
        opacity: selectedEffect === 7 || selectedEffect === 8 ? flicker : 1,
        transition: 'opacity 0.05s',
        minHeight: '100vh'
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
          className="text-center mb-4 mt-6 sm:mt-8 md:mt-12 px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider mb-2"
            style={{
              fontFamily: "var(--font-bitcount)",
              fontWeight: 300,
              color: '#1ED760'
            }}
          >
            {titleText}
          </h1>
          <p
            className="text-gray-500 text-sm sm:text-base md:text-lg"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 200 }}
          >
            {usernameText}
          </p>
        </motion.div>

      {/* Dynamic Banner - Shows highest priority message */}
      {!isLoading && (metaRoast || easterEgg || specialBadge) && (() => {
        // Priority: Meta-roast > Easter egg > Special badge
        const displayMessage = metaRoast || easterEgg || specialBadge
        const borderColor = metaRoast ? '#ffaa00' : easterEgg ? '#d96565' : '#1ED760'
        const textColor = metaRoast ? '#ffaa00' : easterEgg ? '#d96565' : '#1ED760'

        return (
          <motion.div
            className="flex justify-center px-4 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div
              className="bg-[#191414] border-2 rounded-lg px-6 py-4 max-w-2xl"
              style={{
                borderColor: borderColor,
                boxShadow: `4px 4px 0px 0px ${borderColor}66`,
              }}
            >
              <p
                className="text-center text-sm md:text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-geist)",
                  fontWeight: 300,
                  color: textColor,
                }}
              >
                {displayMessage}
              </p>
            </div>
          </motion.div>
        )
      })()}

      {/* Main Content - Ghost Left, Cards Right - Full Width */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start justify-between px-4 sm:px-6 lg:px-16 mt-4 sm:mt-6 lg:mt-8">
        {/* Ghost SVG - Left Side with Controls */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto lg:items-start">

          {/* Time Range Filter */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            {[
              { label: '1 Month', value: 'short_term' as TimeRange, rotation: -1 },
              { label: '6 Months', value: 'medium_term' as TimeRange, rotation: 0.5 },
              { label: 'Lifetime', value: 'long_term' as TimeRange, rotation: -0.5 },
            ].map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleTimeRangeChange(option.value)}
                className={`
                  relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all
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

          {/* Roast Counter */}
          {totalRoasts > 0 && !isLoading && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 10, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-[#191414] border-2 border-[#1ED760] rounded-lg px-4 py-3 shadow-[3px_3px_0px_0px_rgba(29,185,84,0.4)] text-left">
                <p
                  className="text-gray-400 text-sm"
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontWeight: 300,
                  }}
                >
                  You're the <span className="text-[#1ED760] font-semibold">{totalRoasts.toLocaleString()}</span>{totalRoasts === 1 ? 'st' : totalRoasts === 2 ? 'nd' : totalRoasts === 3 ? 'rd' : 'th'} person roasted
                </p>
              </div>
            </motion.div>
          )}

          {/* Ghost SVG */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full flex justify-center lg:justify-start"
          >
            <div className="w-64 sm:w-72 md:w-80 lg:w-96">
              <MeshGradientSVG />
            </div>
          </motion.div>

          {/* Button - Below Ghost with Effects */}
          <motion.div
            className="relative w-full sm:w-auto"
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

            <motion.button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="relative block w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#1ED760] text-[#191414] rounded-lg font-semibold text-base sm:text-lg hover:bg-[#1DB954] transition-all shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(29,185,84,0.5)]"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 500 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              logout
            </motion.button>
          </motion.div>
        </div>

        {/* Roast Cards - Right Side Grid - Full Width */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full">
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <div className="text-center px-4">
                <motion.div
                  key={loadingMessageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="animate-pulse text-[#1ED760] text-lg sm:text-xl md:text-2xl mb-4"
                  style={{ fontFamily: "var(--font-bitcount)" }}
                >
                  {loadingMessages[loadingMessageIndex].main}
                </motion.div>
                <motion.div
                  key={`sub-${loadingMessageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-500 text-sm sm:text-base"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {loadingMessages[loadingMessageIndex].sub}
                </motion.div>
              </div>
            </div>
          ) : error ? (
            <div className="col-span-1 md:col-span-2 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <div className="text-center px-4">
                <div className="text-red-500 text-xl sm:text-2xl mb-4" style={{ fontFamily: "var(--font-bitcount)" }}>
                  Error: {error}
                </div>
                <a
                  href="/"
                  className="text-[#1ED760] underline hover:text-[#1DB954] text-sm sm:text-base"
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
                  className="bg-[#191414] p-4 sm:p-6 md:p-8 rounded-xl border-2 border-[#1ED760] shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(29,185,84,0.5)] transition-all relative min-h-[180px] sm:min-h-[200px] md:min-h-[220px] flex flex-col"
                  style={{
                    transform: `rotate(${rotations[index] * 0.5}deg)`,
                  }}
                >
                  <h3
                    className="text-[#1ED760] text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4"
                    style={{
                      fontFamily: "var(--font-bitcount)",
                      fontWeight: 600,
                      textShadow: "0 0 10px rgba(29,185,84,0.3)",
                    }}
                  >
                    {roast.title}
                  </h3>
                  <p
                    className="text-gray-400 text-sm sm:text-base leading-relaxed"
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
      {/* End Main Content */}

      {/* Footer - Always at bottom */}
      {!isLoading && (
        <motion.div
          className="mt-8 sm:mt-12 md:mt-16 mb-4 sm:mb-6 md:mb-8 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p className="text-gray-500 text-xs sm:text-sm md:text-base" style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}>
            built by{" "}
            <a
              href="https://github.com/vivek-dodia/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1ED760] hover:text-[#1DB954] transition-colors underline"
            >
              vivek
            </a>
          </p>
        </motion.div>
      )}

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
