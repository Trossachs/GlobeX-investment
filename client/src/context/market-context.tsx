import React, { createContext, useContext, useState, useEffect } from 'react';
import { Asset } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

interface MarketContextType {
  assets: Asset[];
  selectedAsset: Asset | null;
  isLoading: boolean;
  error: Error | null;
  selectAsset: (symbol: string) => void;
}

const MarketContext = createContext<MarketContextType>({
  assets: [],
  selectedAsset: null,
  isLoading: true,
  error: null,
  selectAsset: () => {}
});

interface MarketProviderProps {
  children: React.ReactNode;
}

export const MarketProvider: React.FC<MarketProviderProps> = ({ children }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  // Fetch all assets
  const { data: assets = [], isLoading, error } = useQuery({
    queryKey: ['/api/assets'],
    refetchInterval: 30000, // Refetch every 30 seconds to simulate real-time updates
  });
  
  // Select an asset by symbol
  const selectAsset = (symbol: string) => {
    const asset = assets.find((a: Asset) => a.symbol === symbol);
    if (asset) {
      setSelectedAsset(asset);
    }
  };
  
  // Set default selected asset when assets are loaded
  useEffect(() => {
    if (assets.length > 0 && !selectedAsset) {
      setSelectedAsset(assets[0]);
    }
  }, [assets, selectedAsset]);
  
  return (
    <MarketContext.Provider
      value={{
        assets,
        selectedAsset,
        isLoading,
        error,
        selectAsset
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useCryptoData = () => useContext(MarketContext);
