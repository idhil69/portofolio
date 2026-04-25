import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["700", "800"],
})

export const metadata: Metadata = {
  title: "Muh. Rahmadhan Aidil Fadly RM | Creative Multimedia Specialist",
  description:
    "Professional portfolio showcasing video editing, videography, photography, and graphic design work by Muh. Rahmadhan Aidil Fadly RM - Creative Multimedia Specialist",
  keywords: [
    "video editor",
    "videographer",
    "graphic designer",
    "multimedia",
    "creative",
    "portfolio",
  ],
  authors: [{ name: "Muh. Rahmadhan Aidil Fadly RM" }],
  openGraph: {
    title: "Muh. Rahmadhan Aidil Fadly RM | Creative Multimedia Specialist",
    description:
      "Professional portfolio showcasing video editing, videography, photography, and graphic design work",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden animate-gradient bg-gradient-to-br from-background via-secondary to-background bg-[length:400%_400%]">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
