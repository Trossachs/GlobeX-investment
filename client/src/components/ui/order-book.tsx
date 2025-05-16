import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Asset } from '@shared/schema';

interface Order {
  price: string;
  amount: string;
  total: string;
}

interface OrderBookProps {
  asset: Asset;
}

export function OrderBook({ asset }: OrderBookProps) {
  // Generate mock order book data based on current asset price
  const generateOrderBook = () => {
    const currentPrice = parseFloat(asset.price);
    const sellOrders: Order[] = [];
    const buyOrders: Order[] = [];
    
    // Generate sell orders (higher than current price)
    for (let i = 1; i <= 4; i++) {
      const price = currentPrice + (i * currentPrice * 0.001);
      const amount = (Math.random() * 2 + 0.1).toFixed(3);
      const total = (price * parseFloat(amount)).toFixed(2);
      
      sellOrders.push({
        price: price.toFixed(2),
        amount,
        total
      });
    }
    
    // Generate buy orders (lower than current price)
    for (let i = 1; i <= 4; i++) {
      const price = currentPrice - (i * currentPrice * 0.001);
      const amount = (Math.random() * 5 + 0.1).toFixed(3);
      const total = (price * parseFloat(amount)).toFixed(2);
      
      buyOrders.push({
        price: price.toFixed(2),
        amount,
        total
      });
    }
    
    return { sellOrders, buyOrders };
  };
  
  const { sellOrders, buyOrders } = generateOrderBook();
  
  // Generate recent trades
  const recentTrades = [
    {
      price: asset.price,
      amount: (Math.random() * 0.5 + 0.1).toFixed(3),
      type: 'buy',
      time: '12:45:32'
    },
    {
      price: (parseFloat(asset.price) * 1.0001).toFixed(2),
      amount: (Math.random() * 0.3 + 0.05).toFixed(3),
      type: 'sell',
      time: '12:45:28'
    },
    {
      price: (parseFloat(asset.price) * 0.9998).toFixed(2),
      amount: (Math.random() * 0.6 + 0.2).toFixed(3),
      type: 'buy',
      time: '12:45:15'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Book</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-red-500">
          <div className="flex justify-between text-xs mb-1">
            <span>Price (USD)</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
            {sellOrders.map((order, index) => (
              <div key={index} className="flex justify-between py-1">
                <span className="font-mono">{order.price}</span>
                <span>{order.amount}</span>
                <span>{order.total}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="py-2 text-center font-mono bg-slate-100 dark:bg-primary border-y border-slate-200 dark:border-slate-700">
          <span className="font-medium">{asset.price}</span>
        </div>
        
        <div className="mt-2 text-green-500">
          <div className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
            {buyOrders.map((order, index) => (
              <div key={index} className="flex justify-between py-1">
                <span className="font-mono">{order.price}</span>
                <span>{order.amount}</span>
                <span>{order.total}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Recent Trades</h4>
          <div className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
            {recentTrades.map((trade, index) => (
              <div key={index} className="flex justify-between py-1">
                <span className={`${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'} font-mono`}>
                  {trade.price}
                </span>
                <span>{trade.amount}</span>
                <span className="text-slate-500 dark:text-slate-400">{trade.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
