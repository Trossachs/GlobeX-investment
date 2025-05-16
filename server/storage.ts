import { 
  users, type User, type InsertUser,
  assets, type Asset, type InsertAsset,
  portfolios, type Portfolio, type InsertPortfolio,
  transactions, type Transaction, type InsertTransaction
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser?(id: number, data: Partial<InsertUser>): Promise<User>;
  getAllUsers?(): Promise<User[]>;
  
  // Asset operations
  getAsset(id: number): Promise<Asset | undefined>;
  getAssetBySymbol(symbol: string): Promise<Asset | undefined>;
  getAllAssets(): Promise<Asset[]>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAssetPrice(id: number, price: number, percentChange: number): Promise<Asset>;
  updateAsset?(id: number, data: Partial<InsertAsset>): Promise<Asset>;
  deleteAsset?(id: number): Promise<void>;
  
  // Portfolio operations
  getPortfolio(userId: number): Promise<Portfolio[]>;
  getPortfolioItem(userId: number, assetId: number): Promise<Portfolio | undefined>;
  createPortfolioItem(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolioAmount(id: number, amount: number): Promise<Portfolio>;
  
  // Transaction operations
  getTransactionsByUser(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getAllTransactions?(): Promise<Transaction[]>;
  
  // Admin specific operations
  getAdminUsers?(): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assets: Map<number, Asset>;
  private portfolios: Map<number, Portfolio>;
  private transactions: Map<number, Transaction>;
  currentUserId: number;
  currentAssetId: number;
  currentPortfolioId: number;
  currentTransactionId: number;

  constructor() {
    this.users = new Map();
    this.assets = new Map();
    this.portfolios = new Map();
    this.transactions = new Map();
    this.currentUserId = 1;
    this.currentAssetId = 1;
    this.currentPortfolioId = 1;
    this.currentTransactionId = 1;
    
    // Initialize with some assets
    this.initializeAssets();
  }

  private initializeAssets() {
    const initialAssets: InsertAsset[] = [
      { symbol: "BTC", name: "Bitcoin", price: "36789.21", percentChange: "1.2", marketCap: "701500000000" },
      { symbol: "ETH", name: "Ethereum", price: "2456.78", percentChange: "0.8", marketCap: "295300000000" },
      { symbol: "XAU", name: "Gold", price: "1856.30", percentChange: "-0.3", marketCap: "0" },
      { symbol: "SOL", name: "Solana", price: "124.56", percentChange: "4.7", marketCap: "52800000000" },
      { symbol: "XRP", name: "Ripple", price: "0.541", percentChange: "-1.1", marketCap: "28900000000" },
      { symbol: "ADA", name: "Cardano", price: "0.382", percentChange: "0.4", marketCap: "13400000000" },
      { symbol: "DOT", name: "Polkadot", price: "5.891", percentChange: "-0.7", marketCap: "7600000000" },
      { symbol: "DOGE", name: "Dogecoin", price: "0.081", percentChange: "2.3", marketCap: "11500000000" }
    ];
    
    initialAssets.forEach(asset => {
      this.createAsset(asset);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Asset methods
  async getAsset(id: number): Promise<Asset | undefined> {
    return this.assets.get(id);
  }

  async getAssetBySymbol(symbol: string): Promise<Asset | undefined> {
    return Array.from(this.assets.values()).find(
      (asset) => asset.symbol === symbol,
    );
  }

  async getAllAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = this.currentAssetId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const asset: Asset = { ...insertAsset, id, createdAt, updatedAt };
    this.assets.set(id, asset);
    return asset;
  }

  async updateAssetPrice(id: number, price: number, percentChange: number): Promise<Asset> {
    const asset = this.assets.get(id);
    if (!asset) {
      throw new Error(`Asset with id ${id} not found`);
    }
    
    const updatedAsset: Asset = {
      ...asset,
      price: price.toString(),
      percentChange: percentChange.toString(),
      updatedAt: new Date()
    };
    
    this.assets.set(id, updatedAsset);
    return updatedAsset;
  }

  // Portfolio methods
  async getPortfolio(userId: number): Promise<Portfolio[]> {
    return Array.from(this.portfolios.values()).filter(
      (portfolio) => portfolio.userId === userId,
    );
  }

  async getPortfolioItem(userId: number, assetId: number): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(
      (portfolio) => portfolio.userId === userId && portfolio.assetId === assetId,
    );
  }

  async createPortfolioItem(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = this.currentPortfolioId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const portfolio: Portfolio = { ...insertPortfolio, id, createdAt, updatedAt };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async updatePortfolioAmount(id: number, amount: number): Promise<Portfolio> {
    const portfolio = this.portfolios.get(id);
    if (!portfolio) {
      throw new Error(`Portfolio item with id ${id} not found`);
    }
    
    const updatedPortfolio: Portfolio = {
      ...portfolio,
      amount: amount.toString(),
      updatedAt: new Date()
    };
    
    this.portfolios.set(id, updatedPortfolio);
    return updatedPortfolio;
  }

  // Transaction methods
  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Sort by newest first
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const createdAt = new Date();
    const transaction: Transaction = { ...insertTransaction, id, createdAt };
    this.transactions.set(id, transaction);
    return transaction;
  }
}

import { DatabaseStorage } from './storage.db';

// Use Memory Storage for development or Database Storage for production
// export const storage = new MemStorage();
export const storage = new DatabaseStorage();
