import { db } from './db';
import { hash } from 'bcrypt';
import {
  users,
  assets,
  portfolios,
  transactions,
} from '@shared/schema';

/**
 * Initialize the database with sample data
 */
async function initDb() {
  console.log('Initializing database...');

  try {
    // Check if tables exist and have data
    const [userCount] = await db.select({ count: db.fn.count() }).from(users);
    const [assetCount] = await db.select({ count: db.fn.count() }).from(assets);

    console.log(`Found ${userCount.count} users and ${assetCount.count} assets in database.`);

    // If users exist, don't initialize
    if (Number(userCount.count) > 0) {
      console.log('Database already initialized, skipping...');
      return;
    }

    // Create admin user
    const password = await hash('admin123', 10);
    const [adminUser] = await db.insert(users).values({
      username: 'admin',
      password,
      email: 'admin@globexinvestments.com',
      fullName: 'Admin User',
      isAdmin: true,
    }).returning();

    console.log(`Created admin user with ID: ${adminUser.id}`);

    // Create sample assets
    const sampleAssets = [
      { symbol: "BTC", name: "Bitcoin", price: "36789.21", percentChange: "1.2", marketCap: "701500000000" },
      { symbol: "ETH", name: "Ethereum", price: "2456.78", percentChange: "0.8", marketCap: "295300000000" },
      { symbol: "XAU", name: "Gold", price: "1856.30", percentChange: "-0.3", marketCap: "0" },
      { symbol: "SOL", name: "Solana", price: "124.56", percentChange: "4.7", marketCap: "52800000000" },
      { symbol: "XRP", name: "Ripple", price: "0.541", percentChange: "-1.1", marketCap: "28900000000" },
      { symbol: "ADA", name: "Cardano", price: "0.382", percentChange: "0.4", marketCap: "13400000000" },
      { symbol: "DOT", name: "Polkadot", price: "5.891", percentChange: "-0.7", marketCap: "7600000000" },
      { symbol: "DOGE", name: "Dogecoin", price: "0.081", percentChange: "2.3", marketCap: "11500000000" }
    ];

    const createdAssets = await db.insert(assets).values(sampleAssets).returning();
    console.log(`Created ${createdAssets.length} sample assets`);

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export default initDb;