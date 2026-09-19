import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, User, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = usePortfolio();
  const { config } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = login(username, password);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setUsername('');
        setPassword('');
      }, 500);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#121212] border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
        >
          {/* Ambient Top Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[90px] opacity-25 pointer-events-none"
            style={{ backgroundColor: config.hex }}
          />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner"
              style={{ color: config.hex }}
            >
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Portfolio Admin</h3>
              <p className="text-xs font-mono text-zinc-400">Authenticate to edit sections & photo</p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300 font-mono"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Success Banner */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 font-mono"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Authenticated! Loading manager...</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 text-sm font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 text-sm font-mono pr-11 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl font-bold text-sm text-white shadow-lg active:scale-98 transition-all cursor-pointer mt-4 flex items-center justify-center gap-2"
              style={{
                backgroundColor: config.hex,
                boxShadow: `0 8px 25px ${config.glowRgba}`,
              }}
            >
              <Lock className="w-4 h-4" />
              <span>Log In</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
