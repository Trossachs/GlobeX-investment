import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { format } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bitcoin, Brackets, CoinsIcon, Sun, Waves } from 'lucide-react';

export function TransactionsTable() {
  const { user } = useAuth();
  
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: [`/api/transactions/${user?.id}`],
    enabled: !!user,
  });

  const getAssetIcon = (symbol: string) => {
    switch (symbol) {
      case "BTC":
        return <Bitcoin className="text-yellow-500" />;
      case "ETH":
        return <Brackets className="text-blue-500" />;
      case "XAU":
        return <CoinsIcon className="text-yellow-600" />;
      case "SOL":
        return <Sun className="text-purple-500" />;
      case "XRP":
        return <Waves className="text-blue-600" />;
      default:
        return <CoinsIcon className="text-slate-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-primary">
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-primary-light divide-y divide-slate-200 dark:divide-slate-700">
              {transactions.length > 0 ? (
                transactions.map((transaction: any) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="text-xl mr-3">
                          {getAssetIcon(transaction.asset.symbol)}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.asset.name}</div>
                          <div className="text-slate-500 dark:text-slate-400 text-sm">{transaction.asset.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'buy' ? 'success' : 'destructive'}>
                        {transaction.type === 'buy' ? 'Buy' : 'Sell'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {parseFloat(transaction.amount).toFixed(4)} {transaction.asset.symbol}
                    </TableCell>
                    <TableCell className="font-mono">
                      ${parseFloat(transaction.price).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(transaction.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        transaction.status === 'completed' ? 'success' : 
                        transaction.status === 'pending' ? 'warning' : 'destructive'
                      }>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-slate-500 dark:text-slate-400">
                    {isLoading ? 'Loading transactions...' : 'No transactions found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
