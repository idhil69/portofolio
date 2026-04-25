"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Video, Compass } from "lucide-react"

const iconMap: Record<string, any> = {
  Award,
  Video,
  Compass
}

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(resData => {
        if (resData.certifications) {
          setData(resData.certifications)
        }
      })
      .catch(err => console.error("Failed to load certifications", err))
  }, [])

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      {/* Header */}
      <div className="custom-frame mb-8 flex items-center gap-2 self-start">
        <Award className="w-4 h-4 text-primary" />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary m-0">
          Certifications
        </h3>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((cert, index) => {
          const Icon = iconMap[cert.icon] || Award
          return (
            <motion.div
              key={cert.title + index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`glass p-8 rounded-2xl border-l-4 ${cert.borderColor} cursor-pointer group relative overflow-hidden`}
          >
            <div className="absolute -right-8 -top-8 w-24 h-24 text-foreground/5 group-hover:text-primary/10 transition-colors">
              <Icon className="w-full h-full" />
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-14 h-14 rounded-2xl bg-${cert.color}/10 flex items-center justify-center mb-4 group-hover:bg-${cert.color}/20 transition-all`}
            >
              <Icon className={`w-7 h-7 text-${cert.color}`} />
            </motion.div>

            {/* Content */}
            <p
              className={`text-[10px] text-${cert.color} font-bold uppercase tracking-[0.15em] mb-2`}
            >
              {cert.year}
            </p>
            <h5 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
              {cert.title}
            </h5>
            <p className="text-xs text-muted-foreground">{cert.issuer}</p>
          </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
