import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { SpotlightCanvas } from './components/SpotlightCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/admin/AuthModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { CertificateViewModal } from './components/CertificateViewModal';

export default function App() {
  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PortfolioProvider>
          <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 font-sans antialiased selection:bg-white/20 selection:text-white relative">
            {/* Subtle Radial Mouse-Spotlight Glow Canvas */}
            <SpotlightCanvas />

            {/* Top Sticky Backdrop-Blur Navigation */}
            <Navbar onOpenContact={scrollToContact} />

            {/* Main Content Sections */}
            <main className="relative z-10">
              {/* Split-screen Hero: Circular Headshot framed by 3D orbital badges & live tags */}
              <HeroSection onOpenContact={scrollToContact} />

              {/* Glassmorphic Bento Cards: About & Engineering Rigor */}
              <AboutSection />

              {/* Glassmorphic Bento Cards: Filterable Category Pills & Case Study Modals */}
              <ProjectsSection />

              {/* Industry Experience & Internships */}
              <ExperienceSection />

              {/* Academic Degrees & Verified Credentials */}
              <EducationSection />

              {/* Skills Matrix with Original Symbols (No percentages) */}
              <SkillsSection />

              {/* Interactive Contact Section */}
              <ContactSection />
            </main>

            {/* Dark Obsidian Glassmorphic Footer */}
            <Footer />

            {/* Global Interactive Management & Viewer Modals */}
            <AuthModal />
            <AdminDashboardModal />
            <CertificateViewModal />
          </div>
        </PortfolioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
