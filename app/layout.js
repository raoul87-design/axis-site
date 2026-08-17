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

const SITE_URL = "https://axisapp.nl"
const TITLE = "Axis — AI-gedreven platformen, van concept tot betalende klant"
const DESCRIPTION = "Axis is een venture studio uit Twente. AI-gedreven platformen, van concept tot betalende klant."

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Axis",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "axis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={`${gloock.variable} ${fraunces.variable} ${inter.variable} ${dmMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
