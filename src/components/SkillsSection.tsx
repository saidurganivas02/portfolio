import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Code2, Server, Database, Wrench } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { getSkillIcon } from './TechIcons';
import { useTheme } from '../context/ThemeContext';

export const SkillsSection: React.FC = () => {
  const { config } = useTheme();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
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
            <span>skills.matrix // competencies</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
          >
            Core Tech Stack & Engineering Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed"
          >
            Hands-on expertise across modern full-stack web technologies, clean REST APIs, relational and document databases, and development workflows.
          </motion.p>
        </div>

        {/* 4 Category Bento Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 hover:border-white/20 transition-all duration-300 shadow-xl"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-white/10">
                <div
                  className="w-11 h-11 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0"
                  style={{ color: config.hex }}
                >
                  {catIdx === 0 && <Code2 className="w-5 h-5" />}
                  {catIdx === 1 && <Server className="w-5 h-5" />}
                  {catIdx === 2 && <Database className="w-5 h-5" />}
                  {catIdx === 3 && <Wrench className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Authentic Skills Grid with Original Symbols (No Percentages) */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.04 * skillIdx, duration: 0.3 }}
                    className="p-3.5 rounded-2xl bg-[#171717] border border-white/5 hover:border-white/15 hover:bg-[#1f1f1f] transition-all flex items-center gap-3.5 group cursor-default"
                  >
                    {/* Original Technology Symbol */}
                    <div className="w-10 h-10 rounded-xl bg-[#222222] border border-white/10 shadow-sm flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform">
                      {getSkillIcon(skill.iconName, skill.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors truncate">
                        {skill.name}
                      </div>
                      {skill.tag && (
                        <div className="text-[10px] font-mono font-medium text-zinc-500 truncate mt-0.5">
                          {skill.tag}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Live Workstation Status Banner in Dark Obsidian Glass */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#0f0f0f] border border-white/10 backdrop-blur-xl p-6 shadow-2xl font-mono text-xs overflow-hidden"
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-zinc-400 ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" style={{ color: config.hex }} />
                saidurganivas@workstation:~$ stack-manifest --active
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">STATUS: PRODUCTION READY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#141414] rounded-2xl p-3.5 border border-white/5">
              <div className="font-bold mb-1" style={{ color: config.hex }}>FRONTEND</div>
              <div className="text-zinc-300">React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Axios</div>
            </div>
            <div className="bg-[#141414] rounded-2xl p-3.5 border border-white/5">
              <div className="font-bold mb-1" style={{ color: config.hex }}>BACKEND & APIS</div>
              <div className="text-zinc-300">Node.js, Express.js, Django, Python, REST APIs, Postman</div>
            </div>
            <div className="bg-[#141414] rounded-2xl p-3.5 border border-white/5">
              <div className="font-bold mb-1" style={{ color: config.hex }}>DATABASES</div>
              <div className="text-zinc-300">MongoDB (MERN), MySQL, SQL Queries, Schema Design</div>
            </div>
            <div className="bg-[#141414] rounded-2xl p-3.5 border border-white/5">
              <div className="font-bold mb-1" style={{ color: config.hex }}>TOOLING</div>
              <div className="text-zinc-300">Git, GitHub, Agile Sprint Delivery, C, Generative AI</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
