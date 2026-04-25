"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="pb-20 pt-10 text-center">
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full glass flex items-center justify-center mb-6 mx-auto hover:bg-primary hover:text-primary-foreground transition-all"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      <p className="text-[10px] tracking-[0.4em] uppercase font-medium text-muted-foreground/60">
        &copy; 2026 Muh. Rahmadhan Aidil Fadly RM
      </p>
    </footer>
  )
}
