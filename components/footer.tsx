"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="py-8 text-center bg-[#F3F5F8] dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <p className="text-[#8c9398] text-[14px]">
          All Rights Reserved. &copy; {new Date().getFullYear()}{" "}
          <a href="#" className="text-[#bf4b4b] hover:text-[#353535] dark:hover:text-white transition-colors border-b border-dashed border-[#bf4b4b]">
            Muh. Rahmadhan Aidil Fadly RM
          </a>
        </p>
      </div>
    </footer>
  )
}
