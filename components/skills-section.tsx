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

export function SkillsSection() {
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

  const allSkills = [...data.main, ...data.additional]

  return (
    <section id="services" ref={ref} className="py-24 text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-xl md:text-2xl font-bold uppercase text-[#353535] dark:text-gray-100 tracking-[4px] inline-block pb-4 border-b-2 border-[#CCCCCC] dark:border-gray-700">
            Expertise & <span className="text-[#bf4b4b]">Skills</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {allSkills.map((skill: any, index: number) => {
            const Icon = iconMap[skill.icon as string] || Zap
            return (
              <motion.div
                key={skill.name + index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex flex-col items-center"
              >
                <div className="w-[175px] h-[175px] mx-auto text-center flex items-center justify-center text-[56px] text-[#bf4b4b] rounded-full border border-[#bf4b4b] mb-10 transition-all duration-300 group-hover:bg-[#bf4b4b] group-hover:text-white group-hover:shadow-[0_15px_30px_rgba(224,67,67,0.3)]">
                  <Icon className="w-16 h-16 transition-transform duration-300 group-hover:scale-125" />
                </div>
                <h2 className="text-[15px] text-[#353535] dark:text-gray-200 uppercase font-bold tracking-widest relative pb-5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[65px] after:h-[1px] after:bg-[#CCCCCC] dark:after:bg-gray-700">
                  {skill.name}
                </h2>
                <p className="mt-6 text-[#8c9398] text-[14px] leading-[25px]">
                  Proficiency Level: <span className="font-bold text-[#353535] dark:text-gray-300">{skill.level}%</span>
                </p>
                <div className="w-full max-w-[200px] h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className="h-full bg-[#bf4b4b]"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
