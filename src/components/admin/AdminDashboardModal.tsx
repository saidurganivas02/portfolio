import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  FolderGit2,
  Award,
  Briefcase,
  User,
  Camera,
  Plus,
  Trash2,
  Edit2,
  Check,
  UploadCloud,
  ExternalLink,
  Github,
  Calendar,
  LogOut,
  RotateCcw,
  Sparkles,
  Image as ImageIcon,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Type,
  Terminal,
  MessageSquare,
  Loader2,
  ShieldCheck,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { Project, Certification, Experience } from '../../types';
import { compressImage } from '../../utils/imageCompressor';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminModalOpen,
    closeAdminModal,
    logout,
    activeAdminTab,
    setActiveAdminTab,
    adminEditTargetId,
    setAdminEditTargetId,
    projects,
    addProject,
    updateProject,
    deleteProject,
    certifications,
    addCertification,
    updateCertification,
    deleteCertification,
    setViewingCertificate,
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    profile,
    updateProfile,
    heroPhoto,
    updateHeroPhoto,
    resetHeroPhoto,
    messages,
    deleteMessage,
    clearAllMessages,
    adminUsername,
    updateCredentials,
    resetCredentials,
  } = usePortfolio();

  const { config } = useTheme();

  // -------------------------------------------------------------
  // Section 1: Project State Form
  // 1) title, 2) description, 3) skills, 4) photo upload, 5) github link, 6) live demo link
  // -------------------------------------------------------------
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectSkills, setProjectSkills] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectLiveDemo, setProjectLiveDemo] = useState('');
  const [projectCategory, setProjectCategory] = useState<'Full-Stack' | 'Frontend' | 'Backend & API' | 'Databases'>('Full-Stack');
  const [projectImage, setProjectImage] = useState<string>('');
  const [projectSavedNotice, setProjectSavedNotice] = useState(false);
  const projectFileInputRef = useRef<HTMLInputElement>(null);

  // Auto-load project if triggered via direct "Edit" or "Change Photo" from Projects section
  useEffect(() => {
    if (adminEditTargetId && activeAdminTab === 'projects') {
      const targetProj = projects.find((p) => p.id === adminEditTargetId);
      if (targetProj) {
        handleEditProjectClick(targetProj);
      }
    }
  }, [adminEditTargetId, activeAdminTab, projects]);

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjectTitle('');
    setProjectDescription('');
    setProjectSkills('');
    setProjectGithub('');
    setProjectLiveDemo('');
    setProjectCategory('Full-Stack');
    setProjectImage('');
    if (projectFileInputRef.current) projectFileInputRef.current.value = '';
    setAdminEditTargetId(null);
  };

  const handleEditProjectClick = (p: Project) => {
    setEditingProjectId(p.id);
    setProjectTitle(p.title);
    setProjectDescription(p.description);
    setProjectSkills(p.technologies.join(', '));
    setProjectGithub(p.githubUrl || '');
    setProjectLiveDemo(p.liveUrl || '');
    setProjectCategory(p.category || 'Full-Stack');
    setProjectImage(p.image || '');
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const compressed = await compressImage(file, 960, 640, 0.84);
        setProjectImage(compressed);
      } catch (err) {
        console.error('Failed to compress project image:', err);
      }
    }
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDescription.trim()) return;

    const skillsArray = projectSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const projectPayload = {
      title: projectTitle.trim(),
      tagline: `${projectCategory} Application built with ${skillsArray.slice(0, 3).join(', ')}`,
      category: projectCategory,
      description: projectDescription.trim(),
      longDescription: projectDescription.trim(),
      image: projectImage.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      technologies: skillsArray.length > 0 ? skillsArray : ['React.js', 'Node.js'],
      metrics: ['Modular Design', 'Verified Endpoints', 'Responsive UI'],
      githubUrl: projectGithub.trim() || undefined,
      liveUrl: projectLiveDemo.trim() || undefined,
      featured: true,
    };

    if (editingProjectId) {
      updateProject(editingProjectId, projectPayload);
    } else {
      addProject(projectPayload);
    }

    resetProjectForm();
    setProjectSavedNotice(true);
    setTimeout(() => setProjectSavedNotice(false), 2200);
  };

  // -------------------------------------------------------------
  // Section 2: Certificate State Form
  // 1) title name, 2) photo upload when clicking view, 3) issuer
  // -------------------------------------------------------------
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certImage, setCertImage] = useState<string | null>(null);
  const [certSavedNotice, setCertSavedNotice] = useState(false);
  const certFileInputRef = useRef<HTMLInputElement>(null);

  const resetCertForm = () => {
    setEditingCertId(null);
    setCertTitle('');
    setCertIssuer('');
    setCertImage(null);
    if (certFileInputRef.current) certFileInputRef.current.value = '';
  };

  const handleEditCertClick = (c: Certification) => {
    setEditingCertId(c.id);
    setCertTitle(c.title);
    setCertIssuer(c.issuer);
    setCertImage(c.imageUrl || null);
  };

  const handleCertImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) setCertImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim()) return;

    const certPayload = {
      title: certTitle.trim(),
      issuer: certIssuer.trim() || 'Verified Credential Issuer',
      imageUrl: certImage || undefined,
      issueDate: new Date().getFullYear().toString(),
      iconType: 'ai',
    };

    if (editingCertId) {
      updateCertification(editingCertId, certPayload);
    } else {
      addCertification(certPayload);
    }

    resetCertForm();
    setCertSavedNotice(true);
    setTimeout(() => setCertSavedNotice(false), 2200);
  };

  // -------------------------------------------------------------
  // Section 3: Experience State Form
  // 1) title, 2) role, 3) period from and to, 4) description
  // -------------------------------------------------------------
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expTitle, setExpTitle] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expPeriodFrom, setExpPeriodFrom] = useState('');
  const [expPeriodTo, setExpPeriodTo] = useState('');
  const [expDescription, setExpDescription] = useState('');
  const [expSavedNotice, setExpSavedNotice] = useState(false);

  const resetExpForm = () => {
    setEditingExpId(null);
    setExpTitle('');
    setExpRole('');
    setExpPeriodFrom('');
    setExpPeriodTo('');
    setExpDescription('');
  };

  const handleEditExpClick = (exp: Experience) => {
    setEditingExpId(exp.id);
    setExpTitle(exp.company);
    setExpRole(exp.role);
    const parts = exp.period.split('—').map((p) => p.trim());
    setExpPeriodFrom(parts[0] || '');
    setExpPeriodTo(parts[1] || 'Present');
    setExpDescription(exp.summary || exp.achievements.join('\n'));
  };

  const handleExpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || !expRole.trim()) return;

    const periodStr = `${expPeriodFrom.trim() || '2024'} — ${expPeriodTo.trim() || 'Present'}`;
    const achievementsList = expDescription
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const expPayload = {
      company: expTitle.trim(),
      role: expRole.trim(),
      period: periodStr,
      companyLocation: 'India',
      summary: expDescription.trim(),
      achievements: achievementsList.length > 0 ? achievementsList : [expDescription.trim()],
      skills: ['Full Stack', 'Web Architecture', 'Agile Delivery'],
    };

    if (editingExpId) {
      updateExperience(editingExpId, expPayload);
    } else {
      addExperience(expPayload);
    }

    resetExpForm();
    setExpSavedNotice(true);
    setTimeout(() => setExpSavedNotice(false), 2200);
  };

  // -------------------------------------------------------------
  // Section 4: Hero & Profile Configuration State Form
  // -------------------------------------------------------------
  const [profileName, setProfileName] = useState(profile.name);
  const [profileRole, setProfileRole] = useState(profile.role);
  const [profileEmail, setProfileEmail] = useState(profile.email || 'saidurganivas02@gmail.com');
  const [profilePhone, setProfilePhone] = useState(profile.phone || '+91-6300697301');
  const [heroAvailability, setHeroAvailability] = useState(profile.availability || 'Available for Full-Time Roles');
  const [heroLocation, setHeroLocation] = useState(profile.location || 'Andhra Pradesh, India');
  const [heroHeadline, setHeroHeadline] = useState(profile.heroHeadline || 'Engineering sleek, resilient full-stack web apps with modern craft.');
  const [heroHeadlineHighlight, setHeroHeadlineHighlight] = useState(profile.heroHeadlineHighlight || 'full-stack web apps');
  const [heroHeadlineFontSize, setHeroHeadlineFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>(
    (profile as any).heroHeadlineFontSize || 'medium'
  );
  const [heroBio, setHeroBio] = useState(profile.heroBio || 'I am Kommireddy Sai Durga Nivas, a Full Stack Developer with production internship experience across MERN stack architectures, Python workflows, and RESTful API integrations.');
  const [profileGithub, setProfileGithub] = useState(profile.github || 'https://github.com/saidurganivas02?tab=repositories');
  const [profileLinkedin, setProfileLinkedin] = useState(profile.linkedin || 'https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b');
  const [terminalFileName, setTerminalFileName] = useState(profile.terminalFileName || 'sai-durga-nivas.config.ts');
  const [terminalStack, setTerminalStack] = useState(
    Array.isArray(profile.terminalStack)
      ? profile.terminalStack.join(', ')
      : (profile.terminalStack || 'React, Node.js, MongoDB, Python, MySQL')
  );
  const [terminalComment, setTerminalComment] = useState(
    profile.terminalComment?.replace(/^\/\/\s*/, '') || 'Ready to build robust, scalable applications'
  );
  const [profileDescription, setProfileDescription] = useState(profile.bioMatter.join('\n\n'));
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  // Synchronize state whenever profile data updates or modal opens
  useEffect(() => {
    if (profile) {
      setProfileName(profile.name || '');
      setProfileRole(profile.role || '');
      setProfileEmail(profile.email || '');
      setProfilePhone(profile.phone || '');
      setHeroAvailability(profile.availability || 'Available for Full-Time Roles');
      setHeroLocation(profile.location || 'Andhra Pradesh, India');
      setHeroHeadline(profile.heroHeadline || 'Engineering sleek, resilient full-stack web apps with modern craft.');
      setHeroHeadlineHighlight(profile.heroHeadlineHighlight || 'full-stack web apps');
      setHeroHeadlineFontSize(((profile as any).heroHeadlineFontSize as any) || 'medium');
      setHeroBio(profile.heroBio || '');
      setTerminalFileName(profile.terminalFileName || 'sai-durga-nivas.config.ts');
      setTerminalStack(
        Array.isArray(profile.terminalStack)
          ? profile.terminalStack.join(', ')
          : (profile.terminalStack || 'React, Node.js, MongoDB, Python, MySQL')
      );
      setTerminalComment(
        profile.terminalComment?.replace(/^\/\/\s*/, '') || 'Ready to build robust, scalable applications'
      );
      setProfileGithub(profile.github || 'https://github.com/saidurganivas02?tab=repositories');
      setProfileLinkedin(profile.linkedin || 'https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b');
      setProfileDescription(profile.bioMatter ? profile.bioMatter.join('\n\n') : '');
    }
  }, [profile, isAdminModalOpen]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bioList = profileDescription
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const stackArray = terminalStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const cleanComment = terminalComment.trim().startsWith('//')
      ? terminalComment.trim()
      : `// ${terminalComment.trim()}`;

    updateProfile({
      name: profileName.trim(),
      role: profileRole.trim(),
      email: profileEmail.trim(),
      phone: profilePhone.trim(),
      availability: heroAvailability.trim(),
      location: heroLocation.trim(),
      heroHeadline: heroHeadline.trim(),
      heroHeadlineHighlight: heroHeadlineHighlight.trim(),
      heroHeadlineFontSize,
      heroBio: heroBio.trim(),
      terminalFileName: terminalFileName.trim() || 'sai-durga-nivas.config.ts',
      terminalStack: stackArray.length > 0 ? stackArray : ['React', 'Node.js', 'MongoDB', 'Python', 'MySQL'],
      terminalComment: cleanComment || '// Ready to build robust, scalable applications',
      github: profileGithub.trim(),
      linkedin: profileLinkedin.trim(),
      bioMatter: bioList.length > 0 ? bioList : [profileDescription.trim()],
    });

    setProfileSavedNotice(true);
    setTimeout(() => setProfileSavedNotice(false), 2400);
  };

  // -------------------------------------------------------------
  // Section 5: Photo Change Option State
  // -------------------------------------------------------------
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);
  const [photoSavedNotice, setPhotoSavedNotice] = useState(false);
  const heroPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleHeroPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        setIsCompressingPhoto(true);
        // Automatically optimize & compress to max 640x640 (~50KB)
        // This guarantees it fits safely in localStorage without hitting browser quota!
        const compressed = await compressImage(file, 640, 640, 0.86);
        setPhotoPreview(compressed);
      } catch (err) {
        console.error('Failed to compress avatar photo:', err);
      } finally {
        setIsCompressingPhoto(false);
      }
    }
  };

  const handleApplyHeroPhoto = () => {
    if (photoPreview) {
      updateHeroPhoto(photoPreview);
      setPhotoSavedNotice(true);
      setTimeout(() => setPhotoSavedNotice(false), 2600);
    }
  };

  const handleResetHeroPhoto = () => {
    resetHeroPhoto();
    setPhotoPreview(null);
    if (heroPhotoInputRef.current) heroPhotoInputRef.current.value = '';
    setPhotoSavedNotice(true);
    setTimeout(() => setPhotoSavedNotice(false), 2600);
  };

  // -------------------------------------------------------------
  // Security: Change Username & Password
  // -------------------------------------------------------------
  const [secCurrentPassword, setSecCurrentPassword] = useState('');
  const [secNewUsername, setSecNewUsername] = useState('');
  const [secNewPassword, setSecNewPassword] = useState('');
  const [secConfirmPassword, setSecConfirmPassword] = useState('');
  const [secShowCurrentPass, setSecShowCurrentPass] = useState(false);
  const [secShowNewPass, setSecShowNewPass] = useState(false);
  const [secResult, setSecResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecResult(null);
    if (secNewPassword !== secConfirmPassword) {
      setSecResult({ success: false, message: 'New passwords do not match. Please re-enter them.' });
      return;
    }
    const result = updateCredentials(secCurrentPassword, secNewUsername || adminUsername, secNewPassword);
    setSecResult(result);
    if (result.success) {
      setSecCurrentPassword('');
      setSecNewUsername('');
      setSecNewPassword('');
      setSecConfirmPassword('');
    }
  };

  const handleResetCredentials = () => {
    resetCredentials();
    setSecCurrentPassword('');
    setSecNewUsername('');
    setSecNewPassword('');
    setSecConfirmPassword('');
    setSecResult({ success: true, message: 'Credentials reset to default: username "nivas", password "nivas123".' });
  };

  if (!isAdminModalOpen) return null;

  const tabs = [
    { id: 'projects', label: '1. Projects', icon: FolderGit2 },
    { id: 'certificates', label: '2. Certificates', icon: Award },
    { id: 'experience', label: '3. Experience', icon: Briefcase },
    { id: 'profile', label: '4. Hero & Profile', icon: User },
    { id: 'photo', label: '5. Photo Option', icon: Camera },
    { id: 'messages', label: `6. Inquiries (${messages.length})`, icon: MessageSquare },
    { id: 'security', label: '7. Security', icon: ShieldCheck },
  ] as const;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAdminModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#121212] border border-white/15 rounded-3xl shadow-[0_25px_85px_rgba(0,0,0,0.9)] z-10 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Ambient Glow */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
            style={{ backgroundColor: config.hex }}
          />

          {/* Top Bar Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-[#141414]/90">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm"
                style={{ color: config.hex }}
              >
                NV
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Nivas Portfolio Manager
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                    Logged In
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-400">
                  Manage projects, certificates, experiences, bio & circular avatar photo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-xs font-mono text-zinc-300 hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              <button
                onClick={closeAdminModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Navigation Pill Bar */}
          <div className="px-5 sm:px-6 pt-3 pb-2 border-b border-white/10 bg-[#0d0d0d] overflow-x-auto flex items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAdminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white font-bold border border-white/20 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                  style={isActive ? { borderColor: `${config.hex}60`, color: '#ffffff' } : {}}
                >
                  <Icon className="w-3.5 h-3.5" style={isActive ? { color: config.hex } : {}} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Tab Content Body */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
            
            {/* ========================================================================= */}
            {/* TAB 1: PROJECTS SECTION                                                   */}
            {/* 1) title 2) description 3) skills 4) github link 5) live demo link       */}
            {/* ========================================================================= */}
            {activeAdminTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4" style={{ color: config.hex }} />
                      <span>{editingProjectId ? 'Edit Project' : 'Add New Project'}</span>
                    </h4>
                    <p className="text-xs font-mono text-zinc-400">
                      Specify title, description, skills/tags, GitHub URL, and live demo link
                    </p>
                  </div>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={resetProjectForm}
                      className="text-xs font-mono text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {projectSavedNotice && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Project successfully saved to portfolio!</span>
                  </div>
                )}

                <form onSubmit={handleProjectSubmit} className="space-y-4 bg-[#171717]/80 p-5 rounded-2xl border border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        1) Project Title *
                      </label>
                      <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. MERN Stack Agile Task Portal"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Category
                      </label>
                      <select
                        value={projectCategory}
                        onChange={(e) => setProjectCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      >
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend & API">Backend & API</option>
                        <option value="Databases">Databases</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      2) Description of the Project *
                    </label>
                    <textarea
                      rows={3}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Detailed explanation of what the project does, key features, and problem it solves..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      3) Skills of the Project (Comma-separated) *
                    </label>
                    <input
                      type="text"
                      value={projectSkills}
                      onChange={(e) => setProjectSkills(e.target.value)}
                      placeholder="e.g. React.js, Node.js, Express.js, MongoDB, REST APIs"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                    />
                  </div>

                  {/* 4) Upload Project Photo / Screenshot */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono text-zinc-300">
                        4) Upload Project Photo / Screenshot *
                      </label>
                      <span className="text-[11px] font-mono text-zinc-500">
                        PNG, JPG, WebP supported
                      </span>
                    </div>

                    <input
                      ref={projectFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProjectImageUpload}
                      className="hidden"
                      id="project-photo-input"
                    />

                    {projectImage ? (
                      <div className="p-3.5 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={projectImage}
                            alt="Project Preview"
                            className="w-20 h-14 rounded-lg object-cover border border-white/10 shrink-0 shadow-sm"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-semibold">
                              <Check className="w-3.5 h-3.5" />
                              Photo attached & ready
                            </span>
                            <span className="text-[11px] font-mono text-zinc-400 truncate block mt-0.5">
                              Will render on card & case study modal
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => projectFileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>Replace</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProjectImage('');
                              if (projectFileInputRef.current) projectFileInputRef.current.value = '';
                            }}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => projectFileInputRef.current?.click()}
                        className="p-5 rounded-xl bg-[#121212] border border-dashed border-white/20 hover:border-white/40 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition-all hover:bg-[#161616] group"
                      >
                        <div
                          className="w-10 h-10 rounded-full bg-white/5 group-hover:scale-110 transition-transform flex items-center justify-center"
                          style={{ color: config.hex }}
                        >
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-mono text-zinc-200 font-semibold group-hover:text-white">
                            Click to upload project photo or screenshot
                          </p>
                          <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                            Auto-optimizes for glassmorphic cards and high-res previews
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        5) GitHub Link of the Project (if there)
                      </label>
                      <input
                        type="url"
                        value={projectGithub}
                        onChange={(e) => setProjectGithub(e.target.value)}
                        placeholder="https://github.com/saidurganivas/project"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        6) Live Demo Link (if there)
                      </label>
                      <input
                        type="url"
                        value={projectLiveDemo}
                        onChange={(e) => setProjectLiveDemo(e.target.value)}
                        placeholder="https://myproject-demo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs text-white shadow-md active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: config.hex,
                      boxShadow: `0 4px 15px ${config.glowRgba}`,
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingProjectId ? 'Update Project' : 'Save & Publish Project'}</span>
                  </button>
                </form>

                {/* Existing Projects List */}
                <div className="space-y-3">
                  <h5 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Existing Projects ({projects.length})
                  </h5>
                  <div className="space-y-2">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-xl bg-[#171717] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-16 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 shrink-0">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white truncate">{p.title}</span>
                              <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-zinc-400">
                                {p.category}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{p.description}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {p.technologies.slice(0, 4).map((tech) => (
                                <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-zinc-300">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleEditProjectClick(p)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProject(p.id)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 text-xs font-mono flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: CERTIFICATE SECTION                                                */}
            {/* 1) title name 2) photo upload when clicking view button                   */}
            {/* ========================================================================= */}
            {activeAdminTab === 'certificates' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Award className="w-4 h-4" style={{ color: config.hex }} />
                      <span>{editingCertId ? 'Edit Certificate' : 'Add New Certificate'}</span>
                    </h4>
                    <p className="text-xs font-mono text-zinc-400">
                      Upload certificate photo/scan so visitors can see it when clicking "View Certificate"
                    </p>
                  </div>
                  {editingCertId && (
                    <button
                      type="button"
                      onClick={resetCertForm}
                      className="text-xs font-mono text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {certSavedNotice && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Certificate & photo scan successfully saved!</span>
                  </div>
                )}

                <form onSubmit={handleCertSubmit} className="space-y-4 bg-[#171717]/80 p-5 rounded-2xl border border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        1) Certificate Title Name *
                      </label>
                      <input
                        type="text"
                        value={certTitle}
                        onChange={(e) => setCertTitle(e.target.value)}
                        placeholder="e.g. Cisco Python Essentials"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Issuing Organization / Academy
                      </label>
                      <input
                        type="text"
                        value={certIssuer}
                        onChange={(e) => setCertIssuer(e.target.value)}
                        placeholder="e.g. Cisco Networking Academy / Oracle"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  {/* 2) Certificate Photo Upload */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      2) Certificate Photo / Image Upload (Shown when "View" button is clicked)
                    </label>
                    <input
                      ref={certFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCertImageUpload}
                      className="hidden"
                      id="cert-photo-input"
                    />

                    {certImage ? (
                      <div className="p-3 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={certImage}
                            alt="Preview"
                            className="w-16 h-12 rounded-lg object-cover border border-white/10"
                          />
                          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            Photo attached
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => certFileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300"
                          >
                            Change Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => setCertImage(null)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => certFileInputRef.current?.click()}
                        className="p-6 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 bg-[#121212] text-center cursor-pointer transition-colors"
                      >
                        <UploadCloud className="w-8 h-8 mx-auto mb-2 text-zinc-400" />
                        <span className="text-xs font-bold text-white block">Click to upload certificate photo/scan</span>
                        <span className="text-[11px] font-mono text-zinc-500">PNG, JPG, WebP images accepted</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs text-white shadow-md active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: config.hex,
                      boxShadow: `0 4px 15px ${config.glowRgba}`,
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingCertId ? 'Update Certificate' : 'Save Certificate'}</span>
                  </button>
                </form>

                {/* Existing Certificates List */}
                <div className="space-y-3">
                  <h5 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Existing Certificates ({certifications.length})
                  </h5>
                  <div className="space-y-2">
                    {certifications.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-xl bg-[#171717] border border-white/5 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {c.imageUrl ? (
                            <img
                              src={c.imageUrl}
                              alt={c.title}
                              className="w-12 h-9 rounded object-cover border border-white/10 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-9 rounded bg-[#121212] border border-white/10 flex items-center justify-center text-zinc-500 shrink-0">
                              <Award className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h6 className="text-sm font-bold text-white truncate">{c.title}</h6>
                            <span className="text-xs font-mono text-zinc-400">{c.issuer}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setViewingCertificate(c)}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <span>View</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditCertClick(c)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCertification(c.id)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: EXPERIENCE SECTION                                                 */}
            {/* 1) title 2) role 3) period from and to 4) description                     */}
            {/* ========================================================================= */}
            {activeAdminTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4" style={{ color: config.hex }} />
                      <span>{editingExpId ? 'Edit Experience' : 'Add New Experience'}</span>
                    </h4>
                    <p className="text-xs font-mono text-zinc-400">
                      Configure title/company, role, period (from & to), and key description
                    </p>
                  </div>
                  {editingExpId && (
                    <button
                      type="button"
                      onClick={resetExpForm}
                      className="text-xs font-mono text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {expSavedNotice && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Experience record updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleExpSubmit} className="space-y-4 bg-[#171717]/80 p-5 rounded-2xl border border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        1) Title (Company / Organization) *
                      </label>
                      <input
                        type="text"
                        value={expTitle}
                        onChange={(e) => setExpTitle(e.target.value)}
                        placeholder="e.g. ADHOC Networks / Google"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        2) Role *
                      </label>
                      <input
                        type="text"
                        value={expRole}
                        onChange={(e) => setExpRole(e.target.value)}
                        placeholder="e.g. MERN Stack Developer Intern"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        3) Period From *
                      </label>
                      <input
                        type="text"
                        value={expPeriodFrom}
                        onChange={(e) => setExpPeriodFrom(e.target.value)}
                        placeholder="e.g. May 2025"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        3) Period To *
                      </label>
                      <input
                        type="text"
                        value={expPeriodTo}
                        onChange={(e) => setExpPeriodTo(e.target.value)}
                        placeholder="e.g. July 2025 or Present"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      4) Description *
                    </label>
                    <textarea
                      rows={3}
                      value={expDescription}
                      onChange={(e) => setExpDescription(e.target.value)}
                      placeholder="Summary of responsibilities, technologies used, and accomplishments..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs text-white shadow-md active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: config.hex,
                      boxShadow: `0 4px 15px ${config.glowRgba}`,
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingExpId ? 'Update Experience' : 'Save Experience'}</span>
                  </button>
                </form>

                {/* Existing Experience List */}
                <div className="space-y-3">
                  <h5 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Existing Experiences ({experiences.length})
                  </h5>
                  <div className="space-y-2">
                    {experiences.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-[#171717] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{item.role}</span>
                            <span className="text-xs font-mono text-zinc-400">@ {item.company}</span>
                          </div>
                          <span className="text-xs font-mono" style={{ color: config.hex }}>
                            {item.period}
                          </span>
                          <p className="text-xs text-zinc-400 line-clamp-1 mt-1">{item.summary}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditExpClick(item)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteExperience(item.id)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: HERO SECTION & PROFILE EDITOR                                      */}
            {/* ========================================================================= */}
            {activeAdminTab === 'profile' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-white/10">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4" style={{ color: config.hex }} />
                    <span>Hero Section & Profile Information</span>
                  </h4>
                  <p className="text-xs font-mono text-zinc-400">
                    Customize your hero headline, live availability pill, location, intro bio, and social channels
                  </p>
                </div>

                {profileSavedNotice && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Hero Section & Profile updated and published successfully!</span>
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  
                  {/* Part A: Hero Section Display Content */}
                  <div className="bg-[#171717]/90 p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs font-mono font-bold text-white uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" style={{ color: config.hex }} />
                      <span>1. Hero Section Content (Headline, Badge & Intro)</span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                        Hero Main Headline
                      </label>
                      <input
                        type="text"
                        value={heroHeadline}
                        onChange={(e) => setHeroHeadline(e.target.value)}
                        placeholder="Engineering sleek, resilient full-stack web apps with modern craft."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                      <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                        Main bold headline displayed at top of the portfolio.
                      </span>
                    </div>

                    {/* Headline Font Size Selector */}
                    <div className="bg-[#121212] p-4 rounded-xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-xs font-mono text-zinc-200 font-semibold">
                            Headline Font Size (Home Page Display)
                          </label>
                          <span className="text-[11px] text-zinc-500 font-mono">
                            Choose how big or compact the headline appears on the Home page
                          </span>
                        </div>
                        <span
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider border"
                          style={{
                            color: config.hex,
                            borderColor: `${config.hex}50`,
                            backgroundColor: `${config.hex}15`,
                          }}
                        >
                          {heroHeadlineFontSize}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { id: 'small', label: 'Small', desc: 'Compact & subtle', sizeNote: '24px - 36px' },
                          { id: 'medium', label: 'Medium', desc: 'Balanced (Recommended)', sizeNote: '28px - 48px' },
                          { id: 'large', label: 'Large', desc: 'Prominent & bold', sizeNote: '32px - 54px' },
                          { id: 'xlarge', label: 'Extra Large', desc: 'Original big impact', sizeNote: '36px - 60px' },
                        ].map((opt) => {
                          const isSelected = heroHeadlineFontSize === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setHeroHeadlineFontSize(opt.id as any)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'text-white shadow-lg'
                                  : 'border-white/10 bg-[#161616] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                              }`}
                              style={
                                isSelected
                                  ? {
                                      borderColor: config.hex,
                                      backgroundColor: `${config.hex}22`,
                                      boxShadow: `0 0 16px ${config.glowRgba}`,
                                    }
                                  : {}
                              }
                            >
                              <div className="flex items-center justify-between w-full mb-1">
                                <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                  {opt.label}
                                </span>
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.hex }} />
                                )}
                              </div>
                              <span className="text-[10px] text-zinc-400 font-sans leading-tight block mb-0.5">{opt.desc}</span>
                              <span className="text-[9px] font-mono text-zinc-500 block">{opt.sizeNote}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Live preview */}
                      <div className="pt-2.5 border-t border-white/5">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
                          Live Headline Preview ({heroHeadlineFontSize}):
                        </span>
                        <div className="p-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                          <p
                            className={`font-extrabold tracking-tight text-white leading-snug transition-all duration-300 ${
                              heroHeadlineFontSize === 'small'
                                ? 'text-base sm:text-lg lg:text-xl'
                                : heroHeadlineFontSize === 'medium'
                                ? 'text-lg sm:text-xl lg:text-2xl'
                                : heroHeadlineFontSize === 'large'
                                ? 'text-xl sm:text-2xl lg:text-3xl'
                                : 'text-2xl sm:text-3xl lg:text-4xl'
                            }`}
                          >
                            {heroHeadline || 'Engineering sleek, resilient full-stack web apps with modern craft.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          Gradient Highlight Text
                        </label>
                        <input
                          type="text"
                          value={heroHeadlineHighlight}
                          onChange={(e) => setHeroHeadlineHighlight(e.target.value)}
                          placeholder="full-stack web apps"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                        <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                          The words inside the headline rendered with accent glow.
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          Live Availability Status
                        </label>
                        <input
                          type="text"
                          value={heroAvailability}
                          onChange={(e) => setHeroAvailability(e.target.value)}
                          placeholder="Available for Full-Time Roles"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                        <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                          Text shown inside the glowing green status pill.
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                        Current Location
                      </label>
                      <input
                        type="text"
                        value={heroLocation}
                        onChange={(e) => setHeroLocation(e.target.value)}
                        placeholder="Andhra Pradesh, India"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                        Hero Subtitle & Introduction Bio
                      </label>
                      <textarea
                        rows={3}
                        value={heroBio}
                        onChange={(e) => setHeroBio(e.target.value)}
                        placeholder="I am Kommireddy Sai Durga Nivas, a Full Stack Developer with production internship experience across MERN stack architectures, Python workflows, and RESTful API integrations."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30 leading-relaxed"
                      />
                      <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                        Introductory description right below the main headline.
                      </span>
                    </div>
                  </div>

                  {/* Part B: Hero Terminal Code Snippet */}
                  <div className="bg-[#171717]/90 p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs font-mono font-bold text-white uppercase tracking-wider">
                      <Terminal className="w-3.5 h-3.5" style={{ color: config.hex }} />
                      <span>2. Hero Terminal Code Snippet (Interactive Card)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          Config Filename
                        </label>
                        <input
                          type="text"
                          value={terminalFileName}
                          onChange={(e) => setTerminalFileName(e.target.value)}
                          placeholder="sai-durga-nivas.config.ts"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          Terminal Comment Line
                        </label>
                        <input
                          type="text"
                          value={terminalComment}
                          onChange={(e) => setTerminalComment(e.target.value)}
                          placeholder="Ready to build robust, scalable applications"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                        Core Tech Stack Array (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={terminalStack}
                        onChange={(e) => setTerminalStack(e.target.value)}
                        placeholder="React, Node.js, MongoDB, Python, MySQL"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                      <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                        Technologies rendered in the <code className="text-blue-400">coreStack = [...]</code> array in the terminal card.
                      </span>
                    </div>
                  </div>

                  {/* Part C: Identity, Contact & Social Links */}
                  <div className="bg-[#171717]/90 p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs font-mono font-bold text-white uppercase tracking-wider">
                      <User className="w-3.5 h-3.5" style={{ color: config.hex }} />
                      <span>3. Identity, Contacts & Social Channels</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          Professional Title / Role
                        </label>
                        <input
                          type="text"
                          value={profileRole}
                          onChange={(e) => setProfileRole(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          Direct Email Address
                        </label>
                        <input
                          type="email"
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          Direct Phone Number
                        </label>
                        <input
                          type="text"
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          GitHub Profile / Repositories URL
                        </label>
                        <input
                          type="url"
                          value={profileGithub}
                          onChange={(e) => setProfileGithub(e.target.value)}
                          placeholder="https://github.com/saidurganivas02?tab=repositories"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">
                          LinkedIn Profile URL
                        </label>
                        <input
                          type="url"
                          value={profileLinkedin}
                          onChange={(e) => setProfileLinkedin(e.target.value)}
                          placeholder="https://www.linkedin.com/in/sai-durga-nivas-kommireddi-61bb0233b"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Part D: About Section Story */}
                  <div className="bg-[#171717]/90 p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs font-mono font-bold text-white uppercase tracking-wider">
                      <Type className="w-3.5 h-3.5" style={{ color: config.hex }} />
                      <span>4. About Section Bio & Story (Detailed)</span>
                    </div>
                    <textarea
                      rows={4}
                      value={profileDescription}
                      onChange={(e) => setProfileDescription(e.target.value)}
                      placeholder="Write your background, tech philosophy, and detailed experience..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30 leading-relaxed"
                    />
                    <span className="text-[11px] font-mono text-zinc-500 block">
                      Separate multiple paragraphs with double line breaks.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-white shadow-lg active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 hover:opacity-95"
                    style={{
                      backgroundColor: config.hex,
                      boxShadow: `0 4px 20px ${config.glowRgba}`,
                    }}
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Hero & Profile Changes</span>
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 5: PHOTO CHANGE OPTION SECTION                                        */}
            {/* ========================================================================= */}
            {activeAdminTab === 'photo' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-white/10">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4" style={{ color: config.hex }} />
                    <span>Hero Photo Change Option</span>
                  </h4>
                  <p className="text-xs font-mono text-zinc-400">
                    Upload a new photo for the circular avatar frame in the hero section
                  </p>
                </div>

                {photoSavedNotice && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Photo saved permanently! It will now remain saved even when you refresh or reopen newly.</span>
                  </div>
                )}

                <div className="bg-[#171717]/80 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-8">
                  {/* Circle Avatar Preview */}
                  <div className="shrink-0 flex flex-col items-center gap-3">
                    <div
                      className="w-44 h-44 rounded-full p-1.5 shadow-2xl transition-all flex items-center justify-center relative"
                      style={{
                        background: `linear-gradient(135deg, ${config.hex}, #1a1a1a 50%, ${config.hex}80)`,
                        boxShadow: `0 0 40px ${config.glowRgba}`,
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-[#0d0d0d] overflow-hidden relative border border-white/20 flex items-center justify-center">
                        {isCompressingPhoto ? (
                          <div className="flex flex-col items-center gap-2 p-4 text-center">
                            <Loader2 className="w-6 h-6 animate-spin" style={{ color: config.hex }} />
                            <span className="text-[10px] font-mono text-zinc-400">Optimizing...</span>
                          </div>
                        ) : (
                          <img
                            src={photoPreview || heroPhoto}
                            alt="Hero Avatar"
                            className="w-full h-full object-cover object-top"
                          />
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">
                      {photoPreview ? 'New Photo Preview' : 'Current Circle Photo'}
                    </span>
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-4 w-full">
                    <input
                      ref={heroPhotoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleHeroPhotoUpload}
                      className="hidden"
                      id="hero-photo-admin-input"
                    />

                    <div
                      onClick={() => !isCompressingPhoto && heroPhotoInputRef.current?.click()}
                      className={`p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-white/25 bg-[#121212] text-center transition-colors ${
                        isCompressingPhoto ? 'opacity-60 cursor-wait' : 'cursor-pointer'
                      }`}
                    >
                      {isCompressingPhoto ? (
                        <>
                          <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-zinc-400" />
                          <span className="text-sm font-bold text-white block">Optimizing photo...</span>
                          <span className="text-xs font-mono text-zinc-500">
                            Compressing to ensure reliable permanent browser storage
                          </span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-8 h-8 mx-auto mb-2 text-zinc-400" />
                          <span className="text-sm font-bold text-white block">Click to select new photo</span>
                          <span className="text-xs font-mono text-zinc-500">
                            Auto-optimizes PNG, JPG, JPEG, and WebP for persistent storage
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleApplyHeroPhoto}
                        disabled={!photoPreview || isCompressingPhoto}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                          photoPreview && !isCompressingPhoto
                            ? 'cursor-pointer active:scale-98'
                            : 'opacity-40 cursor-not-allowed'
                        }`}
                        style={photoPreview && !isCompressingPhoto ? {
                          backgroundColor: config.hex,
                          boxShadow: `0 4px 15px ${config.glowRgba}`,
                        } : { backgroundColor: '#262626' }}
                      >
                        <Check className="w-4 h-4" />
                        <span>Apply & Save Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetHeroPhoto}
                        className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-xs font-mono text-zinc-300 hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Reset to default"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-400 leading-relaxed">
                      💡 <strong className="text-zinc-300">Permanent project default:</strong> The default photo is located at <span className="text-zinc-200">src/assets/images/default_profile.jpg</span>. You can also replace that file with your own photo at any time to permanently bake it into the website for all visitors.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 6: INCOMING INQUIRIES & TRANSMISSIONS INBOX                          */}
            {/* ========================================================================= */}
            {activeAdminTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" style={{ color: config.hex }} />
                      <span>Contact Inquiries & Transmission Inbox</span>
                    </h4>
                    <p className="text-xs font-mono text-zinc-400">
                      Messages submitted by recruiters, managers, and collaborators via the contact form
                    </p>
                  </div>
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllMessages}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Clear all messages"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {messages.length === 0 ? (
                  <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center space-y-3">
                    <MessageSquare className="w-10 h-10 mx-auto text-zinc-600" />
                    <h5 className="text-sm font-bold text-white">No Inquiries Yet</h5>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      When someone sends a message via the Contact section, it will appear here instantly.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-5 rounded-2xl bg-[#171717] border border-white/10 hover:border-white/20 transition-all space-y-3 relative group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs" style={{ color: config.hex }}>
                              {msg.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white flex items-center gap-2">
                                <span>{msg.name}</span>
                                <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-zinc-400">
                                  {msg.projectType}
                                </span>
                              </div>
                              <a
                                href={`mailto:${msg.email}`}
                                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                              >
                                {msg.email}
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                            <span>{msg.timestamp}</span>
                            <button
                              type="button"
                              onClick={() => deleteMessage(msg.id)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 transition-colors"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-zinc-300 font-mono leading-relaxed bg-[#121212] p-3.5 rounded-xl border border-white/5 whitespace-pre-wrap">
                          {msg.message}
                        </div>

                        {/* Quick Response Actions */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.projectType} - Sai Durga Nivas`)}&body=${encodeURIComponent(`Hi ${msg.name},\n\nThank you for reaching out regarding ${msg.projectType}.\n\nBest regards,\nSai Durga Nivas`)}`}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" style={{ color: config.hex }} />
                            <span>Reply via Email</span>
                          </a>

                          <a
                            href={`https://wa.me/916300697301?text=${encodeURIComponent(`Regarding inquiry from ${msg.name} (${msg.email}): ${msg.message}`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-1.5 transition-colors"
                          >
                            <span>WhatsApp Note</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 7: SECURITY — Change Username & Password                             */}
            {/* ========================================================================= */}
            {activeAdminTab === 'security' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-white/10">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" style={{ color: config.hex }} />
                    <span>Admin Login Credentials</span>
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    Change your admin username and password. Credentials are stored locally in your browser.
                  </p>
                </div>

                {/* Current Credentials Info Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${config.hex}20`, color: config.hex }}
                  >
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-400">Current admin username</div>
                    <div className="text-sm font-bold text-white font-mono">{adminUsername}</div>
                  </div>
                </div>

                {/* Result Banner */}
                {secResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3.5 rounded-xl flex items-start gap-2.5 text-xs font-mono ${
                      secResult.success
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {secResult.success
                      ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                      : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />}
                    <span>{secResult.message}</span>
                  </motion.div>
                )}

                {/* Change Credentials Form */}
                <form onSubmit={handleSecuritySubmit} className="space-y-5">
                  {/* Current Password */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-zinc-400" />
                      Current Password <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={secShowCurrentPass ? 'text' : 'password'}
                        value={secCurrentPassword}
                        onChange={(e) => setSecCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 text-sm font-mono pr-11 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setSecShowCurrentPass(!secShowCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
                      >
                        {secShowCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[11px] font-mono text-zinc-500">New Credentials</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* New Username */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      New Username
                      <span className="text-zinc-500 text-[10px] ml-1">(leave blank to keep current: "{adminUsername}")</span>
                    </label>
                    <input
                      type="text"
                      value={secNewUsername}
                      onChange={(e) => setSecNewUsername(e.target.value)}
                      placeholder={`Keep as "${adminUsername}" or type a new username`}
                      className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 text-sm font-mono transition-colors"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
                      New Password <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={secShowNewPass ? 'text' : 'password'}
                        value={secNewPassword}
                        onChange={(e) => setSecNewPassword(e.target.value)}
                        placeholder="Minimum 4 characters"
                        required
                        minLength={4}
                        className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 text-sm font-mono pr-11 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setSecShowNewPass(!secShowNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
                      >
                        {secShowNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
                      Confirm New Password <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="password"
                      value={secConfirmPassword}
                      onChange={(e) => setSecConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-[#171717] border text-white placeholder:text-zinc-600 focus:outline-none text-sm font-mono transition-colors ${
                        secConfirmPassword && secNewPassword !== secConfirmPassword
                          ? 'border-rose-500/50 focus:border-rose-400'
                          : 'border-white/10 focus:border-white/30'
                      }`}
                    />
                    {secConfirmPassword && secNewPassword !== secConfirmPassword && (
                      <p className="text-[11px] text-rose-400 font-mono mt-1">Passwords do not match</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={!secCurrentPassword || !secNewPassword || secNewPassword !== secConfirmPassword}
                      className="flex-1 py-3 px-5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: config.hex,
                        boxShadow: `0 4px 20px ${config.glowRgba}`,
                      }}
                    >
                      <Check className="w-4 h-4" />
                      <span>Update Credentials</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCredentials}
                      className="py-3 px-4 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-xs font-mono text-zinc-300 hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Reset to default credentials"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Default</span>
                    </button>
                  </div>
                </form>

                {/* Info box */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-400 leading-relaxed">
                  🔒 <strong className="text-zinc-300">Note:</strong> Credentials are stored in your browser's localStorage. If you change devices or clear browser data, use <strong className="text-zinc-200">Reset to Default</strong> to restore the original login (username: <span className="text-zinc-200">nivas</span>, password: <span className="text-zinc-200">nivas123</span>).
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0e0e0e] flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">
              User: <span className="text-zinc-300">{adminUsername}</span> • Local Storage Sync Active
            </span>
            <button
              onClick={closeAdminModal}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
