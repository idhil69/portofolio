"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import {
  Film,
  Smartphone,
  Fingerprint,
  PenTool,
  Video,
  Image as ImageIcon,
  Music,
  Globe,
  Code,
  Award,
  Camera,
  Layers,
  Palette,
  Monitor,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Grid,
  Rows,
  Tag,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// TikTok Icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

// YouTube Icon
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

// Google Drive Icon
function DriveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.433 22.396l4-6.929H24l-4 6.929H4.433zm3.566-6.929L0 3.396h8L15.566 15.467H7.999zM12 3.396h8l-7.999 13.857-4-6.928L12 3.396z" />
    </svg>
  )
}

interface PortfolioItem {
  name: string
  link: string
  image?: string
  description: string
}

interface PortfolioCategory {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  isVertical?: boolean
  items: PortfolioItem[]
}

// Function to get YouTube thumbnail
function getAutoThumb(item: PortfolioItem): string {
  if (item.image) return item.image
  const url = item.link
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.includes("v=")
      ? url.split("v=")[1]?.split("&")[0]
      : url.split("/").pop()
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
  return "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=600&auto=format&fit=crop"
}

// Function to get icon based on URL
function getUrlIcon(url: string) {
  if (url.includes("youtube") || url.includes("youtu.be")) return YouTubeIcon
  if (url.includes("tiktok")) return TikTokIcon
  if (url.includes("drive")) return DriveIcon
  return ExternalLink
}

const portfolioData: PortfolioCategory[] = [
  {
    id: "v-edit",
    title: "video konten",
    icon: Film,
    items: [
      {
        name: "Ragam Morowali",
        link: "https://www.youtube.com/watch?v=qeVRIitWFAw",
        description: "Di Balik Tangan Terampil Pengrajin Sapu Ijuk di Desa Sakita",
      },
      {
        name: "Ragam Morowali",
        link: "https://www.youtube.com/watch?v=CJJd5geR73w",
        description: "Layanan Jemput Bola DisDukcapil Morowali",
      },
      {
        name: "Ragam Morowali",
        link: "https://youtu.be/9SxuVk0IMvo",
        description: "Pojok Baca Digital Literasi Di Setiap Sudut Kota",
      },
      {
        name: "Ragam Morowali",
        link: "https://youtu.be/dSw6VWSL9rc",
        description: "ANTIK DAN CANTIK, CERITA DI SETIAP POLESAN",
      },
      {
        name: "Ragam Morowali",
        link: "https://youtu.be/dECoRk_9kyQ",
        description: "INDAHNYA PESONA HUTAN MANGROVE DI IBU KOTA MOROWALI",
      },
      {
        name: "Ragam Morowali",
        link: "https://youtu.be/ojLTgCg7yxc",
        description: "JALINAN WARNA BATIK AMIMOR",
      },
      {
        name: "BISA Bincang Santai",
        link: "https://youtu.be/rUAC2V--ILk",
        description: "Komunikasi Lewat Chat atau Telepon, Mana Lebih Efektif?",
      },
      {
        name: "BISA Bincang Santai",
        link: "https://youtu.be/vDPu2c2XHFE",
        description: "TREN FASHION YANG AKAN RAMAI DI TAHUN 2025",
      },
      {
        name: "BISA Bincang Santai",
        link: "https://youtu.be/AGCl7avy1g8",
        description: "4 MANFAAT MEMILIKI PERENCANAAN BISNIS YANG MATANG",
      },
      {
        name: "Motivasi & Inspirasi",
        link: "https://youtu.be/CWKHVWSKk8c",
        description: "Melewati Rintangan Meraih Mimpi - Kisah Inspiratif S2",
      },
      {
        name: "Motivasi & Inspirasi",
        link: "https://youtu.be/L9aK58YHIco",
        description: "PROSES BELAJAR MENGAJAR PENYANDANG DISABILITAS",
      },
      {
        name: "INOVASI PENANGANAN STUNTING",
        link: "https://youtu.be/JaYEEFS156g",
        description: "Penanganan Stunting",
      },
      {
        name: "MOROWALI SMART CITY",
        link: "https://youtu.be/kbzDp6qhD9o",
        description: "VIRTUAL EXHIBITION 07 - 21 DESEMBER 2023",
      },
      {
        name: "Motion Graphics",
        link: "https://www.tiktok.com/@aflyrics666/video/7520585749025000711",
        description: "TikTok Content",
      },
    ],
  },
  {
    id: "short-video",
    title: "Short Video",
    icon: Smartphone,
    isVertical: true,
    items: [
      {
        name: "Infinite Creatives",
        link: "https://drive.google.com/file/d/1gM5leJf8LnUTjzjTCylXqV4mdp87d8Pz/view",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=600&fit=crop",
        description: "Branding",
      },
      {
        name: "Kupas Lagu AFlyrics",
        link: "https://drive.google.com/file/d/150V7UIAMOUc2YyvwV_xde5WVaK8XnFbX/view",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
        description: "Jinjer - Band Metal Ukraina",
      },
      {
        name: "Kupas Lagu AFlyrics",
        link: "https://www.tiktok.com/@aflyrics666/video/7524973665457343749",
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=600&fit=crop",
        description: "Penyelamat generasi hancur",
      },
      {
        name: "Kue Pia Jungke",
        link: "https://drive.google.com/file/d/150V7UIAMOUc2YyvwV_xde5WVaK8XnFbX/view",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=600&fit=crop",
        description: "Product Branding",
      },
    ],
  },
  {
    id: "branding",
    title: "Branding & Identity",
    icon: Fingerprint,
    items: [
      {
        name: "Kue Pia Jungke",
        link: "#",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
        description: "Product Branding",
      },
      {
        name: "Logo Design",
        link: "#",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
        description: "Corporate Identity",
      },
      {
        name: "Brand Guidelines",
        link: "#",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
        description: "Style Guide",
      },
    ],
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: PenTool,
    items: [
      {
        name: "Poster Project",
        link: "#",
        image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=600&h=400&fit=crop",
        description: "Layout Design",
      },
      {
        name: "Social Media Content",
        link: "#",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
        description: "Content Design",
      },
      {
        name: "Print Materials",
        link: "#",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
        description: "Print Design",
      },
      {
        name: "Digital Art",
        link: "#",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
        description: "Illustrations",
      },
    ],
  },
]

function PortfolioCarousel({ category }: { category: PortfolioCategory }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isGridView, setIsGridView] = useState(false)

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
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.5, 0, 0, 1] }}
      className="mb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4">
        <div className="custom-frame flex items-center gap-2">
          <category.icon className="w-4 h-4 text-primary" />
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary m-0">
            {category.title}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          {/* Navigation Buttons */}
          {!isGridView && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll("left")}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full glass hover:bg-primary/90 hover:shadow-sm transition-all group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll("right")}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full glass hover:bg-primary/90 hover:shadow-sm transition-all group"
              >
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Items */}
      <div
        ref={scrollRef}
        className={`${isGridView
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "carousel-mode no-scrollbar px-2 py-4"
          }`}
      >
        {category.items.map((item, index) => {
          const UrlIcon = getUrlIcon(item.link)
          return (
            <motion.a
              key={item.name + index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`slide-card group ${category.isVertical && !isGridView ? "!min-w-[200px] md:!min-w-[250px]" : ""}`}
            >
              <div
                className={`slide-card-inner relative block overflow-hidden rounded-xl border border-border/30 bg-card shadow-md ${category.isVertical
                  ? "aspect-[9/16] md:aspect-[3/4]"
                  : "aspect-video"
                  }`}
              >
                {/* Image */}
                <Image
                  src={getAutoThumb(item)}
                  alt={item.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
                />

                {/* Overlay with Blue Tint */}
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Icon Button */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:scale-100 scale-50 border border-border/15 z-20 shadow-md"
                >
                  <UrlIcon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
                  <h4 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-md">
                    {item.name}
                  </h4>
                  <p className="text-primary text-[9px] uppercase font-bold tracking-[0.1em] mt-2 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.a>
          )
        })}
      </div>

      {/* View All Button */}
      <div className="mt-5 flex justify-center">
        <Button
          onClick={() => setIsGridView(!isGridView)}
          variant="outline"
          className="px-6 py-2.5 border border-border/15 bg-white/3 rounded-full text-[9px] font-medium uppercase tracking-wider hover:bg-primary/90 hover:border-primary/50 shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
        >
          {isGridView ? (
            <>
              <Rows className="w-4 h-4 group-hover:animate-pulse" />
              Kecilkan Tampilan
            </>
          ) : (
            <>
              <Grid className="w-4 h-4 group-hover:animate-pulse" />
              Lihat Semua {category.title} (Selengkapnya)
            </>
          )}
        </Button>
      </div>
    </motion.section>
  )
}

const iconMap: Record<string, any> = {
  Film,
  Smartphone,
  Fingerprint,
  PenTool,
  Video,
  Image: ImageIcon,
  Music,
  Globe,
  Code,
  Award,
  SmartphoneIcon: Smartphone,
  Camera,
  Layers,
  Palette,
  Monitor,
}

export function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [data, setData] = useState<PortfolioCategory[]>(portfolioData)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(resData => {
        if (resData.portfolio) {
          const mappedData = resData.portfolio.map((cat: any) => ({
            ...cat,
            icon: iconMap[cat.icon] || Film
          }))
          setData(mappedData)
        }
      })
      .catch(err => console.error("Failed to load portfolio data", err))
  }, [])

  return (
    <div ref={ref} id="portfolio-section" className="mb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="space-y-10"
      >
        {data.map((category) => (
          <PortfolioCarousel key={category.id} category={category} />
        ))}
      </motion.div>
    </div>
  )
}
