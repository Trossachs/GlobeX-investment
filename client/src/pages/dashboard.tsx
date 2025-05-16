import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useQuery } from '@tanstack/react-query';
import { Wallet, TrendingUp, Users, BarChart3 } from 'lucide-react';

import { StatsCard } from '@/components/ui/stats-card';
import { PortfolioChart } from '@/components/ui/portfolio-chart';
import { AssetDistribution } from '@/components/ui/asset-distribution';
import { TransactionsTable } from '@/components/ui/transactions-table';
import { AccountActivity } from '@/components/ui/account-activity';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Fetch portfolio data for calculating total value
  const { data: portfolio = [], isLoading: isPortfolioLoading } = useQuery({
    queryKey: [`/api/portfolio/${user?.id}`],
    enabled: !!user,
  });
  
  // Calculate total portfolio value and other stats
  const calculateTotalValue = () => {
    if (isPortfolioLoading || portfolio.length === 0) {
      return "$124,567.89"; // Default value when loading or no data
    }
    
    let total = 0;
    portfolio.forEach((item: any) => {
      total += parseFloat(item.amount) * parseFloat(item.asset.price);
    });
    
    return `$${total.toLocaleString()}`;
  };
  
  const portfolioValue = calculateTotalValue();
  const portfolioChange = "+5.3% ($6,321.45)";
  const availableCash = "$15,289.21";
  const activePositions = portfolio.length || 8;

  return (
    <div className="page-transition">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Account Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Monitor your portfolio, transactions, and account status</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total Portfolio Value" 
            value={portfolioValue} 
            change={portfolioChange}
            changeType="positive" 
            icon={<Wallet size={20} />}
          />
          
          <StatsCard 
            title="Available Cash" 
            value={availableCash} 
            change="Last deposit: 3 days ago" 
            icon={<TrendingUp size={20} />}
          />
          
          <StatsCard 
            title="Active Positions" 
            value={activePositions.toString()} 
            change="4 in profit, 4 in loss" 
            changeType="neutral" 
            icon={<BarChart3 size={20} />}
          />
        </div>
        
        {/* Charts and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PortfolioChart />
          </div>
          
          <div>
            <AssetDistribution />
          </div>
        </div>
        
        {/* Transactions and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionsTable />
          </div>
          
          <div>
            <AccountActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
