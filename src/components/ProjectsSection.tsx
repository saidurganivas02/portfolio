import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  Eye,
  Sparkles,
  ArrowRight,
  Layers,
  Terminal,
  Plus,
  Camera,
  Edit2,
  Check,
} from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectsSection: React.FC = () => {
  const { config } = useTheme();
  const { projects, isAuthenticated, openAdminModal, updateProject } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [photoUpdatedNoticeId, setPhotoUpdatedNoticeId] = useState<string | null>(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend & API', 'Databases'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const handleCardPhotoUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateProject(projectId, { image: result });
          setPhotoUpdatedNoticeId(projectId);
          setTimeout(() => setPhotoUpdatedNoticeId(null), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Filterable Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-white/10 text-xs font-mono mb-3"
              style={{ color: config.hex }}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>projects.repository // featured</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Featured Applications & Implementations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-zinc-400 mt-2 max-w-xl"
            >
              Production-focused web applications built with the MERN stack, Python, and clean RESTful design patterns.
            </motion.p>
          </div>

          {/* Filterable Category Pills & Admin Add Action */}
          <div className="flex flex-wrap items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => openAdminModal('projects')}
                className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-white shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                style={{
                  backgroundColor: config.hex,
                  boxShadow: `0 4px 15px ${config.glowRgba}`,
                }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            )}

            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-md">
              {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  id={`filter-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-category-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        backgroundColor: config.hex,
                        boxShadow: `0 4px 15px ${config.glowRgba}`,
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-mono font-semibold">{cat}</span>
                </button>
              );
            })}
            </div>
          </div>
        </div>

        {/* Projects Grid (Glassmorphic Bento Cards) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl overflow-hidden hover:border-white/25 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-xl"
                style={{
                  boxShadow: `0 10px 30px rgba(0,0,0,0.5)`
                }}
              >
                {/* Visual Preview / Header */}
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-[#181818]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23181818"/><text x="50%" y="50%" font-family="monospace" font-size="22" fill="%23666666" dominant-baseline="middle" text-anchor="middle">Software Architecture Project</text></svg>';
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />

                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#0a0a0a]/90 text-white border border-white/15 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Authenticated Admin Quick Controls: Upload Photo & Edit */}
                    {isAuthenticated && (
                      <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 bg-[#0a0a0a]/90 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-xl">
                        <label
                          htmlFor={`card-photo-input-${project.id}`}
                          className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-mono font-medium text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                          title="Upload / Change Photo for this Project"
                        >
                          <Camera className="w-3.5 h-3.5" style={{ color: config.hex }} />
                          <span>Upload Photo</span>
                        </label>
                        <input
                          id={`card-photo-input-${project.id}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCardPhotoUpload(project.id, e)}
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => openAdminModal('projects', project.id)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Project Details in Admin Panel"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Success notification banner on card after photo uploaded */}
                    {photoUpdatedNoticeId === project.id && (
                      <div className="absolute inset-x-3 top-3.5 z-30 py-2 px-3 rounded-xl bg-emerald-600 text-white backdrop-blur-md text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-2xl">
                        <Check className="w-4 h-4" />
                        <span>Project photo updated successfully!</span>
                      </div>
                    )}

                    {/* Interactive Case Study Trigger Button on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xl flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                        style={{
                          backgroundColor: config.hex,
                          boxShadow: `0 4px 20px ${config.glowRgba}`,
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Full Case Study</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips in JetBrains Mono */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-[#1a1a1a] text-zinc-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Metrics Pill in JetBrains Mono */}
                    <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-[#171717] border border-white/5 text-[11px] font-mono text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.hex }} />
                      <span className="truncate">{project.metrics[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-6 py-4 border-t border-white/5 bg-[#141414]/50 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer group-hover:underline"
                    style={{ color: config.hex }}
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View Source Code on GitHub"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Visit Live Project"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Window for Case Studies */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
