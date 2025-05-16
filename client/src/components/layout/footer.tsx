import React from 'react';
import { Link } from 'wouter';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram 
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-secondary font-bold text-xl tracking-tight">GLOBEX</span>
              <span className="text-primary-light ml-1 font-light text-lg">INVESTMENT</span>
            </div>
            <p className="text-slate-300 mb-4">
              Globex Investment is a leading trading platform for cryptocurrencies, gold, and digital assets. 
              Our mission is to provide easy, secure, and professional trading services to investors worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Spot Trading</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Futures</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Margin Trading</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Savings</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">NFT Marketplace</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Institutional & VIP</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Referral Program</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Trading Bots</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Trading Rules</a></li>
              <li>
                <Link href="/contact">
                  <a className="text-slate-300 hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Fees</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Globex Investment. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
