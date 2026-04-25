"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Building, GraduationCap, Video, Paintbrush } from "lucide-react"

const experiences = [
  {
    period: "2022 - 2025",
    title: "Video Editor & Graphic Designer",
    company: "Dinas Kominfo SP Kab. Morowali",
    description:
      "Mengelola konten publik & social media branding instansi pemerintahan.",
    icon: Video,
    color: "primary",
  },
  {
    period: "Jul - Des 2020",
    title: "Junior Graphic Designer",
    company: "CV. Multi Advertising",
    description: "Membuat desain visual untuk berbagai keperluan advertising.",
    icon: Paintbrush,
    color: "accent",
  },
  {
    period: "2016 - 2021",
    title: "D3 Arsitektur",
    company: "Universitas Halu Oleo, Kendari",
    description: "Pendidikan formal di bidang arsitektur dan desain.",
    icon: GraduationCap,
    color: "primary",
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass p-6 md:p-8 rounded-2xl"
    >
      {/* Header */}
      <div className="custom-frame mb-8 flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-primary" />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary m-0">
          Career & Education
        </h3>
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="relative pl-10 pb-8 border-l-2 border-dashed border-primary/30 last:pb-0 group hover:border-primary transition-colors"
          >
            {/* Timeline Icon */}
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="absolute -left-[18px] top-0 w-9 h-9 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:bg-primary transition-colors z-10"
            >
              <exp.icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
            </motion.div>

            {/* Content */}
            <div className="group-hover:translate-x-2 transition-transform">
              <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-md border border-primary/20 mb-2">
                {exp.period}
              </span>
              <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                {exp.title}
              </h4>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                <Building className="w-4 h-4" />
                {exp.company}
              </p>
              <p className="text-xs text-muted-foreground/70 bg-secondary/30 p-3 rounded-lg border border-border/50">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
