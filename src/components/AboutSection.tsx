import React from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  ShieldCheck,
  Zap,
  Terminal,
  Code2,
  CheckCircle,
  Database,
  Edit3
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { workingPrinciples } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const { config } = useTheme();
  const { profile, isAuthenticated, openAdminModal } = usePortfolio();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-white/10 text-xs font-mono mb-3"
            style={{ color: config.hex }}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>developer.profile // story</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
          >
            Full-Stack Craftsmanship & Engineering Rigor
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed"
          >
            Bridging intuitive, high-performance interfaces with robust server architectures and durable data stores.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Main Story (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 p-8 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 relative overflow-hidden group shadow-xl"
          >
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: config.hex }}
            />

            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10" style={{ color: config.hex }}>
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  Background & Approach
                </span>
              </div>

              {isAuthenticated && (
                <button
                  onClick={() => openAdminModal('profile')}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  style={{
                    backgroundColor: config.hex,
                    boxShadow: `0 4px 15px ${config.glowRgba}`,
                  }}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
              Specialized in modern MERN stack solutions and Python engineering with an eye for clean UI ergonomics.
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 whitespace-pre-line">
              {profile.bio || profile.heroBio || (Array.isArray(profile.bioMatter) ? profile.bioMatter.join('\n\n') : 'Full-stack software developer specialized in MERN stack architectures and Python backend integrations.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-[#171717] border border-white/5">
                <div className="text-xs font-mono text-zinc-400">Architecture</div>
                <div className="text-sm font-bold text-white mt-1">Modular & RESTful</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#171717] border border-white/5">
                <div className="text-xs font-mono text-zinc-400">Database Models</div>
                <div className="text-sm font-bold text-white mt-1">Mongo & Relational SQL</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#171717] border border-white/5">
                <div className="text-xs font-mono text-zinc-400">Workflow</div>
                <div className="text-sm font-bold text-white mt-1">Agile Sprint Delivery</div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Interactive Terminal Snippet (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 p-6 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500">engineer-manifest.json</span>
              </div>

              <div className="text-xs font-mono space-y-2 text-zinc-300">
                <div>
                  <span className="text-zinc-500">"candidate":</span>{' '}
                  <span className="text-emerald-400">"Sai Durga Nivas"</span>,
                </div>
                <div>
                  <span className="text-zinc-500">"degree":</span>{' '}
                  <span className="text-cyan-400">"MCA (AKNU)"</span>,
                </div>
                <div>
                  <span className="text-zinc-500">"cgpa":</span>{' '}
                  <span className="text-amber-400">8.1</span>,
                </div>
                <div>
                  <span className="text-zinc-500">"focus":</span> [
                  <span style={{ color: config.hex }}>"React"</span>,{' '}
                  <span style={{ color: config.hex }}>"Node"</span>,{' '}
                  <span style={{ color: config.hex }}>"Express"</span>,{' '}
                  <span style={{ color: config.hex }}>"MongoDB"</span>],
                </div>
                <div>
                  <span className="text-zinc-500">"location":</span>{' '}
                  <span className="text-purple-400">"Andhra Pradesh, IN"</span>,
                </div>
                <div>
                  <span className="text-zinc-500">"immediateJoiner":</span>{' '}
                  <span className="text-emerald-400">true</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">Status</span>
              <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Ready to Deploy
              </span>
            </div>
          </motion.div>

          {/* Bento Card 3: 4 Core Working Principles (12 cols) */}
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workingPrinciples.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx }}
                whileHover={{ y: -4, borderColor: config.hex }}
                className="p-6 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl hover:bg-[#181818] transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-2xl bg-[#1c1c1c] border border-white/10 flex items-center justify-center mb-4 transition-colors"
                    style={{ color: config.hex }}
                  >
                    {idx === 0 && <Layers className="w-5 h-5" />}
                    {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 2 && <Zap className="w-5 h-5" />}
                    {idx === 3 && <Database className="w-5 h-5" />}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono" style={{ color: config.hex }}>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
