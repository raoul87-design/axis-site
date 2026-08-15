import { Gloock, Fraunces, Inter, DM_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
})

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
})

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
})

// Alleen voor het stayd.-productwoordmerk in de ventures-visual — geen Axis-merkfont.
const spaceGrotesk = Space_Grotesk({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata = {
  title: "Axis — AI-gedreven platformen, van concept tot betalende klant",
  description: "Axis is een venture studio uit Twente. AI-gedreven platformen, van concept tot betalende klant.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={`${gloock.variable} ${fraunces.variable} ${inter.variable} ${dmMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
