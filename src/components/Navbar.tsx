import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Phone, Mail, Terminal, LogIn, Settings, LogOut, ShieldCheck, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { AccentSwitcher } from './AccentSwitcher';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { config } = useTheme();
  const { profile, isAuthenticated, openAuthModal, openAdminModal, logout } = usePortfolio();
  const info = profile || personalInfo;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    let scrollRaf: number | null = null;
    const handleScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        const sections = ['hero', 'about', 'projects', 'experience', 'education', 'skills', 'contact'];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 180 && rect.bottom >= 180) {
              setActiveSection(section);
              break;
            }
          }
        }
        scrollRaf = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Skills', href: '#skills', id: 'skills' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.7)] py-3'
          : 'bg-[#0a0a0a]/60 backdrop-blur-lg border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#141414]/80 border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-navbar-pill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm"
                      style={{ borderColor: `${config.hex}60` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Live Connection Status, Accent Switcher, Log In / Admin, Call & Contact Button */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Live System & Network Connection Health Pill */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141414] border border-white/10 text-[11px] font-mono shadow-xs">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={isOnline ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                {isOnline ? 'Connected • Stable' : 'Offline Cache'}
              </span>
            </div>

            {/* Interactive Dynamic Accent Switcher */}
            <AccentSwitcher />

            {/* Quick Call Button */}
            <a
              href={`tel:${(info.phone || '+91-6300697301').replace(/[^0-9+]/g, '')}`}
              className="p-2 rounded-xl bg-[#141414] border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all text-xs font-mono flex items-center gap-1.5"
              title={`Direct Call: ${info.phone || '+91-6300697301'}`}
            >
              <Phone className="w-3.5 h-3.5" style={{ color: config.hex }} />
              <span className="hidden xl:inline">{info.phone || '+91-6300697301'}</span>
            </a>

            {/* GitHub Profile */}
            <a
              href={info.github || "https://github.com/saidurganivas02?tab=repositories"}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repositories"
              title="GitHub Repositories"
              className="p-2 rounded-xl bg-[#141414] border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all flex items-center justify-center"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href={info.linkedin || "https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b"}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              className="p-2 rounded-xl bg-[#141414] border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all flex items-center justify-center"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>

            {/* Log In / Admin Panel Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 bg-[#141414] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => openAdminModal()}
                  id="nav-admin-dashboard-btn"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-white bg-white/10 hover:bg-white/15 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
                  style={{ color: config.hex }}
                >
                  <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Admin</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </button>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                id="nav-login-btn"
                className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-200 hover:text-white bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 hover:border-white/25 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" style={{ color: config.hex }} />
                <span>Log in</span>
              </button>
            )}

            {/* Direct Contact Button with Dynamic Accent Gradient */}
            <button
              onClick={onOpenContact}
              id="nav-contact-cta"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              style={{
                backgroundImage: `linear-gradient(to right, ${config.hex}, ${config.hex}cc)`,
                boxShadow: `0 4px 20px ${config.glowRgba}`,
              }}
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Switcher Toggle */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <AccentSwitcher compact />
            {isAuthenticated ? (
              <button
                onClick={() => openAdminModal()}
                className="p-2 rounded-xl bg-white/10 border border-white/20 text-white"
                style={{ color: config.hex }}
                title="Admin Panel"
              >
                <Settings className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                className="p-2 rounded-xl bg-[#141414] border border-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1"
                title="Log In"
              >
                <LogIn className="w-4 h-4" style={{ color: config.hex }} />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#141414] border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glassmorphic Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl px-5 py-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-zinc-400">Accent Theme</span>
              <AccentSwitcher />
            </div>

            {/* Mobile Auth Button */}
            <div className="pb-3 border-b border-white/10">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAdminModal();
                    }}
                    className="flex items-center gap-2 text-xs font-mono text-white font-bold"
                    style={{ color: config.hex }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Open Admin Panel</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-mono text-rose-400 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#171717] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" style={{ color: config.hex }} />
                  <span>Log In</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeSection === link.id
                      ? 'bg-white/10 text-white border border-white/20 font-bold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`tel:${info.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#171717] border border-white/10 text-zinc-200 text-xs font-mono"
              >
                <Phone className="w-3.5 h-3.5" style={{ color: config.hex }} />
                <span>Call {info.phone}</span>
              </a>
              <a
                href={info.github || "https://github.com/saidurganivas02?tab=repositories"}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#171717] border border-white/10 text-zinc-200 text-xs font-mono hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repositories</span>
              </a>
              <a
                href={info.linkedin || "https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b"}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#171717] border border-white/10 text-zinc-200 text-xs font-mono hover:text-white"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 rounded-xl text-xs font-bold text-white text-center shadow-lg"
                style={{
                  backgroundColor: config.hex,
                  boxShadow: `0 4px 20px ${config.glowRgba}`,
                }}
              >
                Send Message / Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
