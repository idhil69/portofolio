"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Images, ChevronLeft, ChevronRight, Grid, Rows, Search } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const documentationImages = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=600&fit=crop",
]

export function DocumentationSection() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isGridView, setIsGridView] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>(documentationImages)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.documentation) {
          setImages(data.documentation)
        }
      })
      .catch(err => console.error("Failed to load documentation", err))
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      {/* Modal Preview */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[1000] flex items-center justify-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative max-w-[90%] max-h-[90%] rounded-xl overflow-hidden shadow-[0_0_50px_oklch(0.65_0.2_250/0.5)] border border-primary/30"
          >
            <Image
              src={selectedImage}
              alt="Preview"
              width={800}
              height={800}
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}

      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.5, 0, 0, 1] }}
        className="mb-20"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="custom-frame flex items-center gap-3">
            <Images className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary m-0">
              Documentation
            </h3>
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full glass hover:bg-primary hover:shadow-[0_0_15px_oklch(0.65_0.2_250/0.6)] transition-all group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full glass hover:bg-primary hover:shadow-[0_0_15px_oklch(0.65_0.2_250/0.6)] transition-all group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div
          ref={scrollRef}
          className={`${
            isGridView
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "carousel-mode no-scrollbar px-2 py-4"
          }`}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => setSelectedImage(img)}
              className="slide-card group cursor-pointer"
            >
              <div className="slide-card-inner aspect-square rounded-3xl overflow-hidden border border-border/50 shadow-lg relative">
                {/* Blue overlay on hover */}
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                
                <Image
                  src={img}
                  alt={`Documentation ${index + 1}`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-125"
                />
                
                {/* Search icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-all duration-500 transform scale-50 group-hover:scale-100">
                  <div className="w-16 h-16 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-border/20">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toggle View Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setIsGridView(!isGridView)}
            variant="outline"
            className="px-10 py-3 border border-border/20 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:border-primary shadow-lg hover:shadow-[0_0_25px_oklch(0.65_0.2_250/0.5)] transition-all flex items-center gap-2 group"
          >
            {isGridView ? (
              <>
                <Rows className="w-4 h-4 group-hover:animate-pulse" />
                Kecilkan Tampilan
              </>
            ) : (
              <>
                <Grid className="w-4 h-4 group-hover:animate-pulse" />
                Tampilkan Grid Gallery
              </>
            )}
          </Button>
        </div>
      </motion.section>
    </>
  )
}
