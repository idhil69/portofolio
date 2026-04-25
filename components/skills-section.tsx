"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import {
  Zap,
  Film,
  PenTool,
  ImageIcon,
  SlidersHorizontal,
  Palette,
  Radio,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SkillBarProps {
  skill: {
    name: string
    level: number
    icon: string
    color: string
  }
  delay: number
  isVisible: boolean
}

// Icon Map
const iconMap: Record<string, any> = {
  Zap,
  Film,
  PenTool,
  ImageIcon,
  SlidersHorizontal,
  Palette,
  Radio,
  ChevronDown
}

function SkillBar({ skill, delay, isVisible }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between mb-2 items-center">
        <span className="text-[11px] font-bold uppercase flex items-center gap-2">
          {(() => {
            const Icon = iconMap[skill.icon as string] || Zap
            return <Icon className="w-5 h-5 text-primary group-hover:scale-125 transition-transform" />
          })()}
          {skill.name}
        </span>
        <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-md border border-primary/20 text-sm">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-lg`}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const [showMore, setShowMore] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [data, setData] = useState<any>({ main: [], additional: [] })

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(resData => {
        if (resData.skills) {
          setData(resData.skills)
        }
      })
      .catch(err => console.error("Failed to load skills", err))
  }, [])

  return (
    <motion.div
      ref={ref}
      id="skill-section"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass p-6 md:p-8 rounded-2xl"
    >
      {/* Header */}
      <div className="custom-frame mb-8 flex items-center gap-2">
        <Zap className="w-4 h-4 text-yellow-400" />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary m-0">
          Expertise Levels
        </h3>
      </div>

      {/* Main Skills */}
      <div className="space-y-6">
        {data.main.map((skill: any, index: number) => (
          <SkillBar
            key={skill.name + index}
            skill={skill}
            delay={index * 0.15}
            isVisible={isInView}
          />
        ))}
      </div>

      {/* Additional Skills */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showMore ? "auto" : 0,
          opacity: showMore ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <div className="space-y-6 mt-6 pt-6 border-t border-border/50">
          {data.additional.map((skill: any, index: number) => (
            <SkillBar
              key={skill.name + index}
              skill={skill}
              delay={index * 0.1}
              isVisible={showMore && isInView}
            />
          ))}
        </div>
      </motion.div>

      {/* Toggle Button */}
      <Button
        onClick={() => setShowMore(!showMore)}
        variant="outline"
        className="w-full mt-6 py-5 border-primary/25 bg-primary/5 hover:bg-primary/90 hover:text-primary-foreground rounded-xl text-[10px] font-medium uppercase tracking-[0.15em] transition-all group"
      >
        <motion.span
          animate={{ rotate: showMore ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mr-2"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
        {showMore ? "Sembunyikan Skills" : "Lihat Skill Selengkapnya"}
      </Button>
    </motion.div>
  )
}
