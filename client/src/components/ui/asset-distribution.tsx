import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';

interface AssetDistributionItem {
  name: string;
  symbol: string;
  percentage: number;
  color: string;
}

export function AssetDistribution() {
  const { user } = useAuth();
  
  const { data: portfolio = [], isLoading } = useQuery({
    queryKey: [`/api/portfolio/${user?.id}`],
    enabled: !!user,
  });
  
  // When no real data or loading, show mock distribution
  const getAssetDistribution = (): AssetDistributionItem[] => {
    if (!user || isLoading || portfolio.length === 0) {
      return [
        { name: 'Bitcoin', symbol: 'BTC', percentage: 45, color: 'bg-yellow-500' },
        { name: 'Ethereum', symbol: 'ETH', percentage: 30, color: 'bg-blue-500' },
        { name: 'Gold', symbol: 'XAU', percentage: 15, color: 'bg-yellow-600' },
        { name: 'Solana', symbol: 'SOL', percentage: 7, color: 'bg-purple-500' },
        { name: 'Others', symbol: 'OTHER', percentage: 3, color: 'bg-slate-500' }
      ];
    }
    
    // Calculate total portfolio value
    let totalValue = 0;
    portfolio.forEach((item: any) => {
      totalValue += parseFloat(item.amount) * parseFloat(item.asset.price);
    });
    
    // Calculate percentages
    const distribution = portfolio.map((item: any) => {
      const itemValue = parseFloat(item.amount) * parseFloat(item.asset.price);
      const percentage = (itemValue / totalValue) * 100;
      
      let color = 'bg-blue-500';
      switch (item.asset.symbol) {
        case 'BTC': color = 'bg-yellow-500'; break;
        case 'ETH': color = 'bg-blue-500'; break;
        case 'XAU': color = 'bg-yellow-600'; break;
        case 'SOL': color = 'bg-purple-500'; break;
        case 'XRP': color = 'bg-blue-600'; break;
        default: color = 'bg-slate-500';
      }
      
      return {
        name: item.asset.name,
        symbol: item.asset.symbol,
        percentage: Math.round(percentage),
        color
      };
    });
    
    return distribution;
  };

  const distribution = getAssetDistribution();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {distribution.map((asset) => (
          <div key={asset.symbol}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{asset.name} ({asset.symbol})</span>
              <span className="text-sm font-medium">{asset.percentage}%</span>
            </div>
            <Progress value={asset.percentage} className={`h-2 ${asset.color}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
