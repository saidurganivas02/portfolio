export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend & API' | 'Databases';
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  details?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  iconType?: string;
  imageUrl?: string;
  issueDate?: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  companyLocation: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    level?: number;
    iconName?: string;
    tag?: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  relationship: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
  sublabel: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  timestamp: string;
  read?: boolean;
}
