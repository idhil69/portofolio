"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Youtube,
  Instagram,
  Linkedin,
  Video,
  Camera,
  Palette,
  Scissors,
  CheckCircle2,
} from "lucide-react"
import Image from "next/image"

// TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const iconMap: Record<string, any> = {
  Youtube,
  Instagram,
  Linkedin,
  TikTokIcon,
  Video,
  Camera,
  Palette,
  Scissors
}

const skills = [
  { icon: Scissors, label: "Video Editing" },
  { icon: Video, label: "Videografi" },
  { icon: Camera, label: "Fotografi" },
  { icon: Palette, label: "Desain Grafis" },
]

export function HeroSection() {
  const [profile, setProfile] = useState<any>(null)
  const [socialMedia, setSocialMedia] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setProfile(data.profile)
        if (data.socialMedia) setSocialMedia(data.socialMedia)
      })
      .catch(err => console.error("Failed to load profile", err))
  }, [])

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Banner Section */}
      <div className="relative h-[380px] w-full overflow-hidden group">
        <motion.div
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src={profile?.bannerUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
            alt="Banner"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Blue Glow Line */}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_oklch(0.65_0.2_250)]" />

      {/* Floating Particles */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {[
          { size: 12, top: "20%", left: "10%" },
          { size: 20, top: "60%", left: "80%" },
          { size: 8, top: "80%", left: "30%" },
          { size: 24, top: "30%", left: "70%" },
          { size: 16, top: "10%", left: "50%" },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              width: particle.size,
              height: particle.size,
              top: particle.top,
              left: particle.left,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Profile Section - Overlapping Banner */}
      <div className="max-w-7xl mx-auto px-6 -mt-[120px] relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.5, 0, 0, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar with Float Animation */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative group cursor-pointer mb-6"
          >
            <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-lg animate-pulse-glow" />
            <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-3 border-background shadow-xl bg-background">
              <Image
                src={profile?.avatarUrl || "https://ui-avatars.com/api/?name=Aidil+Fadly&size=256&background=0D8ABC&color=fff"}
                alt={profile?.name || "Muh. Rahmadhan Aidil Fadly RM"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Rotating Dashed Border on Hover */}
            <div className="absolute inset-0 rounded-full border-[3px] border-primary border-dashed scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700 pointer-events-none" />
            {/* Verified Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-4 border-background shadow-lg z-30"
              title="Verified Creator"
            >
              <CheckCircle2 className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>

          {/* Name with Interactive Hover */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-3 interactive-text"
          >
            {profile?.name ? (
              // Split name slightly if it's long, or just render it
              profile.name.includes(' ') ? (
                <>
                  {profile.name.split(' ').slice(0, 2).join(' ')} <br className="md:hidden" />
                  {profile.name.split(' ').slice(2).join(' ')}
                </>
              ) : profile.name
            ) : (
              <>
                Muh. Rahmadhan <br className="md:hidden" />
                Aidil Fadly RM
              </>
            )}
          </motion.h1>

          {/* Title Badge with Square Shape Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 border border-primary/40 bg-primary/10 shadow-[3px_3px_0px_oklch(0.62_0.18_245/0.5)] mb-6 transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_oklch(0.62_0.18_245/0.6)]"
          >
            <Palette className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-[9px] md:text-[11px] tracking-[0.3em] uppercase font-semibold text-foreground/90">
              Creative Multimedia Specialist
            </span>
            <Video className="w-3.5 h-3.5 text-primary animate-pulse" />
          </motion.div>

          {/* Bio Card with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 md:p-10 rounded-2xl max-w-3xl relative overflow-hidden group shadow-lg mt-6"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-primary/60 shadow-sm group-hover:w-1/2 transition-all duration-500" />
            <span className="absolute -top-4 left-8 text-3xl text-primary/20">&ldquo;</span>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed italic relative z-10">
              {profile?.bioPrefix || "Saya adalah seorang kreator multimedia yang memiliki pengalaman dalam bidang "}
              {skills.map((skill, i) => (
                <motion.span
                  key={skill.label}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1 text-primary font-bold cursor-pointer hover:text-white transition-colors"
                >
                  <skill.icon className="w-4 h-4" />
                  {skill.label}
                  {i < skills.length - 1 && <span className="text-muted-foreground">, </span>}
                </motion.span>
              ))}
              {profile?.bioSuffix || ". Dalam proses kerja, saya mengutamakan storytelling yang kuat dan visual yang menarik."}
            </p>
            <span className="absolute -bottom-5 right-10 text-4xl text-primary/30">&rdquo;</span>
          </motion.div>

          {/* Social Links with TikTok */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-5 mt-10"
          >
            {socialMedia.map((social, i) => {
              const Icon = iconMap[social.icon] || Youtube
              // Provide some default hover classes based on the icon for aesthetics
              const hoverClass = social.icon === 'Instagram' 
                ? 'hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]'
                : social.icon === 'Linkedin' ? 'hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]'
                : social.icon === 'TikTokIcon' ? 'hover:text-[#00f2fe] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)]'
                : 'hover:bg-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]'

              return (
              <motion.a
                key={social.platform + i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className={`w-11 h-11 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 ${hoverClass}`}
                aria-label={social.platform}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
