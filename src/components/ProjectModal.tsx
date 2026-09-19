import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle, Layers, Terminal } from 'lucide-react';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { config } = useTheme();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop in dark obsidian with backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
          className="relative w-full max-w-3xl bg-[#121212] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/15 overflow-hidden z-10 my-8 text-left"
        >
          {/* Header Image with close button */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1a1a1a]">
            <img
              src={project.image}
              alt={project.title}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23181818"/><text x="50%" y="50%" font-family="monospace" font-size="22" fill="%23666666" dominant-baseline="middle" text-anchor="middle">Software Architecture Project</text></svg>';
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1c1c]/90 hover:bg-[#282828] text-zinc-300 hover:text-white transition-colors border border-white/10 shadow-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge & Title in Header */}
            <div className="absolute bottom-5 left-6 right-6">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white mb-2 shadow-md"
                style={{ backgroundColor: config.hex }}
              >
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-sm">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 mt-1 font-medium">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Metrics Row (Bento Glass Chips) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#181818] border border-white/10 rounded-2xl p-3.5 text-center"
                >
                  <div className="text-xs font-mono font-bold text-white">{m}</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5 uppercase tracking-wider">Performance Metric</div>
                </div>
              ))}
            </div>

            {/* Case Study Details */}
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4" style={{ color: config.hex }} />
                <span>Architecture & Implementation Overview</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack Chips (JetBrains Mono) */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" style={{ color: config.hex }} />
                <span>Technologies & Frameworks</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-[#1c1c1c] text-zinc-200 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 sm:px-8 py-4 bg-[#0e0e0e] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-zinc-500">
              Verified Production Architecture
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-200 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
                  style={{
                    backgroundColor: config.hex,
                    boxShadow: `0 4px 15px ${config.glowRgba}`,
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Application</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
