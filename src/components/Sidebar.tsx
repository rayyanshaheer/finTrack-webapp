import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full bg-white w-full md:w-64 border-r border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-8">
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M16 12h-6.5a2 2 0 1 0 0 4H12"></path>
            <path d="M10 8h6a2 2 0 1 1 0 4h-4"></path>
          </svg>
        </div>
        <span className="text-blue-600 font-semibold text-lg">FinTrack</span>
      </div>
      
      <nav>
        <ul className="space-y-1">
          <li>
            <Link 
              href="/" 
              className="flex items-center px-4 py-3 bg-gray-100 rounded-md text-gray-800 font-medium"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/transactions" 
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link 
              href="/reports" 
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md"
            >
              Reports
            </Link>
          </li>
          <li>
            <Link 
              href="/settings" 
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
