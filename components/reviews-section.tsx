"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import {
  MessageSquare,
  Star,
  User,
  Send,
  Building,
  MessageCirclePlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function ReviewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [reviews, setReviews] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    rating: "5",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.reviews) setReviews(data.reviews)
      })
      .catch(err => console.error("Failed to load reviews", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Fetch current data
      const resData = await fetch('/api/data').then(res => res.json())
      
      // 2. Add new review
      const newReview = {
        name: formData.name,
        type: "Client Feedback",
        rating: parseInt(formData.rating),
        message: formData.message,
        date: new Date().toISOString()
      }
      
      const updatedData = {
        ...resData,
        reviews: [newReview, ...(resData.reviews || [])]
      }

      // 3. Save to database
      const saveRes = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })

      if (saveRes.ok) {
        setReviews(updatedData.reviews)
        setFormData({ name: "", rating: "5", message: "" })
        alert("Terima kasih atas feedback Anda!")
      } else {
        alert("Gagal mengirim feedback.")
      }
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan koneksi.")
    }
    setIsSubmitting(false)
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      {/* Header */}
      <div className="custom-frame mb-12 flex items-center gap-3">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary m-0">
          Client Reviews
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Review Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 glass p-8 rounded-3xl border-t-4 border-t-primary relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 text-9xl text-foreground/5">
            <Star className="w-32 h-32" />
          </div>

          <h4 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
            <MessageCirclePlus className="w-5 h-5 text-primary" />
            Beri Penilaian
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Nama / Perusahaan"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary focus:bg-background transition-all"
              />
            </div>

            {/* Rating Select */}
            <div className="relative">
              <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary appearance-none"
              >
                <option value="5">⭐⭐⭐⭐⭐ (Sangat Puas)</option>
                <option value="4">⭐⭐⭐⭐ (Puas)</option>
                <option value="3">⭐⭐⭐ (Lumayan)</option>
                <option value="2">⭐⭐ (Kurang)</option>
                <option value="1">⭐ (Buruk)</option>
              </select>
            </div>

            {/* Message Input */}
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
              <textarea
                placeholder="Tulis masukan anda di sini..."
                rows={4}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary focus:bg-background transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold py-6 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>Menunggu...</>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Feedback
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Reviews Display */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="absolute right-6 top-6 text-5xl text-foreground/5 group-hover:text-primary/10 transition-colors">
                <MessageSquare className="w-16 h-16" />
              </div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-inner">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">{review.name}</h5>
                    <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider font-bold border border-primary/20">
                      {review.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-sm md:text-base italic text-muted-foreground leading-relaxed mt-4">
                &quot;{review.message}&quot;
              </p>
            </motion.div>
          ))}

          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="glass p-10 rounded-2xl border border-dashed border-border opacity-60 flex flex-col items-center justify-center text-center group hover:opacity-100 transition-all cursor-crosshair"
          >
            <MessageCirclePlus className="w-10 h-10 text-muted-foreground mb-3 group-hover:text-primary group-hover:scale-110 transition-all" />
            <p className="text-muted-foreground">
              Ruang untuk testimoni klien lainnya...
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
