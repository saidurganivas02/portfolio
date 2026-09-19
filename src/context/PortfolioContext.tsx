import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Certification, Experience, ContactMessage } from '../types';
import {
  personalInfo as initialPersonalInfo,
  projectsData as initialProjectsData,
  certificationsData as initialCertificationsData,
  experienceData as initialExperienceData,
} from '../data/portfolioData';
import defaultFallbackPhoto from '../assets/images/default_profile.jpg';

type AdminTab = 'projects' | 'certificates' | 'experience' | 'profile' | 'photo' | 'messages' | 'security' | 'theme';

interface PortfolioContextType {
  // Authentication & Credentials
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  adminUsername: string;
  updateCredentials: (currentPassword: string, newUsername: string, newPassword: string) => { success: boolean; message: string };
  resetCredentials: () => void;

  // Modals
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAdminModalOpen: boolean;
  openAdminModal: (tab?: AdminTab, editTargetId?: string) => void;
  closeAdminModal: () => void;
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;
  adminEditTargetId: string | null;
  setAdminEditTargetId: (id: string | null) => void;

  // Certificate Viewer Modal
  viewingCertificate: Certification | null;
  setViewingCertificate: (cert: Certification | null) => void;

  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Certifications
  certifications: Certification[];
  addCertification: (cert: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;

  // Experience
  experiences: Experience[];
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // Profile Information
  profile: typeof initialPersonalInfo;
  updateProfile: (data: Partial<typeof initialPersonalInfo>) => void;

  // Hero Avatar Photo
  heroPhoto: string;
  updateHeroPhoto: (dataUrl: string) => void;
  resetHeroPhoto: () => void;

  // Inquiries & Messages
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => void;
  deleteMessage: (id: string) => void;
  clearAllMessages: () => void;

  // Reset all to default
  resetAllData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nivas_auth_session') === 'true';
    }
    return false;
  });

  const DEFAULT_ADMIN_CREDENTIALS = {
    username: 'nivas',
    password: 'nivas123',
  };

  const [adminCredentials, setAdminCredentials] = useState<{ username: string; password: string }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nivas_admin_credentials');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.username === 'string' && typeof parsed.password === 'string') {
            return parsed;
          }
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_ADMIN_CREDENTIALS;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('projects');
  const [adminEditTargetId, setAdminEditTargetId] = useState<string | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState<Certification | null>(null);

  // Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nivas_portfolio_projects');
      if (saved) {
        try {
          const parsed: Project[] = JSON.parse(saved);
          return parsed.map((p) => {
            if (!p.githubUrl || p.githubUrl === 'https://github.com') {
              return { ...p, githubUrl: 'https://github.com/saidurganivas02?tab=repositories' };
            }
            return p;
          });
        } catch {
          // fallback
        }
      }
    }
    return initialProjectsData;
  });

  // Certifications State
  const [certifications, setCertifications] = useState<Certification[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nivas_portfolio_certifications');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialCertificationsData;
  });

  // Experience State
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nivas_portfolio_experiences');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialExperienceData;
  });

  // Profile Information State
  const [profile, setProfile] = useState<typeof initialPersonalInfo>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nivas_portfolio_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (!parsed.github || parsed.github === 'https://github.com') {
            parsed.github = initialPersonalInfo.github;
          }
          if (!parsed.linkedin || parsed.linkedin === 'https://linkedin.com' || parsed.linkedin === 'https://www.linkedin.com') {
            parsed.linkedin = initialPersonalInfo.linkedin;
          }
          return { ...initialPersonalInfo, ...parsed };
        } catch {
          // fallback
        }
      }
    }
    return initialPersonalInfo;
  });

  // Hero Photo State
  const [heroPhoto, setHeroPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      // Clear any legacy test photo from prior sessions so new centered portrait shows
      localStorage.removeItem('user_original_photo_data');
      localStorage.removeItem('user_original_photo_data_v2');
      const saved = localStorage.getItem('user_original_photo_data_v3');
      if (saved) return saved;
    }
    return defaultFallbackPhoto;
  });

  // Messages State
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nivas_received_messages');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return [
      {
        id: 'msg-sample-1',
        name: 'Technical Recruiter',
        email: 'recruiter@techventures.io',
        projectType: 'Full-Stack Engineering Role',
        message: 'Hi Sai Durga Nivas, we reviewed your MERN stack and Python projects and would love to schedule a technical discussion for our Full-Stack Engineer position.',
        timestamp: '9/5/2026, 11:30:00 AM',
        read: false,
      },
    ];
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nivas_portfolio_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('nivas_portfolio_certifications', JSON.stringify(certifications));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [certifications]);

  useEffect(() => {
    try {
      localStorage.setItem('nivas_portfolio_experiences', JSON.stringify(experiences));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [experiences]);

  useEffect(() => {
    try {
      localStorage.setItem('nivas_portfolio_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('nivas_received_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [messages]);

  // Messages methods
  const addMessage = (msgData: Omit<ContactMessage, 'id' | 'timestamp'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      read: false,
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const clearAllMessages = () => {
    setMessages([]);
    localStorage.removeItem('nivas_received_messages');
  };

  // Auth & Credentials methods
  const login = (username: string, pass: string): boolean => {
    if (
      username.trim().toLowerCase() === adminCredentials.username.trim().toLowerCase() &&
      pass === adminCredentials.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('nivas_auth_session', 'true');
      setIsAuthModalOpen(false);
      setIsAdminModalOpen(true);
      return true;
    }
    return false;
  };

  const updateCredentials = (
    currentPassword: string,
    newUsername: string,
    newPassword: string
  ): { success: boolean; message: string } => {
    if (currentPassword !== adminCredentials.password) {
      return {
        success: false,
        message: 'Current password is incorrect. Please verify your current password to make changes.',
      };
    }

    const trimmedUser = newUsername.trim();
    if (!trimmedUser) {
      return { success: false, message: 'Username cannot be blank.' };
    }

    if (!newPassword || newPassword.length < 4) {
      return { success: false, message: 'New password must be at least 4 characters long.' };
    }

    const updated = {
      username: trimmedUser,
      password: newPassword,
    };

    setAdminCredentials(updated);
    try {
      localStorage.setItem('nivas_admin_credentials', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage error saving admin credentials:', e);
    }

    return {
      success: true,
      message: `Admin credentials updated successfully! New username: "${trimmedUser}".`,
    };
  };

  const resetCredentials = () => {
    setAdminCredentials(DEFAULT_ADMIN_CREDENTIALS);
    localStorage.removeItem('nivas_admin_credentials');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nivas_auth_session');
    setIsAdminModalOpen(false);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openAdminModal = (tab: AdminTab = 'projects', editTargetId?: string) => {
    setActiveAdminTab(tab);
    setAdminEditTargetId(editTargetId || null);
    setIsAdminModalOpen(true);
  };
  const closeAdminModal = () => setIsAdminModalOpen(false);

  // Projects methods
  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...projectData } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Certifications methods
  const addCertification = (certData: Omit<Certification, 'id'>) => {
    const newCert: Certification = {
      ...certData,
      id: `cert-${Date.now()}`,
    };
    setCertifications((prev) => [newCert, ...prev]);
  };

  const updateCertification = (id: string, certData: Partial<Certification>) => {
    setCertifications((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...certData } : c))
    );
  };

  const deleteCertification = (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
  };

  // Experience methods
  const addExperience = (expData: Omit<Experience, 'id'>) => {
    const newExp: Experience = {
      ...expData,
      id: `exp-${Date.now()}`,
    };
    setExperiences((prev) => [newExp, ...prev]);
  };

  const updateExperience = (id: string, expData: Partial<Experience>) => {
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...expData } : e))
    );
  };

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  // Profile methods
  const updateProfile = (data: Partial<typeof initialPersonalInfo>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  // Hero Photo methods
  const updateHeroPhoto = (dataUrl: string) => {
    setHeroPhoto(dataUrl);
    try {
      localStorage.setItem('user_original_photo_data_v3', dataUrl);
    } catch (e) {
      console.warn('Storage quota limit:', e);
    }
  };

  const resetHeroPhoto = () => {
    setHeroPhoto(defaultFallbackPhoto);
    localStorage.removeItem('user_original_photo_data_v3');
    localStorage.removeItem('user_original_photo_data_v2');
    localStorage.removeItem('user_original_photo_data');
  };

  const resetAllData = () => {
    setProjects(initialProjectsData);
    setCertifications(initialCertificationsData);
    setExperiences(initialExperienceData);
    setProfile(initialPersonalInfo);
    setHeroPhoto(defaultFallbackPhoto);
    localStorage.removeItem('nivas_portfolio_projects');
    localStorage.removeItem('nivas_portfolio_certifications');
    localStorage.removeItem('nivas_portfolio_experiences');
    localStorage.removeItem('nivas_portfolio_profile');
    localStorage.removeItem('user_original_photo_data_v3');
    localStorage.removeItem('user_original_photo_data_v2');
    localStorage.removeItem('user_original_photo_data');
    resetCredentials();
  };

  return (
    <PortfolioContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        adminUsername: adminCredentials.username,
        updateCredentials,
        resetCredentials,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isAdminModalOpen,
        openAdminModal,
        closeAdminModal,
        activeAdminTab,
        setActiveAdminTab,
        adminEditTargetId,
        setAdminEditTargetId,
        viewingCertificate,
        setViewingCertificate,
        projects,
        addProject,
        updateProject,
        deleteProject,
        certifications,
        addCertification,
        updateCertification,
        deleteCertification,
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
        addMessage,
        deleteMessage,
        clearAllMessages,
        resetAllData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
