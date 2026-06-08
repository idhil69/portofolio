import type { Metadata, Viewport } from "next"
import { Open_Sans, Varela_Round } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

const varelaRound = Varela_Round({
  subsets: ["latin"],
  variable: "--font-varela",
  weight: ["400"],
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
    <html lang="id" className={`${openSans.variable} ${varelaRound.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden animate-gradient bg-gradient-to-br from-background via-secondary to-background bg-[length:400%_400%]">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
