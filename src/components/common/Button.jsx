// src/components/common/Button.jsx
import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary (sage), secondary (sand), terracotta, outline, ghost, danger
  size = 'md', // sm, md, lg
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]';

  const variants = {
    primary:
      'bg-[#879779] text-white hover:bg-[#6F8164] focus:ring-[#879779] shadow-sm hover:shadow',
    gold:
      'bg-[#879779] text-white hover:bg-[#6F8164] focus:ring-[#879779] shadow-sm hover:shadow', // mapped to calm sage
    terracotta:
      'bg-[#C58F78] text-white hover:bg-[#9B5F48] focus:ring-[#C58F78] shadow-sm',
    secondary:
      'bg-[#E8DDC9] text-[#393A32] hover:bg-[#D9C8AC] focus:ring-[#879779]',
    outline:
      'border border-[#E5DFD2] text-[#393A32] bg-[#FFFDF7] hover:bg-[#F7F4EC] hover:border-[#D9D1C2] focus:ring-[#879779]',
    ghost:
      'text-[#5E5F55] bg-transparent hover:bg-[#EFECE2]/70 focus:ring-[#879779]',
    danger:
      'bg-[#FAF3F0] text-[#9B5F48] border border-[#E7C8BE] hover:bg-[#F4E4DF] focus:ring-[#C58F78]'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : Icon ? (
        <Icon className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
