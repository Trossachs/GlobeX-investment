import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Shield, 
  LineChart, 
  Globe, 
  Coins, 
  Headset, 
  Building2,
  ArrowRight
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CryptoTable } from '@/components/ui/crypto-table';
import { FeatureCard } from '@/components/ui/feature-card';
import { StatsCard } from '@/components/ui/stats-card';
import { ReviewCard, TrustpilotRating } from '@/components/ui/review-card';
import { PricingPlan } from '@/components/ui/pricing-plan';
import { useCryptoData } from '@/context/market-context';
import { customerReviews } from '@/lib/mock-data';

export default function Home() {
  const { isLoading } = useCryptoData();

  const stats = [
    { title: "Assets Managed", value: "$2.5B+" },
    { title: "Active Traders", value: "125K+" },
    { title: "Countries Served", value: "75+" },
    { title: "Uptime Reliability", value: "99.9%" }
  ];
  
  const investmentPlans = [
    {
      name: "Basic",
      description: "Perfect for new investors",
      price: "$300K",
      roi: "1.5% Monthly",
      popular: false,
      features: [
        { text: "Monthly withdrawals", included: true },
        { text: "Basic trading tools", included: true },
        { text: "Email support", included: true },
        { text: "Portfolio diversification", included: true },
        { text: "Dedicated account manager", included: false },
        { text: "Advanced analytics", included: false },
      ]
    },
    {
      name: "Silver",
      description: "For serious traders",
      price: "$500K",
      roi: "2.0% Monthly",
      popular: true,
      features: [
        { text: "Monthly withdrawals", included: true },
        { text: "Advanced trading tools", included: true },
        { text: "Priority email & phone support", included: true },
        { text: "Portfolio diversification", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Advanced analytics", included: false },
      ]
    },
    {
      name: "Gold",
      description: "Premium investment experience",
      price: "$1.5M",
      roi: "2.5% Monthly",
      popular: false,
      features: [
        { text: "Monthly withdrawals", included: true },
        { text: "Full trading toolkit", included: true },
        { text: "24/7 premium support", included: true },
        { text: "Portfolio diversification", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Advanced analytics", included: true },
      ]
    },
    {
      name: "Platinum",
      description: "Institutional grade investing",
      price: "$10M",
      roi: "3.0% Monthly",
      popular: false,
      features: [
        { text: "Monthly withdrawals", included: true },
        { text: "Enterprise trading tools", included: true },
        { text: "24/7 VIP support", included: true },
        { text: "Custom portfolio strategy", included: true },
        { text: "Senior account manager", included: true },
        { text: "Advanced analytics & reporting", included: true },
      ]
    }
  ];

  const features = [
    {
      icon: <Shield />,
      title: "Security First",
      description: "Industry-leading security protocols with 2FA, cold storage, and 24/7 monitoring to protect your assets."
    },
    {
      icon: <LineChart />,
      title: "Advanced Trading Tools",
      description: "Professional-grade charts, technical indicators, and custom alerts to optimize your trading strategy."
    },
    {
      icon: <Globe />,
      title: "Global Accessibility",
      description: "Trade from anywhere with our responsive platform available on desktop, tablet, and mobile devices."
    },
    {
      icon: <Coins />,
      title: "Diverse Asset Classes",
      description: "Access cryptocurrencies, gold, and digital assets all from a single unified trading platform."
    },
    {
      icon: <Headset />,
      title: "24/7 Support",
      description: "Dedicated customer support team available around the clock to assist with any questions or concerns."
    },
    {
      icon: <Building2 />,
      title: "Institutional Grade",
      description: "Enterprise solutions for institutional investors with custom API access and dedicated account managers."
    }
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[60vh] bg-cover bg-center md:h-[70vh]" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/70"></div>
          <div className="container mx-auto px-6 relative h-full flex items-center">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Invest in the Future with <span className="text-secondary">Globex</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-slate-200 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Professional cryptocurrency, gold, and digital asset trading services for the modern investor.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/signup">
                  <Button className="bg-secondary hover:bg-secondary/80 text-black font-medium py-3 px-6 rounded-md transition duration-300">
                    Start Trading
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-white bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-primary py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <StatsCard 
                key={index}
                title={stat.title}
                value={stat.value}
                className="bg-slate-50 dark:bg-primary-light"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section className="py-16 bg-slate-50 dark:bg-primary-light">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Investment <span className="text-secondary">Plans</span>
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
            Choose the perfect investment plan that suits your financial goals. All plans include monthly withdrawals and expert portfolio management.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentPlans.map((plan, index) => (
              <PricingPlan
                key={index}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                roi={plan.roi}
                features={plan.features}
                popular={plan.popular}
                className="bg-white dark:bg-black"
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Need a custom investment solution? Contact our team for personalized VIP plans.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-black">
                Contact for VIP Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-secondary">Globex</span> Investment
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="bg-slate-50 dark:bg-primary-light"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Assets Section */}
      <section className="py-16 bg-white dark:bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Trading Assets</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
            </div>
          ) : (
            <>
              <CryptoTable limit={4} />
              
              <div className="mt-8 text-center">
                <Link href="/trading">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
                    View All Assets
                    <span className="ml-2">→</span>
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Animated Trader Section with Image */}
      <section className="py-20 bg-slate-50 dark:bg-black overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 md:pr-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Trading with <span className="text-secondary">Confidence</span>
              </h2>
              <p className="text-lg mb-8 text-slate-700 dark:text-slate-300">
                Our platform provides the tools, resources, and security you need to navigate the complex world of digital asset trading with confidence.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Advanced security protocols to protect your assets",
                  "Real-time market data and professional charts",
                  "Personalized portfolio management tools",
                  "24/7 customer support from trading experts"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-black" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/signup">
                <Button className="bg-secondary hover:bg-secondary/80 text-black">
                  Start Trading Now
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/20 rounded-xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="Professional trader" 
                  className="relative rounded-lg shadow-2xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Customer Reviews Section */}
      <section className="py-16 bg-white dark:bg-primary">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                What Our Customers <span className="text-secondary">Say</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Join thousands of satisfied traders who have chosen Globex Investment for their digital asset trading needs.
              </p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <TrustpilotRating averageRating={4} totalReviews={358} />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {customerReviews.slice(0, 3).map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                rating={review.rating}
                date={review.date}
                title={review.title}
                comment={review.comment}
                avatar={review.avatar}
                verified={review.verified}
                className="bg-slate-50 dark:bg-primary-light"
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-black">
              View All Reviews
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-secondary/10 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 150%, rgba(36, 16, 0, 0.8) 0%, transparent 40%)',
          backgroundSize: '120% 120%'
        }}></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your investment journey?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders worldwide and experience the future of digital asset trading with Globex Investment.
          </p>
          <Link href="/signup">
            <Button className="bg-secondary hover:bg-secondary/80 text-black font-semibold py-3 px-8 rounded-md transition duration-300 text-lg shadow-lg">
              Create Free Account
            </Button>
          </Link>
          <div className="mt-6 text-sm text-slate-400">
            Join now to access our premium investment plans
          </div>
        </div>
      </section>
    </div>
  );
}
