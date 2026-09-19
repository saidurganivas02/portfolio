import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Calendar, MessageSquare, Terminal, Copy, Check, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { config } = useTheme();
  const { profile, addMessage } = usePortfolio();
  const info = profile || personalInfo;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Engineering Role',
    message: ''
  });
  const [lastSubmittedData, setLastSubmittedData] = useState<typeof formData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(info.email || 'saidurganivas02@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    // Log message into portfolio inbox
    addMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      projectType: formData.projectType,
      message: formData.message.trim(),
    });

    setLastSubmittedData({ ...formData });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Engineering Role',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-white/10 text-xs font-mono mb-3"
            style={{ color: config.hex }}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>contact.initiate // communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Let's Connect & Collaborate
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Whether you have a full-time software engineering opening, full-stack project, or technical opportunity, I am excited to discuss how I can contribute.
          </p>
        </div>

        {/* 2-Column Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Reach & Availability (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Details Glass Card */}
            <div className="p-8 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none"
                style={{ backgroundColor: config.hex }}
              />

              <h3 className="text-xl font-bold text-white mb-2">
                Direct Contact Channels
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Feel free to call, email, or send an inquiry below. I am actively reviewing roles.
              </p>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="p-4 rounded-2xl bg-[#171717] border border-white/5 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#222222] border border-white/10 flex items-center justify-center shrink-0" style={{ color: config.hex }}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-zinc-500">Email Address</div>
                      <a
                        href={`mailto:${info.email}`}
                        className="text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-colors truncate block"
                      >
                        {info.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-4 rounded-2xl bg-[#171717] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#222222] border border-white/10 flex items-center justify-center shrink-0" style={{ color: config.hex }}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-zinc-500">Phone / WhatsApp</div>
                      <a
                        href={`tel:${info.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-colors truncate block"
                      >
                        {info.phone}
                      </a>
                    </div>
                  </div>
                  <a
                    href={`tel:${info.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
                    style={{ backgroundColor: config.hex }}
                  >
                    Call Now
                  </a>
                </div>

                {/* LinkedIn Item */}
                <div className="p-4 rounded-2xl bg-[#171717] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#222222] border border-white/10 flex items-center justify-center shrink-0" style={{ color: config.hex }}>
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-zinc-500">LinkedIn Profile</div>
                      <a
                        href={info.linkedin || "https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b"}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-colors truncate block"
                      >
                        sai-durga-nivas-kommireddi-61bb0233b
                      </a>
                    </div>
                  </div>
                  <a
                    href={info.linkedin || "https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
                    style={{ backgroundColor: config.hex }}
                  >
                    Connect
                  </a>
                </div>

                {/* Location Item */}
                <div className="p-4 rounded-2xl bg-[#171717] border border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#222222] border border-white/10 flex items-center justify-center shrink-0" style={{ color: config.hex }}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500">Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-200">
                      {info.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">Response SLA:</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Within 12 Hours
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Message Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 p-8 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Send an Instant Transmission
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Drop a message regarding full-time roles, freelance projects, or technical collaboration.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-[#181818] border border-emerald-500/30 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Message Transmitted & Logged!
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Your transmission was safely logged to Nivas's Admin Inquiries Inbox. You can also connect directly right now:
                  </p>
                </div>

                {/* Direct High-Speed Action Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/916300697301?text=${encodeURIComponent(
                      `Hi Sai Durga Nivas, I saw your portfolio. My name is ${lastSubmittedData?.name || 'Recruiter'} (${lastSubmittedData?.email || ''}). Regarding: ${lastSubmittedData?.message || 'discussing an opportunity'}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-mono font-bold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                  >
                    <span>Transmit via WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${info.email}?subject=${encodeURIComponent(
                      `[Portfolio Inquiry] ${lastSubmittedData?.projectType || 'Engineering Opportunity'}`
                    )}&body=${encodeURIComponent(
                      `Hi Nivas,\n\nName: ${lastSubmittedData?.name}\nEmail: ${lastSubmittedData?.email}\nType: ${lastSubmittedData?.projectType}\n\nMessage:\n${lastSubmittedData?.message}\n`
                    )}`}
                    className="px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2a2a2a] text-white border border-white/10 font-mono text-xs flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" style={{ color: config.hex }} />
                    <span>Open in Email App</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-mono text-xs transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-type" className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Engagement Subject
                  </label>
                  <select
                    id="contact-type"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
                  >
                    <option value="Full-Stack Engineering Role">Full-Stack Software Engineering Role</option>
                    <option value="MERN Stack Developer Opening">MERN Stack Developer Opening</option>
                    <option value="Python / Django Development">Python / Django Development</option>
                    <option value="Freelance Web Application">Freelance Web Application</option>
                    <option value="Technical Collaboration">Technical Collaboration / Discussion</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Message Overview *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Provide details regarding the position or project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  id="contact-submit-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg active:scale-98 transition-all disabled:opacity-70 cursor-pointer"
                  style={{
                    backgroundColor: config.hex,
                    boxShadow: `0 4px 20px ${config.glowRgba}`,
                  }}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
