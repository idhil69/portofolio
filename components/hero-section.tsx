"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowDown } from "lucide-react"

const skills = [
  "Video Editor",
  "Videographer",
  "Photographer",
  "Graphic Designer",
]

// Fixed split: "Muh. Rahmadhan Aidil" on line 1, "Fadly RM" on line 2
function renderStyledName(name: string) {
  if (!name) return null

  // Split name into words
  const words = name.trim().split(/\s+/)
  
  // Find "Fadly" to split at
  let splitIdx = words.length - 2 // default: last 2 words on second line
  for (let i = 0; i < words.length; i++) {
    if (words[i].toLowerCase() === 'fadly') {
      splitIdx = i
      break
    }
  }

  const firstLine = words.slice(0, splitIdx).join(' ')
  const secondLine = words.slice(splitIdx).join(' ')

  const colorFirstLine = (text: string) =>
    text.split('').map((char, i) => (
      <span key={`f-${i}`} className={/[ao]/i.test(char) ? "text-[#bf4b4b]" : ""}>
        {char}
      </span>
    ))

  const colorSecondLine = (text: string) =>
    text.split('').map((char, i) => (
      <span key={`s-${i}`} className={/[ie]/i.test(char) ? "text-[#FFE800]" : ""}>
        {char}
      </span>
    ))

  return (
    <h1 className="font-black uppercase leading-none tracking-[-0.02em]">
      <span className="block text-[13vw] md:text-[10vw] lg:text-[8vw] text-[#353535] dark:text-gray-100">
        {colorFirstLine(firstLine)}
      </span>
      <span className="block text-[13vw] md:text-[10vw] lg:text-[8vw] text-[#a1a9b0] dark:text-gray-400">
        {colorSecondLine(secondLine)}
      </span>
    </h1>
  )
}

export function HeroSection() {
  const [profile, setProfile] = useState<any>(null)
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setProfile(data.profile)
      })
      .catch(err => console.error("Failed to load profile", err))
  }, [])

  // Text Rotator effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-[#FBFBFB] dark:bg-[#111] overflow-hidden">
      {/* Background Banner */}
      {profile?.bannerUrl && (
        <div
          className="absolute inset-0 opacity-10 dark:opacity-20 z-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${profile.bannerUrl})` }}
        />
      )}

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-5xl pt-24 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {profile?.name
              ? renderStyledName(profile.name)
              : (
                <h1 className="font-black uppercase leading-none tracking-[-0.02em]">
                  <span className="block text-[13vw] md:text-[10vw] lg:text-[8vw] text-[#353535] dark:text-gray-100">
                    MUH. R<span className="text-[#bf4b4b]">A</span>HM<span className="text-[#bf4b4b]">A</span>DH<span className="text-[#bf4b4b]">A</span>N <span className="text-[#bf4b4b]">A</span>IDIL
                  </span>
                  <span className="block text-[13vw] md:text-[10vw] lg:text-[8vw] text-[#a1a9b0] dark:text-gray-400">
                    F<span className="text-[#FFE800]">A</span>DLY RM
                  </span>
                </h1>
              )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 md:mt-10 h-16 relative z-30"
          >
            <h3 className="text-xl md:text-2xl font-bold tracking-[8px] md:tracking-[18px] uppercase text-[#bf4b4b] opacity-70">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSkillIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {skills[currentSkillIndex]}
                </motion.span>
              </AnimatePresence>
            </h3>
          </motion.div>
        </div>
      </div>

      {/* Hero Image Overlay (Right Side) */}
      {profile?.heroImageUrl && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 right-0 z-10 pointer-events-none w-[90%] sm:w-full md:w-[70%] lg:w-[60%] h-[60%] md:h-[90%] lg:h-[100%] flex justify-end items-end opacity-40 md:opacity-100"
        >
          <img 
            src={profile.heroImageUrl} 
            alt="Hero" 
            className="object-contain object-bottom w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          />
        </motion.div>
      )}

      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
        <a
          href="#experience"
          className="flex flex-col items-center text-[#353535] dark:text-gray-300 hover:text-[#bf4b4b] dark:hover:text-[#bf4b4b] transition-colors group cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <p className="text-sm tracking-widest font-semibold mb-4 uppercase">See More</p>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-8 h-8 opacity-60 group-hover:opacity-100" />
          </motion.div>
        </a>
      </div>
    </section>
  )
}
