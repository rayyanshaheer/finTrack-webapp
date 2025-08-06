import React from 'react';
import { User, Transaction, DashboardSummary } from '@/types';
import Header from './Header';
import Sidebar from './Sidebar';
import SummaryCards from './SummaryCards';
import TransactionsTable from './TransactionsTable';
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
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Mobile Sidebar */}
      <div className="block md:hidden">
        <Sidebar />
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-4 md:p-6 lg:p-8">
        <Header title="Wallet Ledger" isActive={true} users={users} />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <SummaryCards summary={summary} />
        </div>
        
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
