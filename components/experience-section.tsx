"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Building, GraduationCap, Video, Paintbrush } from "lucide-react"

const experiences = [
  {
    period: "2022 - 2025",
    title: "Video Editor & Graphic Designer",
    company: "Dinas Kominfo SP Kab. Morowali",
    description: "Mengelola konten publik & social media branding instansi pemerintahan.",
    icon: Video,
  },
  {
    period: "Jul - Des 2020",
    title: "Junior Graphic Designer",
    company: "CV. Multi Advertising",
    description: "Membuat desain visual untuk berbagai keperluan advertising.",
    icon: Paintbrush,
  },
  {
    period: "2016 - 2021",
    title: "D3 Arsitektur",
    company: "Universitas Halu Oleo, Kendari",
    description: "Pendidikan formal di bidang arsitektur dan desain.",
    icon: GraduationCap,
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="bg-[#bf4b4b] text-white py-24 text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-xl md:text-2xl font-bold uppercase tracking-[4px] inline-block pb-4 border-b-2 border-white mb-8">
            A little <span className="text-[#FFE800]">about</span> me
          </h1>
          <p className="text-lg leading-loose font-light mb-16">
            Saya adalah seorang kreator multimedia yang memiliki pengalaman dalam bidang Video Editing, Videografi, Fotografi, dan Desain Grafis. Dalam proses kerja, saya mengutamakan storytelling yang kuat dan visual yang menarik.
          </p>
        </motion.div>

        {/* Experience Timeline styled as clean list */}
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#FFE800] mb-8 text-center">Career & Education</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-sm border-l-4 border-[#FFE800] hover:bg-white/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="text-lg font-bold uppercase tracking-wider">{exp.title}</h4>
                  <span className="inline-block px-3 py-1 text-xs font-bold bg-[#FFE800] text-[#bf4b4b] mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="flex items-center gap-2 font-medium mb-3">
                  <Building className="w-4 h-4 text-[#FFE800]" />
                  {exp.company}
                </p>
                <p className="text-sm opacity-90 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
