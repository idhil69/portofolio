"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { DocumentationSection } from "@/components/documentation-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111] overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <ExperienceSection />

      {/* Services Section */}
      <SkillsSection />

      {/* Portfolio */}
      <PortfolioSection />

      {/* Gallery Section */}
      <DocumentationSection />

      {/* Contact Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
