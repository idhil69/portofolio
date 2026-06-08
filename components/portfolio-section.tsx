"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

function getAutoThumb(item: any): string {
  if (item.image) return item.image
  const url = item.link || ""
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.includes("v=")
      ? url.split("v=")[1]?.split("&")[0]
      : url.split("/").pop()
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
  return "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=600&auto=format&fit=crop"
}

function CategoryBlock({ category, isInView, catIndex }: { category: any, isInView: boolean, catIndex: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const itemsToShow = isExpanded ? category.items : category.items.slice(0, 4)
  const hasMore = category.items.length > 4

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8 text-left w-full max-w-7xl mx-auto px-4"
      >
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          disabled={!hasMore}
        >
          <div className="pl-3 border-l-4 border-[#bf4b4b]">
            <h2 className="text-lg font-bold uppercase tracking-widest text-[#353535] dark:text-gray-200 group-hover:text-[#bf4b4b] transition-colors">
              {category.title}
            </h2>
          </div>
          {hasMore && (
            <div className="ml-2 bg-[#F3F5F8] dark:bg-[#2a2a2a] p-1 rounded-full text-[#353535] dark:text-gray-300 group-hover:bg-[#bf4b4b] group-hover:text-white transition-colors">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          )}
        </button>
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full max-w-7xl mx-auto bg-white dark:bg-[#111]">
        <AnimatePresence mode="popLayout">
          {itemsToShow.map((item: any, index: number) => (
            <motion.div
              key={`${category.id}-${item.name}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square overflow-hidden group block border border-transparent hover:border-[#bf4b4b] hover:z-30"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20">
                <span className="sr-only">View Project</span>
              </a>
              
              <Image
                src={getAutoThumb(item)}
                alt={item.name}
                fill
                className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#bf4b4b]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center z-10">
                <h3 className="text-white font-bold text-lg uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.name}
                </h3>
                <p className="text-[#FFE800] text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {hasMore && (
        <div className="w-full max-w-7xl mx-auto mt-6 text-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-bold uppercase tracking-widest text-[#bf4b4b] hover:text-[#353535] dark:hover:text-white transition-colors py-2 px-6 border border-[#bf4b4b] rounded-full hover:bg-[#bf4b4b] hover:text-white"
          >
            {isExpanded ? "Tampilkan Lebih Sedikit" : `Lihat Semua ${category.items.length} Project`}
          </button>
        </div>
      )}
    </div>
  )
}

export function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(resData => {
        if (resData.portfolio) {
          setData(resData.portfolio)
        }
      })
      .catch(err => console.error("Failed to load portfolio data", err))
  }, [])

  return (
    <section id="portfolio" ref={ref} className="py-24 text-center bg-[#F3F5F8] dark:bg-[#1a1a1a]">
      <div className="container mx-auto px-0 md:px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-xl md:text-2xl font-bold uppercase text-[#353535] dark:text-gray-100 tracking-[4px] inline-block pb-4 border-b-2 border-[#CCCCCC] dark:border-gray-700">
            Recent <span className="text-[#bf4b4b]">Projects</span>
          </h1>
        </motion.div>

        <div className="space-y-24">
          {data.map((category, catIndex) => (
            <CategoryBlock 
              key={category.id || catIndex} 
              category={category} 
              isInView={isInView} 
              catIndex={catIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
