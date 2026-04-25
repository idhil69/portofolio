"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { CertificationsSection } from "@/components/certifications-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { DocumentationSection } from "@/components/documentation-section"
import { ReviewsSection } from "@/components/reviews-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 space-y-20">
        {/* Experience & Skills Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ExperienceSection />
          <SkillsSection />
        </section>

        {/* Certifications */}
        <CertificationsSection />

        {/* Portfolio */}
        <PortfolioSection />

        {/* Documentation Gallery */}
        <DocumentationSection />

        {/* Reviews */}
        <ReviewsSection />
      </div>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
