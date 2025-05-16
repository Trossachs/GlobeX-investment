import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { globalInvestors } from '@/lib/mock-data';
import { ASSET_TYPES } from '@/lib/constants';

export function InvestorToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentInvestor, setCurrentInvestor] = useState(globalInvestors[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show a toast every 20 seconds
  useEffect(() => {
    // Initial delay before showing the first toast
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Set up interval for showing toasts
    const interval = setInterval(() => {
      // Hide current toast
      setIsVisible(false);
      
      // After toast is hidden, update to next investor
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % globalInvestors.length;
          setCurrentInvestor(globalInvestors[nextIndex]);
          return nextIndex;
        });
        
        // Show the new toast
        setIsVisible(true);
      }, 500);
    }, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 max-w-sm"
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="bg-white dark:bg-black rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-zinc-800 max-w-[300px]">
            <div className="p-3">
              <div className="flex justify-between mb-1">
                <Badge variant="secondary" className="px-1.5 py-0.5 bg-secondary text-black text-xs font-medium">
                  Investor
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-slate-500 dark:text-slate-400 hover:text-secondary -mr-1.5 -mt-1.5"
                  onClick={handleClose}
                >
                  <X size={12} />
                </Button>
              </div>
              
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 border border-secondary">
                  <AvatarImage src={currentInvestor.avatar} alt={currentInvestor.name} />
                  <AvatarFallback className="bg-secondary text-black text-xs">{currentInvestor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center mb-0.5">
                    <h4 className="font-semibold text-xs text-black dark:text-white">{currentInvestor.name}</h4>
                    <Badge variant="outline" className="ml-1.5 text-[10px] px-1 py-0 border-secondary text-secondary">
                      {currentInvestor.asset}
                    </Badge>
                  </div>
                  
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {currentInvestor.location}
                  </div>
                  
                  <p className="text-xs text-black dark:text-white mt-0.5">{currentInvestor.message}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-zinc-900 px-3 py-1 text-[10px] text-slate-500 flex justify-between items-center border-t border-slate-200 dark:border-zinc-800">
              <span>{new Date().toLocaleTimeString()}</span>
              <button
                className="text-secondary hover:underline text-[10px]"
                onClick={handleClose}
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}