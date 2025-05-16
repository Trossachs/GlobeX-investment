// API endpoints
export const API_ROUTES = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ASSETS: '/api/assets',
  ASSET: (id: number) => `/api/assets/${id}`,
  PORTFOLIO: (userId: number) => `/api/portfolio/${userId}`,
  TRANSACTIONS: (userId: number) => `/api/transactions/${userId}`,
  TRADE: '/api/trade'
};

// Asset types with icons
export const ASSET_TYPES = {
  BTC: {
    name: 'Bitcoin',
    icon: 'bitcoin',
    color: 'text-yellow-500',
  },
  ETH: {
    name: 'Ethereum',
    icon: 'ethereum',
    color: 'text-blue-500',
  },
  XAU: {
    name: 'Gold',
    icon: 'coins',
    color: 'text-yellow-600',
  },
  SOL: {
    name: 'Solana',
    icon: 'sun',
    color: 'text-purple-500',
  },
  XRP: {
    name: 'Ripple',
    icon: 'water',
    color: 'text-blue-600',
  },
  ADA: {
    name: 'Cardano',
    icon: 'circle',
    color: 'text-blue-400',
  },
  DOT: {
    name: 'Polkadot',
    icon: 'circle-dot',
    color: 'text-pink-500',
  },
  DOGE: {
    name: 'Dogecoin',
    icon: 'paw',
    color: 'text-amber-500',
  }
};

// Page routes
export const ROUTES = {
  HOME: '/',
  TRADING: '/trading',
  DASHBOARD: '/dashboard',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
};

// Company information
export const COMPANY_INFO = {
  NAME: 'Globex Investment',
  TAGLINE: 'Your Trusted Trading Partner',
  FOUNDED: 2017,
  LOCATIONS: ['New York', 'London', 'Singapore', 'Tokyo', 'Dubai', 'Sydney'],
  HEADQUARTERS: '350 Fifth Avenue, New York, NY 10118, USA',
  PHONE: {
    GENERAL: '+1 (555) 123-4567',
    SUPPORT: '+1 (555) 987-6543',
  },
  EMAIL: {
    INFO: 'info@globexinvestment.com',
    SUPPORT: 'support@globexinvestment.com',
  },
  SOCIAL: {
    FACEBOOK: 'https://facebook.com/globexinvestment',
    TWITTER: 'https://twitter.com/globexinvestment',
    LINKEDIN: 'https://linkedin.com/company/globexinvestment',
    INSTAGRAM: 'https://instagram.com/globexinvestment',
  }
};
