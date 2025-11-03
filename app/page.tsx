"use client"

import type React from "react"

import { MeshGradientSVG } from "@/components/mesh-gradient-svg"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"

export default function Home() {
  const router = useRouter()
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })
  const [selectedEffect, setSelectedEffect] = useState<number>(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [flicker, setFlicker] = useState(1)
  const text = "decompose.lol"

  // Randomly select effect on page load
  useEffect(() => {
    const randomEffect = Math.floor(Math.random() * 9)
    setSelectedEffect(randomEffect)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Effect ${randomEffect + 1} activated!`)
    }
  }, [])

  // Effect 3: Micro-glitches (and Effect 9: All)
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

  // Effect 6: Cursor trail glow (and Effect 9: All)
  useEffect(() => {
    if (selectedEffect !== 5 && selectedEffect !== 8) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [selectedEffect])

  // Effect 8: Flickering opacity (and Effect 9: All)
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

  const handleSpotifyLogin = () => {
    // Use NextAuth signIn function with Spotify provider
    signIn('spotify', { callbackUrl: '/roast' })
  }

  // Get effect-specific classes for button
  const getEffectClasses = () => {
    const base =
      "w-full px-8 py-6 bg-[#191414] rounded-xl text-white text-2xl font-semibold transition-all duration-200 tracking-wide hover:rotate-1 border-2 border-transparent hover:border-[#1DB954] cursor-pointer"

    switch (selectedEffect) {
      case 0: // Scanline overlay
        return `${base} shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)]`
      case 1: // Animated gradient border
        return `${base} shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)]`
      case 2: // Micro-glitches
        return `${base} shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)]`
      case 3: // Noise/grain
        return `${base} shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)]`
      case 4: // Distortion on hover
        return `${base} shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)] hover:scale-110 hover:skew-x-2`
      case 5: // Cursor glow
        return `${base} shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)]`
      case 6: // Chromatic aberration
        return `${base} shadow-[8px_8px_0px_0px_rgba(255,0,255,0.5),-8px_-8px_0px_0px_rgba(0,255,255,0.5)]`
      case 7: // Flicker
        return `${base} shadow-[4px_4px_0px_0px_rgba(29,185,84,0.3)]`
      case 8: // All effects
        return `${base} shadow-[8px_8px_0px_0px_rgba(255,0,255,0.5),-8px_-8px_0px_0px_rgba(0,255,255,0.5)] hover:scale-110`
      default:
        return base
    }
  }

  const getEffectStyles = () => {
    const base: React.CSSProperties = {
      fontFamily: "var(--font-geist)",
      fontWeight: 600,
      opacity: selectedEffect === 7 || selectedEffect === 8 ? flicker : 1,
    }

    // Effect 4: Noise/grain texture
    if (selectedEffect === 3 || selectedEffect === 8) {
      return {
        ...base,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\"), linear-gradient(to bottom, #191414, #191414)",
      }
    }

    return base
  }

  return (
    <div
      className="min-h-screen bg-[#101010] flex flex-col items-center justify-center p-8 relative overflow-hidden"
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

      <motion.h1
        className="absolute top-[15vh] text-6xl md:text-7xl tracking-wider cursor-default"
        style={{ fontFamily: "var(--font-bitcount)", fontWeight: 300 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-[#1DB954] via-[#1ED760] to-[#1DB954] bg-clip-text text-transparent animate-gradient inline-block"
          >
            {char}
          </span>
        ))}
      </motion.h1>

      <div className="flex flex-col items-center gap-[15vh] max-w-lg w-full mt-16">
        <MeshGradientSVG />

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [-1.5, 1, -0.5, 1.5, -1],
              scale: [1, 1.01, 1, 1.02, 1],
              x: glitchOffset.x,
              y: glitchOffset.y
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              x: { duration: 0.05 },
              y: { duration: 0.05 }
            }}
          >
            {/* Effect 1: Scanline overlay */}
            {(selectedEffect === 0 || selectedEffect === 8) && (
              <div
                className="absolute inset-0 pointer-events-none z-20 opacity-30 rounded-xl"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)",
                }}
              />
            )}

            {/* Effect 2: Animated gradient border wrapper */}
            {(selectedEffect === 1 || selectedEffect === 8) && (
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1DB954] via-[#1ED760] to-[#1DB954] rounded-xl opacity-50 blur-sm animate-gradient-rotate" />
            )}

            {/* Effect 6: Cursor trail glow */}
            {(selectedEffect === 5 || selectedEffect === 8) && (
              <div
                className="absolute w-32 h-32 bg-[#1DB954] rounded-full blur-3xl opacity-20 pointer-events-none -z-10"
                style={{
                  left: mousePos.x - 64,
                  top: mousePos.y - 64,
                  transition: "left 0.3s ease-out, top 0.3s ease-out",
                }}
              />
            )}

            <motion.button
              onClick={handleSpotifyLogin}
              className={getEffectClasses()}
              style={getEffectStyles()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              sign in with spotify
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}>
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
    </div>
  )
}
