import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose';

export interface AccentThemeConfig {
  id: AccentColor;
  label: string;
  hex: string;
  glowRgba: string;
  textClass: string;
  borderClass: string;
  borderHoverClass: string;
  bgSubtle: string;
  bgHover: string;
  gradientClass: string;
  glowStyle: string;
  ringClass: string;
}

export const ACCENT_CONFIGS: Record<AccentColor, AccentThemeConfig> = {
  cyan: {
    id: 'cyan',
    label: 'Cyan',
    hex: '#06b6d4',
    glowRgba: 'rgba(6, 182, 212, 0.22)',
    textClass: 'text-cyan-400',
    borderClass: 'border-cyan-500/30',
    borderHoverClass: 'hover:border-cyan-400/60',
    bgSubtle: 'bg-cyan-500/10',
    bgHover: 'hover:bg-cyan-500/20',
    gradientClass: 'from-cyan-500 to-blue-500',
    glowStyle: '0 0 25px rgba(6, 182, 212, 0.35)',
    ringClass: 'ring-cyan-500/40',
  },
  violet: {
    id: 'violet',
    label: 'Violet',
    hex: '#8b5cf6',
    glowRgba: 'rgba(139, 92, 246, 0.22)',
    textClass: 'text-violet-400',
    borderClass: 'border-violet-500/30',
    borderHoverClass: 'hover:border-violet-400/60',
    bgSubtle: 'bg-violet-500/10',
    bgHover: 'hover:bg-violet-500/20',
    gradientClass: 'from-violet-500 to-purple-500',
    glowStyle: '0 0 25px rgba(139, 92, 246, 0.35)',
    ringClass: 'ring-violet-500/40',
  },
  emerald: {
    id: 'emerald',
    label: 'Emerald',
    hex: '#10b981',
    glowRgba: 'rgba(16, 185, 129, 0.22)',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    borderHoverClass: 'hover:border-emerald-400/60',
    bgSubtle: 'bg-emerald-500/10',
    bgHover: 'hover:bg-emerald-500/20',
    gradientClass: 'from-emerald-500 to-teal-500',
    glowStyle: '0 0 25px rgba(16, 185, 129, 0.35)',
    ringClass: 'ring-emerald-500/40',
  },
  amber: {
    id: 'amber',
    label: 'Amber',
    hex: '#f59e0b',
    glowRgba: 'rgba(245, 158, 11, 0.22)',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
    borderHoverClass: 'hover:border-amber-400/60',
    bgSubtle: 'bg-amber-500/10',
    bgHover: 'hover:bg-amber-500/20',
    gradientClass: 'from-amber-500 to-orange-500',
    glowStyle: '0 0 25px rgba(245, 158, 11, 0.35)',
    ringClass: 'ring-amber-500/40',
  },
  rose: {
    id: 'rose',
    label: 'Rose',
    hex: '#f43f5e',
    glowRgba: 'rgba(244, 63, 94, 0.22)',
    textClass: 'text-rose-400',
    borderClass: 'border-rose-500/30',
    borderHoverClass: 'hover:border-rose-400/60',
    bgSubtle: 'bg-rose-500/10',
    bgHover: 'hover:bg-rose-500/20',
    gradientClass: 'from-rose-500 to-pink-500',
    glowStyle: '0 0 25px rgba(244, 63, 94, 0.35)',
    ringClass: 'ring-rose-500/40',
  },
};

interface ThemeContextType {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  config: AccentThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accent, setAccent] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('portfolio_accent_color');
    return (saved && saved in ACCENT_CONFIGS ? saved : 'cyan') as AccentColor;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_accent_color', accent);
  }, [accent]);

  const config = ACCENT_CONFIGS[accent];

  return (
    <ThemeContext.Provider value={{ accent, setAccent, config }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
