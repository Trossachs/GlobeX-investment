import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { Link, useLocation } from 'wouter';
import { loginSchema } from '@shared/schema';

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import { Lock } from 'lucide-react';

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginProps {
  redirectTo?: string;
}

export default function Login({ redirectTo = '/' }: LoginProps) {
  const { toast } = useToast();
  const { login } = useAuth();
  const [, navigate] = useLocation();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values.username, values.password);
      toast({
        title: "Login successful",
        description: "Welcome back to Globex Investment.",
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid username or password",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="page-transition">
      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <span className="text-secondary font-bold text-3xl tracking-tight">GLOBEX</span>
              <span className="text-primary dark:text-primary-light ml-1 font-light text-2xl">INVESTMENT</span>
            </div>
            <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
            <CardDescription>
              Or{" "}
              <Link href="/signup">
                <a className="text-primary dark:text-primary-light hover:underline">
                  create a new account
                </a>
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link href="#">
                          <a className="text-sm text-primary dark:text-primary-light hover:underline">
                            Forgot password?
                          </a>
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary-light">
                  <Lock className="mr-2 h-4 w-4" /> Sign in
                </Button>
              </form>
            </Form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button variant="outline" className="w-full">
                  <FaGoogle className="mr-2 h-4 w-4" />
                  <span className="sr-only">Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <FaApple className="mr-2 h-4 w-4" />
                  <span className="sr-only">Apple</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <FaFacebook className="mr-2 h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
