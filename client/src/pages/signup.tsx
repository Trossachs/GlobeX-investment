import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { Link, useLocation } from 'wouter';
import { registerSchema } from '@shared/schema';

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

type SignupFormValues = z.infer<typeof registerSchema>;

export default function Signup() {
  const { toast } = useToast();
  const { register } = useAuth();
  const [, navigate] = useLocation();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    try {
      await register(values);
      toast({
        title: "Account created",
        description: "Welcome to Globex Investment!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not create account. Please try again.",
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
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription>
              Already registered?{" "}
              <Link href="/login">
                <a className="text-primary dark:text-primary-light hover:underline">
                  Sign in instead
                </a>
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Password (min. 6 characters)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Confirm your password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-primary dark:text-primary-light hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary dark:text-primary-light hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary-light">
                  Create Account
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
                    Or sign up with
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
