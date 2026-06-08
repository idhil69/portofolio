"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function DocumentationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [images, setImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.documentation) {
          const validImages = data.documentation.filter((img: string) => img && img.trim() !== "")
          setImages(validImages)
        }
      })
      .catch(err => console.error("Failed to load documentation", err))
  }, [])


  return (
    <>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[1000] flex items-center justify-center cursor-pointer"
        >
          <div className="relative max-w-[90%] max-h-[90%] w-full h-full p-4 flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Preview"
              width={1200}
              height={1200}
              className="object-contain max-h-[90vh]"
            />
          </div>
        </motion.div>
      )}

      <section id="gallery" ref={ref} className="py-24 text-center bg-white dark:bg-[#111]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-xl md:text-2xl font-bold uppercase text-[#353535] dark:text-gray-100 tracking-[4px] inline-block pb-4 border-b-2 border-[#CCCCCC] dark:border-gray-700">
              Photo <span className="text-[#bf4b4b]">Gallery</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => setSelectedImage(img)}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#bf4b4b]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
