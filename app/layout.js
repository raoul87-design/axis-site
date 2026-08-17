import { Gloock, Fraunces, Inter, DM_Mono } from "next/font/google"
import "./globals.css"

// Fraunces draagt de hero-LCP — enige font die preload krijgt.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-fraunces",
  preload: true,
})

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
  preload: false,
})

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  preload: false,
})

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  preload: false,
})

const SITE_URL = "https://axisapp.nl"
const TITLE = "Axis — Platformen bouwen met wie de branche kent"
const DESCRIPTION = "Axis is een venture studio uit Twente. Wij bouwen platformen samen met mensen die hun branche kennen, van eerste idee tot een product dat verkoopt."

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
    <html lang="nl" className={`${gloock.variable} ${fraunces.variable} ${inter.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
