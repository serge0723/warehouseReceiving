
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'py-4 px-6 rounded-xl font-black text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 tracking-wider uppercase';
  const variants = {
    primary: 'bg-yellow-400 text-zinc-950 industrial-shadow hover:bg-yellow-300',
    secondary: 'bg-zinc-800 text-zinc-100 industrial-shadow hover:bg-zinc-700 border border-zinc-700',
    danger: 'bg-orange-600 text-white industrial-shadow hover:bg-orange-500',
    ghost: 'bg-transparent text-zinc-400 hover:text-white',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ 
  label, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-zinc-500 font-bold uppercase text-xs tracking-widest">{label}</label>}
      <input 
        className={`bg-zinc-900 border-2 border-zinc-800 text-zinc-100 p-4 rounded-xl text-lg font-bold transition-colors focus:border-yellow-400 ${className}`}
        {...props} 
      />
    </div>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode, color?: 'yellow' | 'green' | 'red' }> = ({ 
  children, 
  color = 'yellow' 
}) => {
  const colors = {
    yellow: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    green: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    red: 'bg-rose-400/10 text-rose-400 border-rose-400/20'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border tracking-widest ${colors[color]}`}>
      {children}
    </span>
  );
};
