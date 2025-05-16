import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { COMPANY_INFO } from '@/lib/constants';
import { faqs } from '@/lib/mock-data';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle
} from 'lucide-react';
import { 
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from 'react-icons/fa';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    // In a real app, this would send the form data to a backend API
    console.log(values);
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We'll respond to your inquiry as soon as possible.",
    });
    setFormSubmitted(true);
  }
  
  const resetForm = () => {
    form.reset();
    setFormSubmitted(false);
  };

  return (
    <div className="page-transition">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-lg mb-6">
                Have questions about trading with Globex Investment? Our team is here to help. 
                Reach out to us through the form or using our contact information below.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                    <MapPin />
                  </div>
                  <div>
                    <h3 className="font-medium">Headquarters</h3>
                    <p className="text-slate-600 dark:text-slate-400">{COMPANY_INFO.HEADQUARTERS}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                    <Phone />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-slate-600 dark:text-slate-400">{COMPANY_INFO.PHONE.GENERAL} (General)</p>
                    <p className="text-slate-600 dark:text-slate-400">{COMPANY_INFO.PHONE.SUPPORT} (Trading Support)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                    <Mail />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-slate-600 dark:text-slate-400">{COMPANY_INFO.EMAIL.INFO}</p>
                    <p className="text-slate-600 dark:text-slate-400">{COMPANY_INFO.EMAIL.SUPPORT}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                    <Clock />
                  </div>
                  <div>
                    <h3 className="font-medium">Hours of Operation</h3>
                    <p className="text-slate-600 dark:text-slate-400">24/7 Trading Platform Access</p>
                    <p className="text-slate-600 dark:text-slate-400">Support: Mon-Fri, 9am-5pm (EST)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href={COMPANY_INFO.SOCIAL.FACEBOOK} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <FaFacebookF />
                  </a>
                  <a href={COMPANY_INFO.SOCIAL.TWITTER} className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <FaTwitter />
                  </a>
                  <a href={COMPANY_INFO.SOCIAL.LINKEDIN} className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <FaLinkedinIn />
                  </a>
                  <a href={COMPANY_INFO.SOCIAL.INSTAGRAM} className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {!formSubmitted ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Trading Question" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                rows={5} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-secondary hover:bg-secondary-light text-white"
                      >
                        Send Message
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-5xl text-green-500 mb-4">
                      <CheckCircle className="mx-auto" size={64} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Thank you for contacting us. We'll respond to your inquiry as soon as possible.
                    </p>
                    <Button 
                      variant="link" 
                      onClick={resetForm}
                      className="text-primary dark:text-primary font-medium hover:underline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
