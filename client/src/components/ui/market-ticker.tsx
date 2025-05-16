import React from 'react';
import { useCryptoData } from '@/context/market-context';

export function MarketTicker() {
  const { assets } = useCryptoData();

  return (
    <div className="bg-black text-white border-t border-zinc-800">
      <div className="ticker-scroll py-2 px-4 border-b border-zinc-800">
        <div className="ticker-content">
          {assets.map((asset) => (
            <span key={asset.symbol} className="inline-block mx-4">
              <span className="text-secondary font-semibold">{asset.symbol}</span>{' '}
              <span className="font-medium">${parseFloat(asset.price).toLocaleString()}</span>{' '}
              <span className={parseFloat(asset.percentChange) >= 0 ? "text-green-500" : "text-red-500"}>
                {parseFloat(asset.percentChange) >= 0 ? '+' : ''}{asset.percentChange}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
