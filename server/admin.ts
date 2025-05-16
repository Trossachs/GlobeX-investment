import express, { Request, Response } from 'express';
import { storage } from './storage';
import { count, eq, and, asc, desc, sql, gte } from 'drizzle-orm';
import { hash } from 'bcrypt';
import { db } from './db';
import {
  users,
  assets,
  transactions,
  insertUserSchema,
  insertAssetSchema,
} from '@shared/schema';
import { z } from 'zod';

const router = express.Router();

// Middleware to check admin role
const isAdmin = async (req: Request, res: Response, next: any) => {
  try {
    // For now, we're using a simpler approach to check admin status
    // In the future, this can be enhanced with proper session management
    const userId = req.headers['user-id'] as string;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Missing user-id header' });
    }
    
    const user = await storage.getUser(Number(userId));
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Apply admin middleware to all routes
router.use(isAdmin);

// User management
router.get('/users', async (req: Request, res: Response) => {
  try {
    if (storage.getAllUsers) {
      const users = await storage.getAllUsers();
      res.json(users);
    } else {
      res.status(501).json({ message: 'Not implemented' });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/users', async (req: Request, res: Response) => {
  try {
    const parsedUser = insertUserSchema.parse(req.body);
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await hash(parsedUser.password, saltRounds);
    
    const user = await storage.createUser({
      ...parsedUser, 
      password: hashedPassword
    });
    
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Only update allowed fields
    const allowedFields = ['username', 'email', 'fullName', 'isAdmin'];
    const updateData: any = {};
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });
    
    // Hash password if provided
    if (req.body.password) {
      const saltRounds = 10;
      updateData.password = await hash(req.body.password, saltRounds);
    }
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid update fields provided' });
    }
    
    if (storage.updateUser) {
      const user = await storage.updateUser(userId, updateData);
      res.json(user);
    } else {
      res.status(501).json({ message: 'User update not implemented' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    // Check if user exists
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user (not implemented in IStorage interface yet)
    await db.delete(users).where(eq(users.id, userId));
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Asset management
router.get('/assets', async (req: Request, res: Response) => {
  try {
    const allAssets = await storage.getAllAssets();
    res.json(allAssets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/assets', async (req: Request, res: Response) => {
  try {
    const parsedAsset = insertAssetSchema.parse(req.body);
    const asset = await storage.createAsset(parsedAsset);
    res.status(201).json(asset);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    console.error('Error creating asset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/assets/:id', async (req: Request, res: Response) => {
  try {
    const assetId = parseInt(req.params.id);
    if (isNaN(assetId)) {
      return res.status(400).json({ message: 'Invalid asset ID' });
    }
    
    // Only update allowed fields
    const allowedFields = ['symbol', 'name', 'price', 'percentChange', 'marketCap'];
    const updateData: any = {};
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid update fields provided' });
    }
    
    if (storage.updateAsset) {
      const asset = await storage.updateAsset(assetId, updateData);
      res.json(asset);
    } else {
      res.status(501).json({ message: 'Asset update not implemented' });
    }
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/assets/:id', async (req: Request, res: Response) => {
  try {
    const assetId = parseInt(req.params.id);
    if (isNaN(assetId)) {
      return res.status(400).json({ message: 'Invalid asset ID' });
    }
    
    if (storage.deleteAsset) {
      await storage.deleteAsset(assetId);
      res.json({ message: 'Asset deleted successfully' });
    } else {
      // Fallback to direct db operation
      await db.delete(assets).where(eq(assets.id, assetId));
      res.json({ message: 'Asset deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Transaction management
router.get('/transactions', async (req: Request, res: Response) => {
  try {
    if (storage.getAllTransactions) {
      const transactions = await storage.getAllTransactions();
      res.json(transactions);
    } else {
      // Fallback to db operation
      const allTransactions = await db.select().from(transactions);
      res.json(allTransactions);
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Dashboard stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    // User stats
    const [[userCount], [adminCount]] = await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(users).where(eq(users.isAdmin, true))
    ]);
    
    // New users in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [newUserCount] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, sevenDaysAgo));
    
    // Transaction stats
    const [[transactionCount], [buyCount], [sellCount]] = await Promise.all([
      db.select({ count: count() }).from(transactions),
      db.select({ count: count() }).from(transactions).where(eq(transactions.type, 'buy')),
      db.select({ count: count() }).from(transactions).where(eq(transactions.type, 'sell'))
    ]);
    
    // Asset stats
    const [[assetCount]] = await Promise.all([
      db.select({ count: count() }).from(assets)
    ]);
    
    // Calculate total market cap
    const allAssets = await db.select().from(assets);
    const totalMarketCap = allAssets.reduce((acc, asset) => {
      return acc + (asset.marketCap ? parseFloat(asset.marketCap) : 0);
    }, 0);
    
    // Most traded asset (simplified)
    let mostTradedAsset = '-';
    if (allAssets.length > 0) {
      const assetTxCounts = await db
        .select({
          assetId: transactions.assetId,
          count: count(),
        })
        .from(transactions)
        .groupBy(transactions.assetId)
        .orderBy(desc(sql`count`))
        .limit(1);
      
      if (assetTxCounts.length > 0) {
        const mostActiveAssetId = assetTxCounts[0].assetId;
        const mostActiveAsset = await db
          .select()
          .from(assets)
          .where(eq(assets.id, mostActiveAssetId))
          .limit(1);
        
        if (mostActiveAsset.length > 0) {
          mostTradedAsset = `${mostActiveAsset[0].name} (${mostActiveAsset[0].symbol})`;
        }
      }
    }
    
    res.json({
      userCount: userCount.count,
      adminCount: adminCount.count,
      newUserCount: newUserCount.count,
      transactionCount: transactionCount.count,
      buyCount: buyCount.count,
      sellCount: sellCount.count,
      assetCount: assetCount.count,
      totalMarketCap: totalMarketCap.toString(),
      mostTradedAsset
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;