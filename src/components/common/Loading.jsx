// src/components/common/Loading.jsx
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

export const Loading = ({
  message = 'Loading comforting experiences...',
  fullScreen = false,
  size = 'md'
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative mb-4 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-3 border-[#E8ECE4] border-t-[#879779] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-[#879779]">
          <UtensilsCrossed className="w-5 h-5" />
        </div>
      </div>
      <p className="text-sm font-medium text-[#393A32] tracking-wide">{message}</p>
      <span className="text-xs text-[#77786C] mt-1">Checking table availability...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center w-full">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
