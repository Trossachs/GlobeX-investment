import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import adminRoutes from "./admin";
import { 
  insertUserSchema, 
  loginSchema, 
  registerSchema,
  tradeSchema
} from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API base path
  const API_BASE = "/api";

  // Auth routes
  app.post(`${API_BASE}/auth/register`, async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Create user (omitting confirmPassword)
      const { confirmPassword, ...userData } = data;
      const user = await storage.createUser(userData);
      
      // Return user (excluding password)
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(`${API_BASE}/auth/login`, async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Return user (excluding password)
      const { password: _, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Asset routes
  app.get(`${API_BASE}/assets`, async (_req, res) => {
    try {
      const assets = await storage.getAllAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(`${API_BASE}/assets/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }
      
      const asset = await storage.getAsset(id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      
      res.json(asset);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Portfolio routes
  app.get(`${API_BASE}/portfolio/:userId`, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      // Check if user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const portfolio = await storage.getPortfolio(userId);
      
      // Fetch asset details for each portfolio item
      const portfolioWithAssets = await Promise.all(
        portfolio.map(async (item) => {
          const asset = await storage.getAsset(item.assetId);
          return {
            ...item,
            asset
          };
        })
      );
      
      res.json(portfolioWithAssets);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Transaction routes
  app.get(`${API_BASE}/transactions/:userId`, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      // Check if user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const transactions = await storage.getTransactionsByUser(userId);
      
      // Fetch asset details for each transaction
      const transactionsWithAssets = await Promise.all(
        transactions.map(async (transaction) => {
          const asset = await storage.getAsset(transaction.assetId);
          return {
            ...transaction,
            asset
          };
        })
      );
      
      res.json(transactionsWithAssets);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Trading route
  app.post(`${API_BASE}/trade`, async (req, res) => {
    try {
      const tradeData = tradeSchema.parse(req.body);
      const { assetId, type, amount, orderType } = tradeData;
      
      // Get user ID from request (in a real app, this would come from authenticated session)
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      // Check if user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if asset exists
      const asset = await storage.getAsset(assetId);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      
      // Create a transaction
      const transaction = await storage.createTransaction({
        userId,
        assetId,
        type,
        amount,
        price: asset.price,
        status: "completed"
      });
      
      // Update portfolio
      const existingPortfolioItem = await storage.getPortfolioItem(userId, assetId);
      const amountValue = parseFloat(amount);
      
      if (existingPortfolioItem) {
        // Update existing portfolio item
        const currentAmount = parseFloat(existingPortfolioItem.amount);
        let newAmount = currentAmount;
        
        if (type === "buy") {
          newAmount += amountValue;
        } else {
          newAmount -= amountValue;
          if (newAmount < 0) {
            return res.status(400).json({ message: "Insufficient assets for sell order" });
          }
        }
        
        await storage.updatePortfolioAmount(existingPortfolioItem.id, newAmount);
      } else if (type === "buy") {
        // Create new portfolio item for buys
        await storage.createPortfolioItem({
          userId,
          assetId,
          amount
        });
      } else {
        return res.status(400).json({ message: "Cannot sell asset not in portfolio" });
      }
      
      // Return transaction with asset details
      res.status(201).json({
        ...transaction,
        asset
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Register admin routes
  app.use(`${API_BASE}/admin`, adminRoutes);

  const httpServer = createServer(app);
  return httpServer;
}
