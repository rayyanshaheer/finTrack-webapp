import React, { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import SearchAndFilter from './SearchAndFilter';
import Pagination from './Pagination';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

type SortField = 'date' | 'remark' | 'amount' | 'currency' | 'type';
type SortOrder = 'asc' | 'desc';

const ITEMS_PER_PAGE = 5;

const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions,
  isLoading = false
}) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    if (!query.trim() && activeFilter === 'all') {
      setFilteredTransactions(transactions);
      return;
    }
    
    const filtered = transactions.filter((transaction) => {
      const matchesSearch = !query.trim() || 
        transaction.remark.toLowerCase().includes(query.toLowerCase()) ||
        transaction.date.includes(query) ||
        transaction.amount.toString().includes(query) ||
        transaction.currency.toLowerCase().includes(query.toLowerCase());
        
      const matchesFilter = activeFilter === 'all' || transaction.type === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
    
    setFilteredTransactions(filtered);
  };
  
  const handleFilter = (type: string) => {
    setActiveFilter(type);
    setCurrentPage(1);
    
    if (type === 'all' && !searchQuery.trim()) {
      setFilteredTransactions(transactions);
      return;
    }
    
    const filtered = transactions.filter((transaction) => {
      const matchesSearch = !searchQuery.trim() || 
        transaction.remark.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.date.includes(searchQuery) ||
        transaction.amount.toString().includes(searchQuery) ||
        transaction.currency.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesFilter = type === 'all' || transaction.type === type;
      
      return matchesSearch && matchesFilter;
    });
    
    setFilteredTransactions(filtered);
  };
  
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Special handling for different field types
    if (sortField === 'amount') {
      aValue = Math.abs(Number(aValue));
      bValue = Math.abs(Number(bValue));
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Calculate pagination
  const totalItems = sortedTransactions.length;
  const lastPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);
  
  // Function to render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400">
          <path d="M7 10l5 5 5-5"/>
        </svg>
      );
    }
    
    return sortOrder === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    );
  };
  
  if (isLoading) {
    return <LoadingState message="Loading transactions..." />;
  }

  return (
    <div className="mt-6">
      <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
      
      {filteredTransactions.length === 0 ? (
        <EmptyState message="No transactions found" />
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 mt-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-gray-700 font-medium text-xs transition-colors hover:text-blue-600" 
                    onClick={() => handleSort('date')}
                  >
                    Date {renderSortIcon('date')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-gray-700 font-medium text-xs transition-colors hover:text-blue-600" 
                    onClick={() => handleSort('remark')}
                  >
                    Remark {renderSortIcon('remark')}
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button 
                    className="flex items-center justify-end text-gray-700 font-medium text-xs transition-colors hover:text-blue-600" 
                    onClick={() => handleSort('amount')}
                  >
                    Amount {renderSortIcon('amount')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-gray-700 font-medium text-xs transition-colors hover:text-blue-600" 
                    onClick={() => handleSort('currency')}
                  >
                    Currency {renderSortIcon('currency')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-gray-700 font-medium text-xs transition-colors hover:text-blue-600" 
                    onClick={() => handleSort('type')}
                  >
                    Type {renderSortIcon('type')}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 text-sm">{transaction.date}</td>
                  <td className="py-3.5 px-4 text-sm">{transaction.remark}</td>
                  <td className="py-3.5 px-4 text-right font-medium text-sm">
                    {transaction.amount >= 0 
                      ? <span className="text-gray-800">${transaction.amount.toLocaleString()}</span>
                      : <span className="text-gray-800">-${Math.abs(transaction.amount).toLocaleString()}</span>
                    }
                  </td>
                  <td className="py-3.5 px-4 text-sm">{transaction.currency}</td>
                  <td className="py-3.5 px-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`h-2 w-2 rounded-full ${transaction.type === 'Credit' ? 'bg-green-500' : 'bg-red-500'}`}
                      ></div>
                      <span className={transaction.type === 'Credit' ? 'text-green-700' : 'text-red-700'}>{transaction.type}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <Pagination 
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
