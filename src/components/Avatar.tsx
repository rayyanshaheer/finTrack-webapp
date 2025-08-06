import React from 'react';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  className = '',
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };
  
  // Generate a deterministic background color based on the name
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500',
  ];
  
  const charCodeSum = name
    .split('')
    .map((char) => char.charCodeAt(0))
    .reduce((sum, code) => sum + code, 0);
  
  const bgColor = colors[charCodeSum % colors.length];
  
  if (src) {
    return (
      <div
        className={`${sizeClasses[size]} overflow-hidden rounded-full border-2 border-white ${className}`}
      >
        <img src={src} alt={name} className="h-full w-full object-cover" />
      </div>
    );
  }
  
  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full text-white font-medium ${bgColor} ${className}`}
      title={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;
