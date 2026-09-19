import React from 'react';
import { motion } from 'motion/react';
import { useTheme, AccentColor, ACCENT_CONFIGS } from '../context/ThemeContext';
import { Palette } from 'lucide-react';

interface AccentSwitcherProps {
  compact?: boolean;
}

export const AccentSwitcher: React.FC<AccentSwitcherProps> = ({ compact = false }) => {
  const { accent, setAccent, config } = useTheme();
  const accents: AccentColor[] = ['cyan', 'violet', 'emerald', 'amber', 'rose'];

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#171717]/90 border border-white/10 backdrop-blur-md shadow-inner">
      {!compact && (
        <span className="text-[11px] font-mono text-zinc-400 pl-2 pr-1 flex items-center gap-1">
          <Palette className="w-3 h-3" style={{ color: config.hex }} />
          <span className="hidden xl:inline">Accent:</span>
        </span>
      )}

      <div className="flex items-center gap-1">
        {accents.map((item) => {
          const itemConfig = ACCENT_CONFIGS[item];
          const isActive = accent === item;

          return (
            <button
              key={item}
              onClick={() => setAccent(item)}
              className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                isActive ? 'scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
              title={`Switch accent to ${itemConfig.label}`}
              aria-label={`Switch accent to ${itemConfig.label}`}
            >
              {/* Outer ring for active state */}
              {isActive && (
                <motion.div
                  layoutId="active-accent-indicator"
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: itemConfig.hex }}
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              {/* Inner color dot */}
              <span
                className="w-3.5 h-3.5 rounded-full shadow-sm"
                style={{ backgroundColor: itemConfig.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
