import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlanProps {
  name: string;
  description: string;
  price: string;
  roi: string;
  features: PricingFeature[];
  popular?: boolean;
  className?: string;
  withdrawal?: string;
}

export function PricingPlan({
  name,
  description,
  price,
  roi,
  features,
  popular = false,
  withdrawal = "Monthly",
  className,
}: PricingPlanProps) {
  const [, navigate] = useLocation();
  
  return (
    <motion.div
      className={cn(
        "flex flex-col h-full rounded-lg shadow-lg overflow-hidden",
        popular ? "border-2 border-secondary" : "border border-slate-200 dark:border-slate-800",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="px-6 py-8 bg-white dark:bg-black text-center">
        {popular && (
          <div className="px-3 py-1 text-xs font-semibold text-black bg-secondary rounded-full inline-block mb-4">
            Most Popular
          </div>
        )}
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-slate-500 dark:text-slate-400">/ minimum</span>
        </div>
        <div className="bg-slate-50 dark:bg-zinc-900 -mx-6 p-4 mb-6">
          <div className="flex items-center justify-center mb-1">
            <span className="text-lg font-semibold mr-2">ROI:</span>
            <span className="text-2xl font-bold text-secondary">{roi}</span>
          </div>
          <div className="text-xs text-slate-500">
            Monthly withdrawal available
          </div>
        </div>
        <Button 
          className={cn(
            "w-full",
            popular 
              ? "bg-secondary hover:bg-secondary/90 text-black" 
              : "bg-slate-900 hover:bg-black text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black"
          )}
          onClick={() => navigate('/login')}
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex-grow px-6 py-6 bg-slate-50 dark:bg-zinc-900">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li 
              key={i} 
              className="flex items-start"
            >
              <div className={cn(
                "rounded-full p-1 flex-shrink-0 mr-2 mt-0.5",
                feature.included 
                  ? "bg-green-100 dark:bg-green-900" 
                  : "bg-slate-100 dark:bg-slate-800"
              )}>
                <Check 
                  className={cn(
                    "h-3 w-3",
                    feature.included 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-slate-400 dark:text-slate-600"
                  )} 
                />
              </div>
              <span className={cn(
                "text-sm",
                !feature.included && "text-slate-400 dark:text-slate-600 line-through"
              )}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4 bg-white dark:bg-black border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-center text-slate-500">
          {withdrawal} withdrawals • Premium support
        </div>
      </div>
    </motion.div>
  );
}