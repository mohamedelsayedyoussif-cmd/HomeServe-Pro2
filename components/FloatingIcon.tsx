
import React from 'react';

interface FloatingIconProps {
  icon: React.ReactNode;
  className?: string;
  delay?: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, className, delay }) => {
  return (
    <div 
      className={`absolute z-0 text-slate-300/40 pointer-events-none ${className}`}
      style={{ animation: `float ${delay || '6s'} ease-in-out infinite` }}
    >
      <div className="transform rotate-12 transition-transform duration-500 hover:scale-110">
        {icon}
      </div>
    </div>
  );
};

export default FloatingIcon;
