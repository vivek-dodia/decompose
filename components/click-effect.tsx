"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Click {
  id: number
  x: number
  y: number
  effect: number
}

export function ClickEffect() {
  const [clicks, setClicks] = useState<Click[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        effect: Math.floor(Math.random() * 6), // Random effect 0-5
      }
      setClicks((prev) => [...prev, newClick])

      // Remove click after animation
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id))
      }, 1000)
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  const getSparkleAnimation = (effect: number, i: number) => {
    switch (effect) {
      case 0: // Cardinal directions (original)
        return {
          x: [0, Math.cos((i * Math.PI) / 2) * 30],
          y: [0, Math.sin((i * Math.PI) / 2) * 30],
        }
      case 1: // Diagonal burst
        return {
          x: [0, Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 35],
          y: [0, Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 35],
        }
      case 2: // Random scatter
        return {
          x: [0, (Math.random() - 0.5) * 60],
          y: [0, (Math.random() - 0.5) * 60],
        }
      case 3: // Spiral outward
        return {
          x: [0, Math.cos((i * Math.PI) / 2) * (20 + i * 5)],
          y: [0, Math.sin((i * Math.PI) / 2) * (20 + i * 5)],
        }
      case 4: // Eight-point star
        return {
          x: [0, Math.cos((i * Math.PI) / 4) * 32],
          y: [0, Math.sin((i * Math.PI) / 4) * 32],
        }
      case 5: // Horizontal/Vertical only
        const axis = i % 2
        return {
          x: [0, axis === 0 ? (i < 2 ? 30 : -30) : 0],
          y: [0, axis === 1 ? (i < 2 ? 30 : -30) : 0],
        }
      default:
        return { x: [0, 0], y: [0, 0] }
    }
  }

  const getParticleCount = (effect: number) => {
    if (effect === 4) return 8 // Eight-point star needs 8 particles
    return 4
  }

  const getRippleStyle = (effect: number) => {
    switch (effect) {
      case 0:
      case 1:
        return { maxSize: 80, count: 1 } // Single ripple
      case 2:
        return { maxSize: 60, count: 2 } // Double ripple
      case 3:
        return { maxSize: 90, count: 1 } // Larger single ripple
      case 4:
        return { maxSize: 70, count: 2 } // Double ripple
      case 5:
        return { maxSize: 100, count: 1 } // Extra large ripple
      default:
        return { maxSize: 80, count: 1 }
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {clicks.map((click) => {
          const particleCount = getParticleCount(click.effect)
          const rippleStyle = getRippleStyle(click.effect)

          return (
            <motion.div
              key={click.id}
              className="absolute"
              style={{
                left: click.x,
                top: click.y,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Sparkle effects */}
              {Array.from({ length: particleCount }).map((_, i) => {
                const animation = getSparkleAnimation(click.effect, i)
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#1ED760] rounded-full"
                    style={{
                      left: 0,
                      top: 0,
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      ...animation,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                  />
                )
              })}

              {/* Ripple effects */}
              {Array.from({ length: rippleStyle.count }).map((_, i) => (
                <motion.div
                  key={`ripple-${i}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 border-2 border-[#1ED760] rounded-full"
                  initial={{ width: 0, height: 0, opacity: 1 }}
                  animate={{
                    width: rippleStyle.maxSize,
                    height: rippleStyle.maxSize,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
