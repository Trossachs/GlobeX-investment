import { Asset, Portfolio, Transaction } from "@shared/schema";

// Mock Assets Data
export const mockAssets: Partial<Asset>[] = [
  {
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: "36789.21",
    percentChange: "1.2",
    marketCap: "701500000000"
  },
  {
    id: 2,
    symbol: "ETH",
    name: "Ethereum",
    price: "2456.78",
    percentChange: "0.8",
    marketCap: "295300000000"
  },
  {
    id: 3,
    symbol: "XAU",
    name: "Gold",
    price: "1856.30",
    percentChange: "-0.3",
    marketCap: "0"
  },
  {
    id: 4,
    symbol: "SOL",
    name: "Solana",
    price: "124.56",
    percentChange: "4.7",
    marketCap: "52800000000"
  },
  {
    id: 5,
    symbol: "XRP",
    name: "Ripple",
    price: "0.541",
    percentChange: "-1.1",
    marketCap: "28900000000"
  },
  {
    id: 6,
    symbol: "ADA",
    name: "Cardano",
    price: "0.382",
    percentChange: "0.4",
    marketCap: "13400000000"
  },
  {
    id: 7,
    symbol: "DOT",
    name: "Polkadot",
    price: "5.891",
    percentChange: "-0.7",
    marketCap: "7600000000"
  },
  {
    id: 8,
    symbol: "DOGE",
    name: "Dogecoin",
    price: "0.081",
    percentChange: "2.3",
    marketCap: "11500000000"
  }
];

// Mock Portfolio Data
export const mockPortfolio: Partial<Portfolio>[] = [
  {
    id: 1,
    userId: 1,
    assetId: 1,
    amount: "0.75",
  },
  {
    id: 2,
    userId: 1,
    assetId: 2,
    amount: "12.5",
  },
  {
    id: 3,
    userId: 1,
    assetId: 3,
    amount: "2.0",
  },
  {
    id: 4,
    userId: 1,
    assetId: 4,
    amount: "50.0",
  }
];

// Mock Transactions Data
export const mockTransactions: Partial<Transaction>[] = [
  {
    id: 1,
    userId: 1,
    assetId: 1,
    type: "buy",
    amount: "0.125",
    price: "36790.15",
    status: "completed",
    createdAt: new Date("2023-06-15T14:32:00")
  },
  {
    id: 2,
    userId: 1,
    assetId: 2,
    type: "sell",
    amount: "1.5",
    price: "2458.32",
    status: "completed",
    createdAt: new Date("2023-06-14T09:45:00")
  },
  {
    id: 3,
    userId: 1,
    assetId: 4,
    type: "buy",
    amount: "25",
    price: "123.45",
    status: "completed",
    createdAt: new Date("2023-06-13T16:20:00")
  },
  {
    id: 4,
    userId: 1,
    assetId: 3,
    type: "buy",
    amount: "0.5",
    price: "1857.25",
    status: "pending",
    createdAt: new Date("2023-06-12T11:10:00")
  }
];

// Mock company stats
export const companyStats = {
  assetsManaged: "$2.5B+",
  activeTraders: "125K+",
  countriesServed: "75+",
  uptimeReliability: "99.9%"
};

// Leadership team
export const leadershipTeam = [
  {
    id: 1,
    name: "Michael Chen",
    title: "Founder & CEO",
    bio: "Former VP at Goldman Sachs with 15+ years in financial markets and blockchain technology.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Chief Operating Officer",
    bio: "Previously led operations at Coinbase, bringing 10+ years of experience in scaling fintech companies.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 3,
    name: "Dr. Alex Rivera",
    title: "Chief Technology Officer",
    bio: "PhD in Computer Science from MIT, specializing in cryptography and distributed systems.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  }
];

// Company achievements
export const companyAchievements = [
  {
    id: 1,
    title: "Best Crypto Trading Platform",
    description: "Awarded by FinTech Global Awards 2022 for our innovative approach to digital asset trading.",
    icon: "award"
  },
  {
    id: 2,
    title: "ISO 27001 Certified",
    description: "Internationally recognized certification for our information security management systems.",
    icon: "shield"
  },
  {
    id: 3,
    title: "1 Million+ Active Users",
    description: "Trusted by over a million traders in 75+ countries worldwide.",
    icon: "users"
  },
  {
    id: 4,
    title: "$10B+ Trading Volume",
    description: "Monthly trading volume across all supported assets and markets.",
    icon: "trending-up"
  }
];

// FAQs
export const faqs = [
  {
    id: 1,
    question: "How do I create an account?",
    answer: "To create an account, click on the \"Sign Up\" button in the top right corner of the page. Fill out the registration form with your details, verify your email address, and complete the KYC process to start trading."
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including bank transfers (ACH, SEPA, Wire), credit/debit cards, and cryptocurrency deposits. Available methods may vary depending on your region."
  },
  {
    id: 3,
    question: "Is my investment secure?",
    answer: "We implement industry-leading security measures including 2FA, cold storage for 95% of assets, 24/7 monitoring, and regular security audits. Additionally, we maintain an insurance policy to protect against certain types of losses."
  },
  {
    id: 4,
    question: "What are the trading fees?",
    answer: "Our trading fees follow a tiered structure based on your 30-day trading volume. Maker fees range from 0.10% to 0.40%, and taker fees range from 0.15% to 0.50%. VIP clients and high-volume traders receive special rates."
  },
  {
    id: 5,
    question: "How can I withdraw my funds?",
    answer: "You can withdraw funds from your account by navigating to the \"Wallet\" section, selecting the asset you wish to withdraw, and following the withdrawal instructions. Processing times vary depending on the asset and withdrawal method."
  }
];

// Global Investors
export const globalInvestors = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    message: "Thanks to Globex, my investment grew by 32%!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    asset: "BTC"
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    location: "Tokyo, Japan",
    message: "Trading gold has diversified my portfolio.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    asset: "XAU"
  },
  {
    id: 3,
    name: "Emma Peters",
    location: "London, UK",
    message: "Love the security features for large trades.",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    asset: "ETH"
  },
  {
    id: 4,
    name: "Miguel Rodriguez",
    location: "Madrid, Spain",
    message: "Trading on mobile with ease and confidence.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    asset: "SOL"
  },
  {
    id: 5,
    name: "Ling Wei",
    location: "Singapore",
    message: "Great analytics tools for perfect timing.",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    asset: "ADA"
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    message: "Recommended to all my colleagues for trading.",
    avatar: "https://randomuser.me/api/portraits/men/92.jpg",
    asset: "BTC"
  },
  {
    id: 7,
    name: "Sophia Schmidt",
    location: "Berlin, Germany",
    message: "My Ethereum investment now funds my travels!",
    avatar: "https://randomuser.me/api/portraits/women/64.jpg",
    asset: "ETH"
  },
  {
    id: 8,
    name: "Rafael Costa",
    location: "São Paulo, Brazil",
    message: "24/7 support team helped me instantly.",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    asset: "XRP"
  }
];

// Customer Reviews (Trustpilot style)
export const customerReviews = [
  {
    id: 1,
    name: "Daniel Wilson",
    rating: 5,
    date: "August 15, 2023",
    title: "Outstanding Trading Platform",
    comment: "The most user-friendly trading platform I've ever used. The charts are excellent and the execution speed is impressive.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true
  },
  {
    id: 2,
    name: "Julia Chen",
    rating: 4,
    date: "October 3, 2023",
    title: "Great for Beginners",
    comment: "As someone new to cryptocurrency trading, I found this platform very intuitive. The educational resources are helpful.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    verified: true
  },
  {
    id: 3,
    name: "Marcus Brown",
    rating: 5,
    date: "December 12, 2023",
    title: "Exceptional Customer Service",
    comment: "Had an issue with my account and their support team resolved it within minutes. Very impressed with the response time.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    verified: true
  },
  {
    id: 4,
    name: "Olivia Taylor",
    rating: 4,
    date: "January 25, 2024",
    title: "Solid Investment Platform",
    comment: "Been using Globex for over a year now and I'm consistently impressed with their new features and security measures.",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    verified: true
  },
  {
    id: 5,
    name: "Robert Lee",
    rating: 3,
    date: "February 8, 2024",
    title: "Good but Room for Improvement",
    comment: "The platform is reliable but I'd like to see more advanced charting tools and integration options in future updates.",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    verified: true
  }
];
