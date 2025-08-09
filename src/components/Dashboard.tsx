import React, { useState, useEffect } from 'react';
import { User, Transaction, DashboardSummary } from '@/types';
import Header from './Header';
import Sidebar from './Sidebar';
import SummaryCards from './SummaryCards';
import TransactionsTable from './TransactionsTable';
import LoadingState from './LoadingState';
import { sampleTransactions, sampleDashboardSummary, sampleUsers } from '@/data/mockData';

interface DashboardProps {
  transactions?: Transaction[];
  summary?: DashboardSummary;
  users?: User[];
}

const Dashboard: React.FC<DashboardProps> = ({
  transactions = sampleTransactions,
  summary = sampleDashboardSummary,
  users = sampleUsers,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');
  
  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-4 md:p-6 lg:p-8">
        <Header 
          title="Wallet Ledger" 
          isActive={true} 
          users={users} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        {isLoading ? (
          <LoadingState message="Loading dashboard data..." />
        ) : (
          <>
            {activeTab === 'overview' ? (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-6">Summary</h2>
                <SummaryCards summary={summary} />
                <div className="mt-12">
                  <TransactionsTable 
                    transactions={transactions} 
                    isLoading={false} 
                  />
                </div>
              </div>
            ) : (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">All Transactions</h2>
                <TransactionsTable 
                  transactions={transactions} 
                  isLoading={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
