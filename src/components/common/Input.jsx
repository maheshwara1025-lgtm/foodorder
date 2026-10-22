// src/components/common/Input.jsx
import React, { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      type = 'text',
      className = '',
      id,
      name,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55] flex items-center justify-between"
          >
            <span>
              {label} {required && <span className="text-[#C58F78]">*</span>}
            </span>
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 pointer-events-none text-[#77786C]">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            required={required}
            className={`w-full rounded-xl border bg-[#FFFDF7] text-[#393A32] px-3.5 py-2.5 text-sm transition duration-150 placeholder:text-[#979791] focus:outline-none focus:ring-2 ${
              Icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-[#E7C8BE] focus:border-[#C58F78] focus:ring-[#C58F78]/20'
                : 'border-[#E5DFD2] focus:border-[#879779] focus:ring-[#879779]/20'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs font-medium text-[#9B5F48] mt-0.5">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-[#77786C] mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
