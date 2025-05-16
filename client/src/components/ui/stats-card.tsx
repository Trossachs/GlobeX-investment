import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  className
}: StatsCardProps) {
  
  const getChangeColorClass = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-slate-500 dark:text-slate-400';
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-slate-500 dark:text-slate-400 text-sm">{title}</div>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        <div className="text-3xl font-bold">{value}</div>
        {change && (
          <div className={cn("text-sm mt-1", getChangeColorClass())}>
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
