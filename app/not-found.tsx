"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

const errorMessages = [
  "Lost? Your music taste couldn't find direction either",
  "This page doesn't exist, unlike your questionable playlist",
  "404: Not found. Much like your good music choices",
  "Error 404: This page ghosted you harder than your top artist",
  "Page not found. Should've asked Spotify for better directions",
]

export default function NotFound() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Randomly select a message on page load
    const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]
    setMessage(randomMessage)
  }, [])

  return (
    <div className="min-h-screen bg-[#101010] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/5 to-transparent pointer-events-none" />

      <motion.div
        className="max-w-2xl w-full text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Title */}
        <motion.h1
          className="text-9xl md:text-[12rem] bg-gradient-to-r from-[#1DB954] via-[#1ED760] to-[#1DB954] bg-clip-text text-transparent animate-gradient"
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
          404
        </motion.h1>

        {/* Sarcastic Message */}
        <motion.div
          className="bg-[#191414] border-2 border-[#1ED760] rounded-lg px-6 py-4 shadow-[4px_4px_0px_0px_rgba(29,185,84,0.4)]"
          initial={{ opacity: 0, rotate: -1 }}
          animate={{ opacity: 1, rotate: -0.8 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p
            className="text-gray-300 text-lg md:text-xl"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            {message}
          </p>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="px-8 py-4 bg-[#191414] border-2 border-[#1ED760] rounded-lg text-white text-lg shadow-[3px_3px_0px_0px_rgba(29,185,84,0.4)] transition-all duration-200"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              whileTap={{ scale: 0.98 }}
            >
              back to home
            </motion.button>
          </Link>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-gray-500 text-sm"
          style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          (at least your Spotify Wrapped was more interesting than this)
        </motion.p>
      </motion.div>

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
