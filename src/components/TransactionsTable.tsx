import React, { useState } from 'react';
import { Transaction } from '@/types';

interface TransactionsTableProps {
  transactions: Transaction[];
}

type SortField = 'date' | 'remark' | 'amount' | 'currency' | 'type';
type SortOrder = 'asc' | 'desc';

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  
  const sortedTransactions = [...transactions].sort((a, b) => {
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

  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-4 text-left">
              <button 
                className="flex items-center text-gray-600 font-medium" 
                onClick={() => handleSort('date')}
              >
                Date {renderSortIcon('date')}
              </button>
            </th>
            <th className="pb-4 text-left">
              <button 
                className="flex items-center text-gray-600 font-medium" 
                onClick={() => handleSort('remark')}
              >
                Remark {renderSortIcon('remark')}
              </button>
            </th>
            <th className="pb-4 text-right">
              <button 
                className="flex items-center justify-end text-gray-600 font-medium" 
                onClick={() => handleSort('amount')}
              >
                Amount {renderSortIcon('amount')}
              </button>
            </th>
            <th className="pb-4 text-left">
              <button 
                className="flex items-center text-gray-600 font-medium" 
                onClick={() => handleSort('currency')}
              >
                Currency {renderSortIcon('currency')}
              </button>
            </th>
            <th className="pb-4 text-left">
              <button 
                className="flex items-center text-gray-600 font-medium" 
                onClick={() => handleSort('type')}
              >
                Type {renderSortIcon('type')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-100">
              <td className="py-4">{transaction.date}</td>
              <td className="py-4">{transaction.remark}</td>
              <td className="py-4 text-right font-medium">
                {transaction.amount >= 0 
                  ? `$${transaction.amount.toLocaleString()}`
                  : `-$${Math.abs(transaction.amount).toLocaleString()}`
                }
              </td>
              <td className="py-4">{transaction.currency}</td>
              <td className="py-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className={`h-2 w-2 rounded-full ${transaction.type === 'Credit' ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <span>{transaction.type}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
