import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/session-provider"
import "./globals.css"

const bitcountFont = localFont({
  src: "../font/Bitcount_Grid_Single/BitcountGridSingle-VariableFont_CRSV,ELSH,ELXP,slnt,wght.ttf",
  variable: "--font-bitcount",
  weight: "300",
})

const geistFont = localFont({
  src: "../font/Geist/Geist-VariableFont_wght.ttf",
  variable: "--font-geist",
  weight: "200",
})

export const metadata: Metadata = {
  title: "decompose.lol",
  description: "Roast your Spotify listening habits",
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
  },
}

// Separate viewport export as recommended by Next.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bitcountFont.variable} ${geistFont.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-geist)", fontWeight: 200 }}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
