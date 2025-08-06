import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full bg-white w-full md:w-64 p-4">
      <nav>
        <ul className="space-y-1">
          <li>
            <Link 
              href="/dashboard" 
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
