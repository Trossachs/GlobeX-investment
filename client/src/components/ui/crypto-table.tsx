import React from "react";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCryptoData } from "@/context/market-context";
import { Asset } from "@shared/schema";

import { Bitcoin, Brackets, CoinsIcon, Sun, Waves } from "lucide-react";

interface CryptoTableProps {
  limit?: number;
  showAction?: boolean;
}

export function CryptoTable({ limit, showAction = true }: CryptoTableProps) {
  const { assets } = useCryptoData();
  
  const displayAssets = limit ? assets.slice(0, limit) : assets;

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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-primary-light">
          <TableRow>
            <TableHead className="text-left">Asset</TableHead>
            <TableHead className="text-left">Price</TableHead>
            <TableHead className="text-left">24h Change</TableHead>
            <TableHead className="text-left">Market Cap</TableHead>
            {showAction && <TableHead className="text-left">Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white dark:bg-primary divide-y divide-slate-200 dark:divide-slate-700">
          {displayAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>
                <div className="flex items-center">
                  <div className="text-xl mr-3">
                    {getAssetIcon(asset.symbol)}
                  </div>
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">{asset.symbol}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono">${parseFloat(asset.price).toLocaleString()}</TableCell>
              <TableCell className={parseFloat(asset.percentChange) >= 0 ? "text-green-500" : "text-red-500"}>
                {parseFloat(asset.percentChange) >= 0 ? '+' : ''}{asset.percentChange}%
              </TableCell>
              <TableCell>
                {asset.marketCap && parseFloat(asset.marketCap) > 0 
                  ? `$${(parseFloat(asset.marketCap) / 1000000000).toFixed(1)}B` 
                  : "N/A"}
              </TableCell>
              {showAction && (
                <TableCell>
                  <Link href="/trading">
                    <Button variant="link" className="text-primary dark:text-primary">
                      Trade
                    </Button>
                  </Link>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
