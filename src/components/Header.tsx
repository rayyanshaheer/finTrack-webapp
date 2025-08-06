import React from 'react';
import Image from 'next/image';
import { User } from '@/types';
import Avatar from './Avatar';

interface HeaderProps {
  title: string;
  isActive?: boolean;
  users?: User[];
  activeTab?: 'overview' | 'transactions';
  onTabChange?: (tab: 'overview' | 'transactions') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  isActive = true, 
  users = [], 
  activeTab = 'overview', 
  onTabChange = () => {} 
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        {/* Logo and Navigation on mobile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 12h-6.5a2 2 0 1 0 0 4H12"></path>
                  <path d="M10 8h6a2 2 0 1 1 0 4h-4"></path>
                </svg>
              </div>
              <span className="text-blue-600 font-semibold text-lg">FinTrack</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <div className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shadow-sm">
              <img src="/avatars/user.png" alt="User avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Title and status indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer text-gray-500">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isActive && (
              <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-green-600">Active</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action buttons on desktop */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <div className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shadow-sm">
            <img src="/avatars/user.png" alt="User avatar" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
      
      {/* User avatars */}
      {users.length > 0 && (
        <div className="mt-4 flex items-center space-x-2">
          <div className="flex -space-x-2">
            {users.slice(0, 3).map((user) => (
              <Avatar 
                key={user.id} 
                name={user.name} 
                src={user.avatar} 
                size="sm" 
                className="border-2 border-white shadow-sm"
              />
            ))}
            {users.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-gray-50 border-2 border-white shadow-sm flex items-center justify-center text-xs text-gray-500 font-medium">
                +{users.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500">
            Shared with <span className="font-medium text-gray-700">{users.slice(0, 3).map(user => user.name).join(', ')}</span>
            {users.length > 3 ? ` and ${users.length - 3} others` : ''}
          </span>
        </div>
      )}
      
      {/* Tab navigation */}
      <div className="mt-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button 
            className={`pb-4 font-medium text-sm transition-colors relative ${
              activeTab === 'overview' 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onTabChange('overview')}
          >
            Overview
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </button>
          <button 
            className={`pb-4 font-medium text-sm transition-colors relative ${
              activeTab === 'transactions' 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onTabChange('transactions')}
          >
            Transactions
            {activeTab === 'transactions' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
