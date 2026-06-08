"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Smartphone, Mail, Dribbble, Twitter, Facebook, Youtube } from "lucide-react"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [socialMedia, setSocialMedia] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.socialMedia) setSocialMedia(data.socialMedia)
      })
      .catch(err => console.error("Failed to load social media", err))
  }, [])

  return (
    <section id="contact" ref={ref} className="py-24 text-center bg-white dark:bg-[#111]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-xl md:text-2xl font-bold uppercase text-[#353535] dark:text-gray-100 tracking-[4px] inline-block pb-4 border-b-2 border-[#CCCCCC] dark:border-gray-700">
            Drop <span className="text-[#bf4b4b]">me</span> a line
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Address Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#F3F5F8] dark:bg-[#1a1a1a] shadow-[0_3px_0_0_#bf4b4b] p-8 transition-all duration-500 hover:shadow-[0_3px_0_0_#FFE800] hover:-translate-y-4"
          >
            <h2 className="text-[15px] text-[#353535] dark:text-gray-200 uppercase font-bold tracking-widest flex flex-col items-center gap-2 relative pb-5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[65px] after:h-[1px] after:bg-[#CCCCCC] dark:after:bg-gray-700">
              <MapPin className="w-8 h-8 mb-2" />
              <span>Address</span>
            </h2>
            <p className="mt-6 text-[#8c9398] text-[14px]">Morowali, Sulawesi Tengah<br/>Indonesia</p>
          </motion.div>

          {/* Phone Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-[#F3F5F8] dark:bg-[#1a1a1a] shadow-[0_3px_0_0_#bf4b4b] p-8 transition-all duration-500 hover:shadow-[0_3px_0_0_#FFE800] hover:-translate-y-4"
          >
            <h2 className="text-[15px] text-[#353535] dark:text-gray-200 uppercase font-bold tracking-widest flex flex-col items-center gap-2 relative pb-5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[65px] after:h-[1px] after:bg-[#CCCCCC] dark:after:bg-gray-700">
              <Smartphone className="w-8 h-8 mb-2" />
              <span>Phone</span>
            </h2>
            <p className="mt-6 text-[#8c9398] text-[14px]">+62 815 2428 1213</p>
          </motion.div>

          {/* Email Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#F3F5F8] dark:bg-[#1a1a1a] shadow-[0_3px_0_0_#bf4b4b] p-8 transition-all duration-500 hover:shadow-[0_3px_0_0_#FFE800] hover:-translate-y-4"
          >
            <h2 className="text-[15px] text-[#353535] dark:text-gray-200 uppercase font-bold tracking-widest flex flex-col items-center gap-2 relative pb-5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[65px] after:h-[1px] after:bg-[#CCCCCC] dark:after:bg-gray-700">
              <Mail className="w-8 h-8 mb-2" />
              <span>Email</span>
            </h2>
            <p className="mt-6 text-[#8c9398] text-[14px]">muhrahmadhanaidilfadly@gmail.com</p>
          </motion.div>
        </div>

        {/* Form and Map (Placeholder for Map) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-sm relative overflow-hidden flex items-center justify-center text-gray-500"
          >
            {/* Simple Map Placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255160.77180415302!2d121.72483861298418!3d-2.58414436577881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d8fe1b14da2c6d7%3A0x3030bfbcaf77170!2sKabupaten%20Morowali%2C%20Sulawesi%20Tengah!5e0!3m2!1sid!2sid!4v1709696404975!5m2!1sid!2sid" 
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 bg-[#F3F5F8] dark:bg-[#1a1a1a] border-none text-[#353535] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bf4b4b] transition-all" />
                </div>
                <div>
                  <input type="email" placeholder="Email address" className="w-full px-4 py-3 bg-[#F3F5F8] dark:bg-[#1a1a1a] border-none text-[#353535] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bf4b4b] transition-all" />
                </div>
              </div>
              <div>
                <textarea placeholder="Write your message here..." className="w-full px-4 py-3 bg-[#F3F5F8] dark:bg-[#1a1a1a] border-none text-[#353535] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bf4b4b] transition-all h-[232px] resize-none"></textarea>
              </div>
              <button type="button" className="bg-[#bf4b4b] text-white font-bold uppercase tracking-widest py-3 px-8 hover:bg-[#c23636] transition-colors border-none cursor-pointer">
                Send message
              </button>
            </form>
          </motion.div>
        </div>

        {/* Social Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {socialMedia.map((social, i) => (
            <a 
              key={i} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#CCCCCC] dark:border-gray-700 flex items-center justify-center text-[#CCCCCC] dark:text-gray-500 hover:bg-[#bf4b4b] hover:text-white hover:border-[#bf4b4b] transition-all duration-300"
            >
              {social.icon === 'Youtube' ? <Youtube className="w-4 h-4" /> :
               social.icon === 'Instagram' ? <span className="font-bold">IG</span> :
               social.icon === 'Linkedin' ? <span className="font-bold">IN</span> :
               <span className="font-bold">TK</span>}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
