import React from 'react';
import { DashboardSummary } from '@/types';

interface SummaryCardsProps {
  summary: DashboardSummary;
}

interface CardProps {
  title: string;
  value: string | number;
  change: number;
  showOptions?: boolean;
}

const SummaryCard: React.FC<CardProps> = ({ title, value, change, showOptions = true }) => {
  const changeClass = change >= 0 ? 'text-green-500' : 'text-red-500';
  const changePrefix = change >= 0 ? '+' : '';
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        {showOptions && (
          <button className="p-1">
            <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0C9.10457 0 10 0.895431 10 2C10 3.10457 9.10457 4 8 4C6.89543 4 6 3.10457 6 2C6 0.895431 6.89543 0 8 0Z" fill="#1A1A1A"/>
              <path d="M2 0C3.10457 0 4 0.895431 4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0Z" fill="#1A1A1A"/>
              <path d="M14 0C15.1046 0 16 0.895431 16 2C16 3.10457 15.1046 4 14 4C12.8954 4 12 3.10457 12 2C12 0.895431 12.8954 0 14 0Z" fill="#1A1A1A"/>
            </svg>
          </button>
        )}
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-900">
          {typeof value === 'number' && title !== 'Transactions' ? `$${value.toLocaleString()}` : value}
        </div>
        <div className={`text-sm font-medium ${changeClass}`}>
          {changePrefix}{change}%
        </div>
      </div>
    </div>
  );
};

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard 
        title="Total Balance" 
        value={summary.totalBalance}
        change={summary.balanceChange} 
      />
      <SummaryCard 
        title="Total Credits" 
        value={summary.totalCredits}
        change={summary.creditsChange}
      />
      <SummaryCard 
        title="Total Debits" 
        value={summary.totalDebits}
        change={summary.debitsChange}
      />
      <SummaryCard 
        title="Transactions" 
        value={summary.transactionCount}
        change={summary.transactionChange}
      />
    </div>
  );
};

export default SummaryCards;
