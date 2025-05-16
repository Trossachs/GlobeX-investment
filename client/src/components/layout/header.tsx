import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme-provider';
import { useAuth } from '@/context/auth-context';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarketTicker } from '@/components/ui/market-ticker';
import { apiRequest } from '@/lib/queryClient';
import logoImage from '@/assets/logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isLoading, setUser } = useAuth();
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      setUser(null);
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Trading', path: '/trading' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full z-50">
      <nav className="bg-white dark:bg-black fixed w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <div className="flex items-center cursor-pointer">
                    <img src={logoImage} alt="Globex Investment" className="h-10 w-auto mr-2" />
                  </div>
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-6">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <div className={cn(
                      "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 cursor-pointer",
                      location === item.path 
                        ? "text-secondary border-b-2 border-secondary" 
                        : "text-black dark:text-white hover:text-secondary"
                    )}>
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="mr-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              
              <div className="hidden md:ml-4 md:flex md:items-center">
                {!isLoading && (
                  !user ? (
                    <>
                      <Link href="/login">
                        <div>
                          <Button variant="ghost" className="text-sm font-medium text-black dark:text-white hover:text-secondary">
                            Login
                          </Button>
                        </div>
                      </Link>
                      <Link href="/signup">
                        <div>
                          <Button className="ml-3 bg-secondary hover:bg-secondary/80 text-black font-medium">
                            Sign up
                          </Button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="mr-4 text-sm text-black dark:text-white">Welcome, {user.username}</span>
                      <Button variant="outline" onClick={handleLogout} className="border-secondary text-secondary hover:bg-secondary hover:text-black">
                        Logout
                      </Button>
                    </>
                  )
                )}
              </div>
              
              <div className="md:hidden flex items-center ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-black">
            <div className="pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div
                    className={cn(
                      "block pl-3 pr-4 py-2 text-base font-medium cursor-pointer",
                      location === item.path
                        ? "bg-secondary text-black font-semibold"
                        : "text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 pb-2 flex justify-between px-3">
                {!isLoading && (
                  !user ? (
                    <>
                      <Link href="/login">
                        <div className="block text-base font-medium text-black dark:text-white hover:text-secondary cursor-pointer" onClick={() => setIsOpen(false)}>
                          Login
                        </div>
                      </Link>
                      <Link href="/signup">
                        <div className="block text-base font-medium text-secondary hover:text-secondary/80 cursor-pointer" onClick={() => setIsOpen(false)}>
                          Sign up
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full border-secondary text-secondary hover:bg-secondary hover:text-black" 
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <MarketTicker />
    </header>
  );
}
