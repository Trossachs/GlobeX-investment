import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-6">
        <div className="text-secondary text-4xl mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}
