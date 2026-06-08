"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Briefcase, Camera, Image as ImageIcon, FileText, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#experience", label: "About", icon: FileText },
  { href: "#services", label: "Service", icon: Briefcase },
  { href: "#portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "#contact", label: "Contact", icon: Mail },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.profile?.logoUrl) setLogoUrl(data.profile.logoUrl)
      })
      .catch(() => {})
  }, [])

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Logo - Fixed Top Left */}
      <div className="fixed top-5 left-6 z-[60] flex items-center gap-3">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="flex items-center gap-3 group"
        >
          {logoUrl ? (
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#bf4b4b] shadow-md">
              <Image
                src={logoUrl}
                alt="Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#bf4b4b] flex items-center justify-center border-2 border-[#bf4b4b] shadow-md">
              <span className="text-white font-bold text-sm tracking-wider">AF</span>
            </div>
          )}
        </a>
      </div>

      {/* Menu Button Fixed Top Right */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-6 right-6 z-[60] w-12 h-12 flex items-center justify-center bg-transparent border-none text-[#353535] dark:text-gray-100 hover:opacity-60 transition-opacity"
      >
        {isMobileMenuOpen ? (
          <X className="w-8 h-8 text-[#353535] dark:text-white" />
        ) : (
          <Menu className="w-8 h-8" />
        )}
      </button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-white dark:bg-[#111] border-b-4 border-[#bf4b4b] flex flex-col justify-center"
          >
            <div className="container mx-auto px-6">
              <nav className="flex flex-col items-center md:items-end justify-center h-full space-y-6 md:pr-24">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        setIsMobileMenuOpen(false)
                        setTimeout(() => {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
                        }, 500)
                      }}
                      className="group flex items-center gap-4 text-2xl md:text-4xl font-bold uppercase tracking-widest text-[#353535] dark:text-gray-100 hover:text-[#bf4b4b] transition-colors"
                    >
                      <link.icon className="w-6 h-6 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 transition-opacity text-[#bf4b4b]" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
