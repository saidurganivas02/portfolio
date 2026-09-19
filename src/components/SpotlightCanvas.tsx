import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const SpotlightCanvas: React.FC = () => {
  const { config } = useTheme();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        if (el) {
          el.style.transform = `translate3d(${e.clientX - 350}px, ${e.clientY - 350}px, 0)`;
          el.style.opacity = '1';
        }
        rafId.current = null;
      });
    };

    const handleMouseLeave = () => {
      if (el) el.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none will-change-transform contain-paint">
      {/* Base Dark Obsidian Canvas */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Subtle background tech grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Ambient static gradient orbs with hardware acceleration */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[100px] opacity-20 transition-colors duration-700 will-change-transform"
        style={{ backgroundColor: config.hex, transform: 'translateZ(0)' }}
      />
      <div 
        className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-15 transition-colors duration-700 will-change-transform"
        style={{ backgroundColor: config.hex, transform: 'translateZ(0)' }}
      />
      <div 
        className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-[100px] opacity-15 transition-colors duration-700 will-change-transform"
        style={{ backgroundColor: config.hex, transform: 'translateZ(0)' }}
      />

      {/* High-Performance 120FPS GPU Radial Mouse-Spotlight (Zero React re-renders) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 rounded-full pointer-events-none opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          width: '700px',
          height: '700px',
          background: `radial-gradient(circle, ${config.glowRgba} 0%, rgba(10, 10, 10, 0) 70%)`,
        }}
      />
    </div>
  );
};
