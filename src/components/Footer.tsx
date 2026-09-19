import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Phone, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { AccentSwitcher } from './AccentSwitcher';

export const Footer: React.FC = () => {
  const { config } = useTheme();
  const { profile } = usePortfolio();
  const info = profile || personalInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] text-zinc-300 py-16 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">
          
          {/* Brand & Identity */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-center font-mono font-bold text-xs"
                style={{ color: config.hex }}
              >
                SD
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {info.name}
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm font-mono">
              MERN Stack Developer & MCA Postgraduate • Available for Full-Time Roles
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">./about</a>
            <a href="#projects" className="hover:text-white transition-colors">./projects</a>
            <a href="#experience" className="hover:text-white transition-colors">./experience</a>
            <a href="#education" className="hover:text-white transition-colors">./education</a>
            <a href="#skills" className="hover:text-white transition-colors">./skills</a>
            <a href="#contact" className="hover:text-white transition-colors">./contact</a>
          </div>

          {/* Socials & Back-to-Top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${info.email}`}
              aria-label="Email"
              title={info.email}
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] border border-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${(info.phone || '+91-6300697301').replace(/[^0-9+]/g, '')}`}
              aria-label="Call"
              title={info.phone || '+91-6300697301'}
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] border border-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={info.github || "https://github.com/saidurganivas02?tab=repositories"}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repositories"
              title="GitHub Repositories"
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] border border-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={info.linkedin || "https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b"}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] border border-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer ml-2"
              title="Return to Top"
            >
              <ArrowUp className="w-4 h-4" style={{ color: config.hex }} />
            </button>
          </div>
        </div>

        {/* Sub-footer: Accent Switcher & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Dynamic Theme:</span>
            <AccentSwitcher compact />
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {info.name}. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
