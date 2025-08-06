import React from 'react';
import Image from 'next/image';
import { User } from '@/types';

interface HeaderProps {
  title: string;
  isActive?: boolean;
  users?: User[];
}

const Header: React.FC<HeaderProps> = ({ title, isActive = true, users = [] }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        {/* Logo and Navigation on mobile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="md:hidden p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 12h-6.5a2 2 0 1 0 0 4H12"></path>
                  <path d="M10 8h6a2 2 0 1 1 0 4h-4"></path>
                </svg>
              </div>
              <span className="text-blue-600 font-semibold text-lg">FinTrack</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 md:hidden">
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="/avatars/user.png" alt="User avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Title and status indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isActive && (
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-500">Active</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action buttons on desktop */}
        <div className="hidden md:flex md:items-center md:space-x-3">
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
            <img src="/avatars/user.png" alt="User avatar" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
      
      {/* User avatars */}
      {users.length > 0 && (
        <div className="mt-4 flex items-center space-x-2">
          <div className="flex -space-x-2">
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                <img src={user.avatar} alt={`${user.name}'s avatar`} className="h-full w-full object-cover" />
              </div>
            ))}
            {users.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500 font-medium">
                +{users.length - 3}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-600">
            {users.slice(0, 3).map(user => user.name).join(', ')} 
            {users.length > 3 ? ` +${users.length - 3} others` : ''}
          </span>
        </div>
      )}
      
      {/* Tab navigation */}
      <div className="mt-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button className="border-b-2 border-blue-600 pb-4 text-blue-600 font-medium">Overview</button>
          <button className="pb-4 text-gray-500 font-medium">Transactions</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
