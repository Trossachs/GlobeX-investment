import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { Asset } from '@shared/schema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  assetId: z.number(),
  type: z.enum(['buy', 'sell']),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  orderType: z.enum(['market', 'limit', 'stop']),
  limitPrice: z.string().optional(),
  stopPrice: z.string().optional(),
});

type TradeFormValues = z.infer<typeof formSchema>;

interface TradeFormProps {
  asset: Asset;
}

export function TradeForm({ asset }: TradeFormProps) {
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<TradeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: asset.id,
      type: 'buy',
      amount: '',
      orderType: 'market',
      limitPrice: '',
      stopPrice: '',
    },
  });

  const tradeMutation = useMutation({
    mutationFn: (data: TradeFormValues) => {
      return apiRequest('POST', '/api/trade', { ...data, userId: user?.id });
    },
    onSuccess: () => {
      toast({
        title: 'Trade executed',
        description: `Successfully ${orderSide === 'buy' ? 'bought' : 'sold'} ${asset.symbol}`,
      });
      form.reset({
        assetId: asset.id,
        type: orderSide,
        amount: '',
        orderType: 'market',
        limitPrice: '',
        stopPrice: '',
      });
      queryClient.invalidateQueries({ queryKey: [`/api/portfolio/${user?.id}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/transactions/${user?.id}`] });
    },
    onError: (error) => {
      toast({
        title: 'Trade failed',
        description: error.message || 'Failed to execute trade. Please try again.',
        variant: 'destructive',
      });
    },
  });

  function onSubmit(values: TradeFormValues) {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to trade',
        variant: 'destructive',
      });
      return;
    }
    
    tradeMutation.mutate(values);
  }

  // Handle tab change to update form type
  const handleTabChange = (value: string) => {
    setOrderSide(value as 'buy' | 'sell');
    form.setValue('type', value as 'buy' | 'sell');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <Tabs defaultValue="buy" onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Buy</TabsTrigger>
                  <TabsTrigger value="sell" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <FormField
              control={form.control}
              name="orderType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select order type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-500">$</span>
                      </div>
                      <Input {...field} placeholder="0.00" className="pl-8" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('orderType') === 'limit' && (
              <FormField
                control={form.control}
                name="limitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limit Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-slate-500">$</span>
                        </div>
                        <Input {...field} placeholder="0.00" className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.watch('orderType') === 'stop' && (
              <FormField
                control={form.control}
                name="stopPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stop Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-slate-500">$</span>
                        </div>
                        <Input {...field} placeholder="0.00" className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button 
              type="submit" 
              className={`w-full ${orderSide === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
              disabled={tradeMutation.isPending}
            >
              {tradeMutation.isPending ? 'Processing...' : `${orderSide === 'buy' ? 'Buy' : 'Sell'} ${asset.symbol}`}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
