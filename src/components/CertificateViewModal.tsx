import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, CheckCircle2, Upload, ExternalLink, Calendar, Building2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';

export const CertificateViewModal: React.FC = () => {
  const { viewingCertificate, setViewingCertificate, isAuthenticated, openAdminModal } = usePortfolio();
  const { config } = useTheme();

  if (!viewingCertificate) return null;

  const handleUploadClick = () => {
    setViewingCertificate(null);
    openAdminModal('certificates');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setViewingCertificate(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#121212] border border-white/15 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
        >
          {/* Top Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
            style={{ backgroundColor: config.hex }}
          />

          {/* Close Button */}
          <button
            onClick={() => setViewingCertificate(null)}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0 shadow-inner"
              style={{ color: config.hex }}
            >
              <Award className="w-6 h-6" />
            </div>

            <div className="min-w-0 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 mb-1.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Industry Credential</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {viewingCertificate.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5" style={{ color: config.hex }}>
                  <Building2 className="w-3.5 h-3.5" />
                  {viewingCertificate.issuer}
                </span>
                {viewingCertificate.issueDate && (
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <Calendar className="w-3.5 h-3.5" />
                    Issued: {viewingCertificate.issueDate}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body / Image View */}
          <div className="p-6 sm:p-8 bg-[#0a0a0a]/50">
            {viewingCertificate.imageUrl ? (
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl flex items-center justify-center max-h-[60vh]">
                <img
                  src={viewingCertificate.imageUrl}
                  alt={viewingCertificate.title}
                  className="w-full h-auto max-h-[55vh] object-contain"
                />
              </div>
            ) : (
              <div className="p-8 sm:p-12 rounded-2xl border-2 border-dashed border-white/10 bg-[#141414]/80 text-center flex flex-col items-center justify-center">
                <div
                  className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4"
                  style={{ color: config.hex }}
                >
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Official Verification Record
                </h4>
                <p className="text-xs text-zinc-400 max-w-md leading-relaxed mb-6">
                  This credential for <strong className="text-zinc-200">{viewingCertificate.title}</strong> was earned from <strong className="text-zinc-200">{viewingCertificate.issuer}</strong>.
                </p>

                {isAuthenticated ? (
                  <button
                    onClick={handleUploadClick}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg cursor-pointer transition-all"
                    style={{
                      backgroundColor: config.hex,
                      boxShadow: `0 4px 15px ${config.glowRgba}`,
                    }}
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Certificate Photo</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                    <span>Log in as Nivas to upload certificate photo scan</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-[#121212] flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">
              Credential ID: <span className="text-zinc-300">{viewingCertificate.id}</span>
            </span>
            <button
              onClick={() => setViewingCertificate(null)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
