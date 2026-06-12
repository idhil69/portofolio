"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Shield, FileBadge } from "lucide-react"

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

  if (data.length === 0) return null;

  return (
    <section id="certifications" ref={ref} className="py-24 text-center bg-white dark:bg-[#111]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-xl md:text-2xl font-bold uppercase text-[#353535] dark:text-gray-100 tracking-[4px] inline-block pb-4 border-b-2 border-[#CCCCCC] dark:border-gray-700">
            My <span className="text-[#bf4b4b]">Certifications</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-[#F3F5F8] dark:bg-[#1a1a1a] p-8 text-left border-t-4 border-[#bf4b4b] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
            >
              <div className="absolute -right-6 -top-6 text-black/5 dark:text-white/5 group-hover:text-[#bf4b4b]/10 transition-colors">
                <Award className="w-32 h-32" />
              </div>
              
              <div className="flex flex-col h-full relative z-10">
                <span className="inline-block px-3 py-1 text-xs font-bold bg-[#bf4b4b] text-white self-start mb-6">
                  {cert.year}
                </span>
                <h4 className="text-lg font-bold uppercase tracking-wider text-[#353535] dark:text-gray-100 mb-2">
                  {cert.title}
                </h4>
                <p className="text-[#8c9398] text-[14px] mt-auto pt-4 border-t border-[#CCCCCC] dark:border-gray-700">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
