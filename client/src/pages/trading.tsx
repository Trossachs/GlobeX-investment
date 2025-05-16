import React, { useState } from 'react';
import { useCryptoData } from '@/context/market-context';
import { TimeFrame, ChartContainer } from '@/components/ui/chart-container';
import { TradeForm } from '@/components/ui/trade-form';
import { OrderBook } from '@/components/ui/order-book';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bitcoin, Brackets, CoinsIcon, Sun, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Trading() {
  const { assets, selectedAsset, selectAsset, isLoading } = useCryptoData();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1D');

  if (isLoading || !selectedAsset) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

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

  return (
    <div className="page-transition pt-14 md:pt-20">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Asset Selection */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-0">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <h2 className="font-semibold">Market Overview</h2>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {assets.map((asset) => (
                      <div 
                        key={asset.id}
                        onClick={() => selectAsset(asset.symbol)}
                        className={cn(
                          "p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition duration-150",
                          selectedAsset.id === asset.id ? "bg-slate-100 dark:bg-primary" : ""
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="text-xl mr-3">
                              {getAssetIcon(asset.symbol)}
                            </div>
                            <div>
                              <div className="font-medium">{asset.name}</div>
                              <div className="text-slate-500 dark:text-slate-400 text-sm">{asset.symbol}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono">${parseFloat(asset.price).toLocaleString()}</div>
                            <div className={parseFloat(asset.percentChange) >= 0 ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                              {parseFloat(asset.percentChange) >= 0 ? '+' : ''}{asset.percentChange}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle & Right Columns - Chart & Trading Panel */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="border-b border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-xl mr-3">
                        {getAssetIcon(selectedAsset.symbol)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h2 className="font-bold text-lg">{selectedAsset.name}</h2>
                          <span className="ml-2 text-slate-500 dark:text-slate-400">{selectedAsset.symbol}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="font-mono">${parseFloat(selectedAsset.price).toLocaleString()}</div>
                          <div className={cn("ml-2", parseFloat(selectedAsset.percentChange) >= 0 ? "text-green-500" : "text-red-500")}>
                            {parseFloat(selectedAsset.percentChange) >= 0 ? '+' : ''}{selectedAsset.percentChange}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Tabs defaultValue={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
                        <TabsList>
                          <TabsTrigger value="1H">1H</TabsTrigger>
                          <TabsTrigger value="1D">1D</TabsTrigger>
                          <TabsTrigger value="1W">1W</TabsTrigger>
                          <TabsTrigger value="1M">1M</TabsTrigger>
                          <TabsTrigger value="1Y">1Y</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <ChartContainer asset={selectedAsset} timeFrame={timeFrame} />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TradeForm asset={selectedAsset} />
              <OrderBook asset={selectedAsset} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
