"use client"

import { MeshGradientSVG } from "@/components/mesh-gradient-svg"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Suspense, useEffect, useState } from "react"

function RoastContent() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "Anonymous"
  const [selectedEffect, setSelectedEffect] = useState<number>(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [flicker, setFlicker] = useState(1)
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })
  const titleText = "decompose"
  const usernameText = `@${username}'s spotify roast`

  // Randomly select effect on page load
  useEffect(() => {
    const randomEffect = Math.floor(Math.random() * 9)
    setSelectedEffect(randomEffect)
    console.log(`Roast page - Effect ${randomEffect + 1} activated!`)
  }, [])

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

  const roasts = [
    {
      title: "Musical Identity Crisis",
      content: `You definitely say "I listen to everything" but mean 2 artists. You've never had aux cord privileges and now we know why.`,
    },
    {
      title: "The Receipts",
      content: `You listened to the same song 847 times. That's not a song. That's a cry for help. Even the artist is concerned.`,
    },
    {
      title: "Playlist Crimes",
      content: `You named a playlist "sad boi hours" unironically. 147 songs titled "vibes" - which vibe? Depression?`,
    },
    {
      title: "Background Music For...",
      content: `Your top tracks are perfect for: crying in a Trader Joe's parking lot and pretending you're in a music video while doing laundry.`,
    },
    {
      title: "Aux Cord Evaluation",
      content: `Should you ever control the music? Road Trip: NO. Gym: NO. Party: NO. You'd clear the room faster than a fire alarm. Alone Forever: YES.`,
    },
    {
      title: "Therapist's Notes",
      content: `You listened to the same breakup song 600 times. The breakup was 4 years ago. Your attachment style is "anxious" and so is everyone who hears your playlist.`,
    },
    {
      title: "FBI Watchlist Behavior",
      content: `You listen to murder podcasts AND Nickelback. Your 3 AM activity looks like a serial killer's soundtrack. You're definitely on a government list now.`,
    },
    {
      title: "The Diagnosis",
      content: `Medical Report: Terminal case of 2012 Tumblr aesthetic. Chronic "I'm not like other girls/guys" syndrome. Acute nostalgia paralysis.`,
    },
  ]

  // Random positions and rotations for cards - organic scattered layout
  const cardPositions = [
    { top: '12%', left: '6%', rotate: -10, scale: 0.9 },
    { top: '15%', left: '38%', rotate: 7, scale: 0.88 },
    { top: '10%', left: '68%', rotate: -8, scale: 0.92 },
    { top: '35%', left: '10%', rotate: 9, scale: 0.9 },
    { top: '38%', left: '72%', rotate: -11, scale: 0.88 },
    { top: '58%', left: '8%', rotate: 6, scale: 0.91 },
    { top: '55%', left: '42%', rotate: -9, scale: 0.9 },
    { top: '60%', left: '74%', rotate: 8, scale: 0.89 },
  ]

  return (
    <div
      className="h-screen bg-[#101010] p-4 relative overflow-hidden flex flex-col"
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

      {/* Ghost and Button - Left Side Stack */}
      <div className="fixed left-44 top-[30%] z-0 hidden lg:flex lg:flex-col lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-80">
            <MeshGradientSVG />
          </div>
        </motion.div>

        <motion.div
          animate={{
            opacity: 1,
            rotate: [-1.5, 1, -0.5, 1.5, -1],
            scale: [1, 1.01, 1, 1.02, 1],
            x: glitchOffset.x,
            y: glitchOffset.y
          }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            x: { duration: 0.05 },
            y: { duration: 0.05 }
          }}
          initial={{ opacity: 0 }}
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
            className="relative block px-8 py-3 bg-gradient-to-r from-[#1DB954] to-[#1ED760] text-[#191414] rounded-lg shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(29,185,84,0.5)] transition-all duration-300"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 200 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            roast another victim
          </motion.a>
        </motion.div>
      </div>

      {/* Title - Centered at Top */}
      <motion.div
        className="relative z-10 text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-6xl md:text-7xl tracking-wider mb-3"
          style={{ fontFamily: "var(--font-bitcount)", fontWeight: 300 }}
        >
          {titleText.split("").map((char, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-[#1DB954] via-[#1ED760] to-[#1DB954] bg-clip-text text-transparent animate-gradient inline-block"
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="text-[#535353] text-xl" style={{ fontFamily: "var(--font-geist)", fontWeight: 200 }}>
          {usernameText}
        </p>
      </motion.div>

      {/* Scattered Cards - Pinboard Chaos */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full">
        {roasts.map((roast, index) => (
          <motion.div
            key={index}
            className="absolute w-[380px] rounded-2xl p-6 bg-gradient-to-br from-[#1a1a1a] to-[#252525] shadow-[8px_8px_0px_0px_rgba(29,185,84,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(29,185,84,0.5)] cursor-pointer"
            style={{
              top: cardPositions[index].top,
              left: cardPositions[index].left,
              rotate: `${cardPositions[index].rotate}deg`,
              opacity: selectedEffect === 7 || selectedEffect === 8 ? flicker : 1,
              backgroundImage: (selectedEffect === 3 || selectedEffect === 8)
                ? "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\"), linear-gradient(135deg, #1a1a1a, #252525)"
                : undefined,
            }}
            initial={{ opacity: 0, y: -100, rotate: 0 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              rotate: cardPositions[index].rotate,
              scale: cardPositions[index].scale,
            }}
            transition={{
              opacity: { delay: index * 0.15, duration: 0.5 },
              y: {
                delay: index * 0.15 + 0.5,
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: { delay: index * 0.15, duration: 0.6 },
              scale: { delay: index * 0.15, duration: 0.6 },
            }}
            whileHover={{
              scale: (selectedEffect === 4 || selectedEffect === 8) ? 1.15 : 1.1,
              rotate: 0,
              zIndex: 50,
              transition: { duration: 0.2 },
            }}
          >
            {/* Scanline overlay */}
            {(selectedEffect === 0 || selectedEffect === 8) && (
              <div
                className="absolute inset-0 pointer-events-none z-20 opacity-20 rounded-2xl"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)",
                }}
              />
            )}

            {/* Animated gradient border */}
            {(selectedEffect === 1 || selectedEffect === 8) && (
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1DB954] via-[#1ED760] to-[#1DB954] rounded-2xl opacity-40 blur-sm animate-gradient-rotate -z-10" />
            )}

            {/* Chromatic aberration shadow */}
            {(selectedEffect === 6 || selectedEffect === 8) && (
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  boxShadow: "inset 0 0 60px rgba(255,0,255,0.1), inset 0 0 60px rgba(0,255,255,0.1)",
                }}
              />
            )}

            <h3
              className="text-[#1ED760] text-xl mb-3 relative z-10"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 200 }}
            >
              {roast.title}
            </h3>
            <p
              className="text-white/90 leading-relaxed text-base relative z-10"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 200 }}
            >
              {roast.content}
            </p>
          </motion.div>
        ))}

      </div>

    </div>
  )
}

export default function RoastPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#101010]" />}>
      <RoastContent />
    </Suspense>
  )
}
