"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Handshake, Mail, MessageCircle } from "lucide-react"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      id="contact"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="mb-32 px-6 overflow-hidden"
    >
      <div className="relative py-24 border-y border-border/20 group">
        {/* Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/30 blur-[150px] rounded-full"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="animate-float inline-block mb-8"
          >
            <Handshake className="w-16 h-16 text-primary/50" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-10 leading-tight"
          >
            Let&apos;s make something
            <br />
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="font-black italic bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              memorable.
            </motion.span>
          </motion.h2>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 px-6 py-3 border border-primary/30 rounded-full bg-primary/10 mb-12 shadow-lg shadow-primary/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <p className="text-primary text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
              Available for freelance projects 2026
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="mailto:muhrahmadhanaidilfadly@gmail.com"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="glass px-8 py-4 rounded-full flex items-center gap-4 font-bold tracking-[0.15em] uppercase text-xs transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:shadow-primary/40 group"
            >
              <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              Email Me
            </motion.a>

            <motion.a
              href="https://wa.me/6281524281213"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="glass px-8 py-4 rounded-full flex items-center gap-4 font-bold tracking-[0.15em] uppercase text-xs transition-all hover:bg-green-600 hover:text-white hover:shadow-xl hover:shadow-green-500/40 group"
            >
              <MessageCircle className="w-5 h-5 text-green-400 group-hover:text-white group-hover:rotate-12 transition-all" />
              WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
