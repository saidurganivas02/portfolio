import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, Terminal, BookOpen, Eye, Plus } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationSection: React.FC = () => {
  const { config } = useTheme();
  const { certifications, setViewingCertificate, isAuthenticated, openAdminModal } = usePortfolio();

  return (
    <section id="education" className="py-24 relative overflow-hidden">
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
            <span>academics.history // qualifications</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
          >
            Academic Foundation & Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed"
          >
            Postgraduate specialization in computer applications accompanied by verified credentials in Python, C, SQL, and Generative AI.
          </motion.p>
        </div>

        {/* 2-Column Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Academic Degrees (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-2">
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: config.hex }}>
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Academic Degrees
              </h3>
            </div>

            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all shadow-lg relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#181818] border border-white/10 text-xs font-mono font-bold" style={{ color: config.hex }}>
                        {edu.cgpa}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  {edu.details && (
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: config.hex }}>
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Verified Credentials
                </h3>
              </div>

              {isAuthenticated && (
                <button
                  onClick={() => openAdminModal('certificates')}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  style={{
                    backgroundColor: config.hex,
                    boxShadow: `0 4px 15px ${config.glowRgba}`,
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Cert</span>
                </button>
              )}
            </div>

            <div className="space-y-3.5">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all shadow-lg flex items-start gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0 mt-0.5"
                    style={{ color: config.hex }}
                  >
                    <Award className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate group-hover:text-white">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="text-xs font-mono font-medium mt-0.5" style={{ color: config.hex }}>
                      {cert.issuer}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5 text-[11px] font-mono">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>

                      {/* View Certificate Button (Opens Certificate photo modal) */}
                      <button
                        onClick={() => setViewingCertificate(cert)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <Eye className="w-3 h-3" style={{ color: config.hex }} />
                        <span>View Certificate</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
