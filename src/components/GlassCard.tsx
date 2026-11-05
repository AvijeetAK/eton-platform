import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showReticles?: boolean;
  active?: boolean;
  glowOnHover?: boolean;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  showReticles = true,
  active = false,
  glowOnHover = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        reticle-container rounded-xl relative transition-all duration-300
        ${active ? 'glass-panel-active' : 'glass-panel'}
        ${glowOnHover ? 'hover:-translate-y-0.5' : ''}
        ${className}
      `}
      {...props}
    >
      {showReticles && (
        <>
          <div className="reticle-corner-tl" />
          <div className="reticle-corner-tr" />
          <div className="reticle-corner-bl" />
          <div className="reticle-corner-br" />
        </>
      )}
      {children}
    </div>
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'peach' | 'mint' | 'gold' | 'teal';
  className?: string;
}> = ({ children, variant = 'mint', className = '' }) => {
  const styles = {
    peach: 'bg-[#FFCB9A]/15 text-[#FFCB9A] border-[#FFCB9A]/40 shadow-[0_0_10px_rgba(255,203,154,0.15)]',
    mint: 'bg-[#D1E8E2]/10 text-[#D1E8E2] border-[#D1E8E2]/25',
    gold: 'bg-[#D9B08C]/15 text-[#D9B08C] border-[#D9B08C]/40',
    teal: 'bg-[#116466]/40 text-[#D1E8E2] border-[#116466]/80',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
