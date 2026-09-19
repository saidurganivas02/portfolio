import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { config } = useTheme();
  const { experiences, isAuthenticated, openAdminModal } = usePortfolio();

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-white/10 text-xs font-mono mb-3"
            style={{ color: config.hex }}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>experience.log // internships</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
          >
            Industry Experience & Agile Sprint Delivery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed"
          >
            Practical engineering experience contributing to production web applications, full-stack architectures, and cross-functional teams.
          </motion.p>

          {isAuthenticated && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => openAdminModal('experience')}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white shadow-md flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
                style={{
                  backgroundColor: config.hex,
                  boxShadow: `0 4px 15px ${config.glowRgba}`,
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience Entry</span>
              </button>
            </div>
          )}
        </div>

        {/* Bento Timeline Grid */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-xl relative overflow-hidden group"
            >
              {/* Subtle dynamic glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: config.hex }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-white/5 border border-white/10" style={{ color: config.hex }}>
                      <Briefcase className="w-4 h-4" />
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                  </div>
                  <div className="text-sm font-semibold mt-1 text-zinc-300 flex items-center gap-2">
                    <span style={{ color: config.hex }}>{item.company}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-400 font-mono text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.companyLocation}
                    </span>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1.5 w-fit">
                  <Calendar className="w-3.5 h-3.5" style={{ color: config.hex }} />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {item.summary}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2.5 mb-6">
                {item.achievements.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: config.hex }} />
                    <span className="leading-snug text-zinc-300">{h}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Tag Chips */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {item.skills.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#181818] text-zinc-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
