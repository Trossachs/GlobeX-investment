import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { LogIn, CreditCard, Repeat, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ActivityItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

export function AccountActivity() {
  const activityItems: ActivityItem[] = [
    {
      id: 1,
      icon: <LogIn className="h-5 w-5" />,
      title: 'Login from new device',
      description: 'Today, 10:25 AM · iOS 15.4',
      iconBgColor: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    {
      id: 2,
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Deposit completed',
      description: '3 days ago · $5,000.00',
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      icon: <Repeat className="h-5 w-5" />,
      title: 'Converted BTC to ETH',
      description: '5 days ago · 0.25 BTC to 7.85 ETH',
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 4,
      icon: <Bell className="h-5 w-5" />,
      title: 'Price alert triggered',
      description: '1 week ago · BTC fell below $38,000',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {activityItems.map((item) => (
            <div key={item.id} className="px-6 py-4">
              <div className="flex items-center">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", item.iconBgColor)}>
                  <div className={item.iconColor}>{item.icon}</div>
                </div>
                <div className="ml-3">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{item.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-slate-50 dark:bg-primary text-center">
        <Button variant="link" className="mx-auto text-primary dark:text-primary">
          View All Activity
        </Button>
      </CardFooter>
    </Card>
  );
}
