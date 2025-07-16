import React from 'react';

interface BookmarkIconProps {
  className?: string;
  filled?: boolean;
}

export const BookmarkIcon: React.FC<BookmarkIconProps> = ({ className = '', filled = false }) => {
  return (
    <svg
      className={`w-5 h-5 ${className}`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
};
