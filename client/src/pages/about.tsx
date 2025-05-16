import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, TrendingUp } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import { leadershipTeam, companyAchievements } from '@/lib/mock-data';

export default function About() {
  return (
    <div className="page-transition">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Globex Investment</h1>
          
          <div className="mb-12">
            {/* A modern investment office with professionals in discussion */}
            <img 
              src="https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Globex Investment team meeting" 
              className="w-full h-auto rounded-lg shadow-md mb-6"
            />
            
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              Globex Investment is dedicated to democratizing access to global financial markets 
              through innovative technology and trusted expertise. We aim to empower investors of 
              all levels to build wealth through transparent, secure, and intelligent trading solutions.
            </p>
            <p className="text-lg mb-4">
              Founded in {COMPANY_INFO.FOUNDED}, we've grown from a small crypto-focused startup to an 
              internationally recognized trading and investment firm specializing in Bitcoin, 
              cryptocurrencies, gold mining, and digital assets. Our platform combines cutting-edge 
              technology with institutional-grade security to deliver a premier trading experience 
              for our clients worldwide.
            </p>
            
            <div className="my-8 border-l-4 border-secondary pl-6 py-2 bg-slate-50 dark:bg-primary-light rounded">
              <p className="text-lg italic">
                "Our vision is to create a world where everyone has equal access to investment 
                opportunities, regardless of their background or financial knowledge."
              </p>
              <p className="mt-2 font-medium">— Michael Chen, Founder & CEO</p>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Our Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipTeam.map((leader) => (
                <div key={leader.id} className="text-center">
                  <img 
                    src={leader.imageUrl} 
                    alt={`${leader.name}, ${leader.title}`} 
                    className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-medium">{leader.name}</h3>
                  <p className="text-secondary mb-2">{leader.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{leader.bio}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Our Achievements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyAchievements.map((achievement) => (
                <Card key={achievement.id} className="bg-white dark:bg-primary-light">
                  <CardContent className="p-6">
                    <div className="text-secondary text-4xl mb-4">
                      {achievement.icon === 'award' && <Award />}
                      {achievement.icon === 'shield' && <Shield />}
                      {achievement.icon === 'users' && <Users />}
                      {achievement.icon === 'trending-up' && <TrendingUp />}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{achievement.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Global Presence</h2>
            
            {/* A world map or global business image */}
            <img 
              src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Globex Investment global presence" 
              className="w-full h-auto rounded-lg shadow-md mb-6"
            />
            
            <p className="text-lg mb-4">
              With offices in New York, London, Singapore, and Tokyo, Globex Investment serves 
              clients across the globe. Our diverse team of experts brings together experience 
              from traditional finance, technology, and cryptocurrency sectors to provide a 
              comprehensive trading solution that meets the needs of today's digital investors.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {COMPANY_INFO.LOCATIONS.map((location, index) => (
                <div key={index} className="px-6 py-2 bg-white dark:bg-primary-light shadow-sm rounded-full">
                  <span className="font-medium">{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
