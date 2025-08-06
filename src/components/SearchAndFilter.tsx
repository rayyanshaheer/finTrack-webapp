import React, { useState } from 'react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (type: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleSearch = (e: any) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilter(filter);
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <form onSubmit={handleSearch} className="flex-grow w-full md:max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </form>
      
      <div className="flex items-center space-x-3 w-full md:w-auto">
        <span className="text-sm font-medium text-gray-600">Filter by:</span>
        <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
          <button 
            onClick={() => handleFilterClick('all')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeFilter === 'all' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => handleFilterClick('Credit')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center ${
              activeFilter === 'Credit' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            Credit
          </button>
          <button 
            onClick={() => handleFilterClick('Debit')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center ${
              activeFilter === 'Debit' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
            Debit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
