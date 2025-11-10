"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function MeshGradientSVG() {
  const colors = [
    "#1DB954", // Spotify green
    "#1ED760", // Lighter Spotify green
    "#1AA34A", // Darker green
    "#191414", // Spotify black
    "#282828", // Dark gray
    "#535353", // Medium gray for better transitions
  ]

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const rect = document.querySelector("svg")?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (mousePosition.x - centerX) * 0.08
      const deltaY = (mousePosition.y - centerY) * 0.08

      const maxOffset = 8
      setEyeOffset({
        x: Math.max(-maxOffset, Math.min(maxOffset, deltaX)),
        y: Math.max(-maxOffset, Math.min(maxOffset, deltaY)),
      })
    }
  }, [mousePosition])

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto p-8 rounded-lg"
      animate={{
        y: [0, -8, 0],
        scaleY: [1, 1.08, 1],
      }}
      transition={{
        duration: 2.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "top center" }}
    >
      {/* MeshGradient as background layer - iOS Safari compatible */}
      <div
        className="absolute inset-0 overflow-hidden rounded-lg"
        style={{
          WebkitMaskImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMzEiIGhlaWdodD0iMjg5IiB2aWV3Qm94PSIwIDAgMjMxIDI4OSI+PHBhdGggZD0iTTIzMC44MDkgMTE1LjM4NVYyNDkuNDExQzIzMC44MDkgMjY5LjkyMyAyMTQuOTg1IDI4Ny4yODIgMTk0LjQ5NSAyODguNDExQzE4NC41NDQgMjg4Ljk0OSAxNzUuMzY0IDI4NS43MTggMTY4LjI2IDI4MEMxNTkuNzQ2IDI3My4xNTQgMTQ3Ljc2OSAyNzMuNDYxIDEzOS4xNzggMjgwLjIzQzEzMi42MzggMjg1LjM4NCAxMjQuMzgxIDI4OC40NjIgMTE1LjM3OSAyODguNDYyQzEwNi4zNzcgMjg4LjQ2MiA5OC4xNDUxIDI4NS4zODQgOTEuNjA1NSAyODAuMjNDODIuOTEyIDI3My4zODUgNzAuOTM1MyAyNzMuMzg1IDYyLjI0MTUgMjgwLjIzQzU1Ljc1MzIgMjg1LjMzNCA0Ny41OTggMjg4LjQxMSAzOC43MjQ2IDI4OC40NjJDMTcuNDEzMiAyODguNjE1IDAgMjcwLjY2NyAwIDI0OS4zNTlWMTE1LjM4NUMwIDUxLjY2NjcgNTEuNjc1NiAwIDExNS40MDQgMEMxNzkuMTM0IDAgMjMwLjgwOSA1MS42NjY3IDIzMC44MDkgMTE1LjM4NVoiLz48L3N2Zz4=')",
          maskImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMzEiIGhlaWdodD0iMjg5IiB2aWV3Qm94PSIwIDAgMjMxIDI4OSI+PHBhdGggZD0iTTIzMC44MDkgMTE1LjM4NVYyNDkuNDExQzIzMC44MDkgMjY5LjkyMyAyMTQuOTg1IDI4Ny4yODIgMTk0LjQ5NSAyODguNDExQzE4NC41NDQgMjg4Ljk0OSAxNzUuMzY0IDI4NS43MTggMTY4LjI2IDI4MEMxNTkuNzQ2IDI3My4xNTQgMTQ3Ljc2OSAyNzMuNDYxIDEzOS4xNzggMjgwLjIzQzEzMi42MzggMjg1LjM4NCAxMjQuMzgxIDI4OC40NjIgMTE1LjM3OSAyODguNDYyQzEwNi4zNzcgMjg4LjQ2MiA5OC4xNDUxIDI4NS4zODQgOTEuNjA1NSAyODAuMjNDODIuOTEyIDI3My4zODUgNzAuOTM1MyAyNzMuMzg1IDYyLjI0MTUgMjgwLjIzQzU1Ljc1MzIgMjg1LjMzNCA0Ny41OTggMjg4LjQxMSAzOC43MjQ2IDI4OC40NjJDMTcuNDEzMiAyODguNjE1IDAgMjcwLjY2NyAwIDI0OS4zNTlWMTE1LjM4NUMwIDUxLjY2NjcgNTEuNjc1NiAwIDExNS40MDQgMEMxNzkuMTM0IDAgMjMwLjgwOSA1MS42NjY3IDIzMC44MDkgMTE1LjM4NVoiLz48L3N2Zz4=')",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center"
        }}
      >
        <MeshGradient colors={colors} className="w-full h-full" speed={1} />
      </div>

      {/* SVG with eyes on top */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="231"
        height="289"
        viewBox="0 0 231 289"
        className="w-full h-auto relative z-10"
        style={{ display: "block" }}
      >
        <motion.ellipse
          rx="20"
          ry="30"
          fill="currentColor"
          className="animate-blink"
          animate={{
            cx: 80 + eyeOffset.x,
            cy: 120 + eyeOffset.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
        <motion.ellipse
          rx="20"
          ry="30"
          fill="currentColor"
          className="animate-blink"
          animate={{
            cx: 150 + eyeOffset.x,
            cy: 120 + eyeOffset.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
      </svg>

      <style jsx>{`
        .animate-blink {
          animation: blink 3s infinite ease-in-out;
        }

        @keyframes blink {
          0%,
          90%,
          100% {
            ry: 30;
          }
          95% {
            ry: 3;
          }
        }
      `}</style>
    </motion.div>
  )
}
