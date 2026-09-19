import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Terminal,
  Camera,
  Github,
  Linkedin,
  Edit3,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroSectionProps {
  onOpenContact: () => void;
}

const getHeadlineFontSizeClass = (size?: string) => {
  switch (size) {
    case 'small':
      return 'text-2xl sm:text-3xl lg:text-4xl';
    case 'medium':
      return 'text-3xl sm:text-4xl lg:text-5xl';
    case 'large':
      return 'text-3.5xl sm:text-4.5xl lg:text-5.5xl';
    case 'xlarge':
      return 'text-4xl sm:text-5xl lg:text-6xl';
    default:
      return 'text-3xl sm:text-4xl lg:text-5xl';
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const { config } = useTheme();
  const { heroPhoto, profile, isAuthenticated, openAdminModal } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email || 'saidurganivas02@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: Typography, Bio, Live Availability, Tech Tag, CTAs, Stats      */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Live Availability Status Pill & Location */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171717] border border-white/10 backdrop-blur-md w-fit shadow-xs transition-all">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>

                <div className="text-xs font-mono font-medium text-zinc-300 flex items-center gap-1.5">
                  <span>Live Status:</span>
                  <span className="text-emerald-400 font-semibold">
                    {profile.availability || "Available for Full-Time Roles"}
                  </span>
                </div>

                <span className="text-zinc-600">|</span>

                <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>
                    {profile.location || "East Godavari, Andhra Pradesh, India"}
                  </span>
                </div>
              </div>

              {isAuthenticated && (
                <button
                  onClick={() => openAdminModal('profile')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-white shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all hover:scale-105"
                  style={{
                    backgroundColor: config.hex,
                    boxShadow: `0 4px 15px ${config.glowRgba}`,
                  }}
                  title="Edit Hero Headline, Status & Bio in Admin Portal"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Hero Section</span>
                </button>
              )}
            </div>

            {/* Display Typography */}
            <h1 className={`${getHeadlineFontSizeClass((profile as any).heroHeadlineFontSize)} font-extrabold tracking-tight text-white leading-[1.15] mb-6 transition-all duration-300`}>
              {(() => {
                const headline = profile.heroHeadline || "Engineering sleek, resilient full-stack web apps with modern craft.";
                const highlight = profile.heroHeadlineHighlight || "full-stack web apps";
                if (highlight && headline.includes(highlight)) {
                  const parts = headline.split(highlight);
                  return (
                    <>
                      {parts[0]}
                      <span
                        className="bg-clip-text text-transparent transition-all duration-500"
                        style={{
                          backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${config.hex} 50%, #ffffff 100%)`,
                        }}
                      >
                        {highlight}
                      </span>
                      {parts.slice(1).join(highlight)}
                    </>
                  );
                }
                return headline;
              })()}
            </h1>

            {/* Sub-headline & Bio */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-6">
              {profile.heroBio ? (
                profile.heroBio
              ) : (
                <>
                  I am <strong className="text-white font-semibold">{profile.name}</strong>, a {profile.role} with production internship experience across MERN stack architectures, Python workflows, and RESTful API integrations.
                </>
              )}
            </p>

            {/* Terminal Code Pill (Presentation for Visitors, Configured via Admin Portal) */}
            <div className="p-3.5 rounded-2xl bg-[#121212]/90 border border-white/10 backdrop-blur-md mb-14 sm:mb-16 max-w-xl shadow-lg transition-all group/term">
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/5 text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" style={{ color: config.hex }} />
                  <span className="text-zinc-400 font-semibold">{profile.terminalFileName || 'sai-durga-nivas.config.ts'}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">TypeScript Config</span>
              </div>

              <div className="text-xs font-mono space-y-1 text-zinc-300">
                <div>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">coreStack</span> = [
                  {(() => {
                    const stack = Array.isArray(profile.terminalStack)
                      ? profile.terminalStack
                      : (typeof profile.terminalStack === 'string'
                          ? (profile.terminalStack as string).split(',').map((s: string) => s.trim()).filter(Boolean)
                          : ["React", "Node.js", "MongoDB", "Python", "MySQL"]);
                    return stack.map((tech, idx) => (
                      <React.Fragment key={idx}>
                        <span style={{ color: config.hex }}>"{tech}"</span>
                        {idx < stack.length - 1 && ', '}
                      </React.Fragment>
                    ));
                  })()}
                  ];
                </div>
                <div className="text-zinc-500">
                  <span className="text-emerald-400">
                    {profile.terminalComment?.startsWith('//')
                      ? profile.terminalComment
                      : `// ${profile.terminalComment || 'Ready to build robust, scalable applications'}`}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs & Direct Contact */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg active:scale-98 transition-all cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.hex}, ${config.hex}cc)`,
                  boxShadow: `0 8px 25px ${config.glowRgba}`,
                }}
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-zinc-200 bg-[#171717] hover:bg-[#202020] border border-white/10 hover:border-white/20 active:scale-98 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" style={{ color: config.hex }} />
                <span>Contact Directly</span>
              </button>

              {/* Direct Call Button */}
              <a
                href={`tel:${(profile.phone || '+91-6300697301').replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-mono text-zinc-300 bg-[#171717] hover:bg-[#202020] border border-white/10 hover:border-white/20 transition-all"
                title={`Call ${profile.phone || '+91-6300697301'}`}
              >
                <Phone className="w-4 h-4" style={{ color: config.hex }} />
                <span>{profile.phone || '+91-6300697301'}</span>
              </a>

              {/* GitHub Repositories Link */}
              <a
                href={profile.github || "https://github.com/saidurganivas02?tab=repositories"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-mono text-zinc-300 bg-[#171717] hover:bg-[#202020] border border-white/10 hover:border-white/20 hover:text-white transition-all"
                title="View GitHub Repositories"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repos</span>
              </a>

              {/* LinkedIn Profile Link */}
              <a
                href={profile.linkedin || "https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-mono text-zinc-300 bg-[#171717] hover:bg-[#202020] border border-white/10 hover:border-white/20 hover:text-white transition-all"
                title="View LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="p-3.5 rounded-xl bg-[#171717] hover:bg-[#202020] border border-white/10 text-zinc-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                <span className="hidden sm:inline">{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-[#121212]/60 border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-1">
                  <span>8.1</span>
                  <span className="text-xs font-sans font-semibold text-zinc-400">CGPA</span>
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-0.5">MCA Postgraduate</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212]/60 border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-1">
                  <span>2</span>
                  <span className="text-xs font-sans font-semibold text-zinc-400">Roles</span>
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-0.5">Production Internships</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212]/60 border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-1">
                  <span>4+</span>
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-0.5">Featured Projects</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212]/60 border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-1">
                  <span>4</span>
                  <span className="text-xs font-sans font-semibold text-zinc-400">Badges</span>
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-0.5">Industry Certifications</div>
              </div>
            </div>

          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: Centered Circular Portrait Photo (Kept Clean, No Buttons)     */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center items-center relative"
          >
            {/* Stage Container */}
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[440px] md:h-[440px] flex items-center justify-center">

              {/* Ambient Glow behind the photo circle */}
              <div
                className="absolute inset-6 rounded-full blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
                style={{ backgroundColor: config.hex }}
              />

              {/* Outer Orbital Ring 1 (Dashed subtle) */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_80s_linear_infinite]"
              />

              {/* Inner Orbital Ring 2 (Accent tinted) */}
              <div
                className="absolute inset-4 rounded-full border border-white/10 animate-[spin_50s_linear_infinite_reverse]"
                style={{ borderColor: `${config.hex}30` }}
              />

              {/* Circular Photo Container */}
              <div
                className="relative z-20 w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-full p-2 shadow-2xl transition-all duration-500 flex items-center justify-center group"
                style={{
                  background: `linear-gradient(135deg, ${config.hex}, #1a1a1a 50%, ${config.hex}80)`,
                  boxShadow: `0 0 60px ${config.glowRgba}`,
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0d0d0d] overflow-hidden relative flex items-center justify-center border-2 border-white/20 shadow-2xl">
                  {/* The photo attached in the circle, cleanly displayed with zero text or overlay */}
                  <img
                    src={heroPhoto}
                    alt={profile.name}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center scale-100 filter contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Subtle inner edge vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-full"
                    style={{
                      background: `radial-gradient(circle at center, transparent 70%, rgba(10, 10, 10, 0.4) 100%)`
                    }}
                  />
                </div>

                {/* If logged in as admin, subtle change-photo shortcut button badge */}
                {isAuthenticated && (
                  <button
                    onClick={() => openAdminModal('photo')}
                    className="absolute -bottom-2 right-4 px-3 py-1.5 rounded-full bg-[#121212]/90 border border-white/20 text-[11px] font-mono text-white shadow-xl hover:bg-black transition-all flex items-center gap-1.5 cursor-pointer z-30"
                    style={{ color: config.hex }}
                    title="Change Circular Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Photo</span>
                  </button>
                )}
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
