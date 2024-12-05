import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
  ) {}

  async getAdminAnalytics() {
    const totalInventoryByCategory = await this.databaseService.executeQuery(`
      SELECT c.name AS category, CAST(SUM(p.quantity) AS INT) AS "totalStock" 
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
      GROUP BY c.name
    `);

    const totalPurchasesByCategory = await this.databaseService.executeQuery(`
      SELECT c.name AS category, CAST(SUM(oi.quantity) AS INT) AS "totalPurchased" 
      FROM "OrderItem" oi
      JOIN "Product" p ON oi."productId" = p.id
      JOIN "Category" c ON p."categoryId" = c.id
      GROUP BY c.name
    `);

    const totalStockValueByCategory = await this.databaseService.executeQuery(`
      SELECT c.name AS category, CAST(SUM(p.price * p.quantity) AS INT) AS "totalStockValue"
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
      GROUP BY c.name
    `);

    const totalPurchaseValueByCategory = await this.databaseService
      .executeQuery(`
      SELECT c.name AS category, CAST(SUM(oi.price * oi.quantity) AS INT) AS "totalPurchaseValue"
      FROM "OrderItem" oi
      JOIN "Product" p ON oi."productId" = p.id
      JOIN "Category" c ON p."categoryId" = c.id
      GROUP BY c.name
    `);

    const totalStock = await this.databaseService.executeQuery(
      `
      SELECT CAST(SUM(p.price * p.quantity) AS INT) AS "totalStock" FROM "Product" p
    `,
      false,
    );

    const totalSpent = await this.databaseService.executeQuery(
      `
      SELECT CAST(SUM(oi.price * oi.quantity) AS INT) AS "totalSpent" 
      FROM "OrderItem" oi
    `,
      false,
    );

    const stockAndSpendingByMonth = await this.databaseService.executeQuery(`
      SELECT to_char(p."createdAt", 'YYYY-MM') AS month, 
             CAST(SUM(p.price * p.quantity) AS INT) AS "totalStock", 
             CAST(SUM(oi.price * oi.quantity) AS INT) AS "totalSpent" 
      FROM "Product" p
      FULL OUTER JOIN "OrderItem" oi ON p.id = oi."productId"
      WHERE p."createdAt" >= NOW() - INTERVAL '12 months'
      GROUP BY to_char(p."createdAt", 'YYYY-MM')
      ORDER BY month
    `);

    const userSignUpsByMonth = await this.databaseService.executeQuery(`
      SELECT to_char(u."createdAt", 'YYYY-MM') AS month, 
             CAST(COUNT(u.id) AS INT) AS signups 
      FROM "User" u
      WHERE u."createdAt" >= NOW() - INTERVAL '12 months'
      GROUP BY to_char(u."createdAt", 'YYYY-MM')
      ORDER BY month
    `);

    return {
      ...totalStock,
      ...totalSpent,
      totalInventoryByCategory,
      totalPurchasesByCategory,
      totalStockValueByCategory,
      totalPurchaseValueByCategory,
      stockAndSpendingByMonth,
      userSignUpsByMonth,
    };
  }

  async getBuyerAnalytics(buyerId: number) {
    const valid: boolean = await this.userService.verifyBuyer(buyerId);
    if (!valid) return { message: 'Invalid Buyer ID' };

    // Fetch categories and purchase data
    const purchases = await this.databaseService.executeQuery(`
      SELECT c.name AS category, 
        CAST(COUNT(o.id) AS INT) AS "itemCount", 
        SUM(oi.price * oi.quantity) AS "totalSpent" 
      FROM "Order" o
      JOIN "OrderItem" oi ON o.id = oi."orderId"
      JOIN "Product" p ON oi."productId" = p.id
      JOIN "Category" c ON p."categoryId" = c.id
      WHERE o."userId" = ${buyerId} and 
      o.status = 'COMPLETED'
      GROUP BY c.name
    `);

    // Fetch total lifetime spending
    const totalSpent = await this.databaseService.executeQuery(
      `
      SELECT SUM(oi.price * oi.quantity) AS "totalSpent"
      FROM "Order" o
      JOIN "OrderItem" oi ON o.id = oi."orderId"
      WHERE o."userId" = ${buyerId} and 
      o.status = 'COMPLETED'
    `,
      false,
    );

    // Fetch spending by month for the last 6 months
    const spendingByMonth = await this.databaseService.executeQuery(`
      SELECT to_char(o."createdAt", 'YYYY-MM') AS month, 
             SUM(oi.price * oi.quantity) AS spending 
      FROM "Order" o
      JOIN "OrderItem" oi ON o.id = oi."orderId"
      WHERE o."userId" = ${buyerId} AND 
      o."createdAt" >= NOW() - INTERVAL '6 months' and 
      o.status = 'COMPLETED'
      GROUP BY to_char(o."createdAt", 'YYYY-MM')
      ORDER BY month
    `);

    return {
      ...totalSpent,
      categories: purchases,
      spendingByMonth,
    };
  }

  async getSellerAnalytics(sellerId: number) {
    const valid: boolean = await this.userService.verifySeller(sellerId);
    if (!valid) return { message: 'Invalid Seller ID' };

    // Fetch categories and inventory data
    const inventory = await this.databaseService.executeQuery(`
      SELECT c.name AS category, 
        CAST(COUNT(p.id) AS INT) AS "itemCount", 
        SUM(p.price * p.quantity) AS "totalWorth" 
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
      WHERE p."userId" = ${sellerId}
      GROUP BY c.name
    `);

    // Fetch total inventory worth
    const totalInventory = await this.databaseService.executeQuery(
      `
      SELECT SUM(p.price * p.quantity) AS "totalInventory" 
      FROM "Product" p
      WHERE p."userId" = ${sellerId}
    `,
      false,
    );

    // Fetch inventory by month for the last 6 months
    const inventoryByMonth = await this.databaseService.executeQuery(`
      SELECT to_char(p."createdAt", 'YYYY-MM') AS month, 
             SUM(p.price * p.quantity) AS "inventoryWorth" 
      FROM "Product" p
      WHERE p."userId" = ${sellerId} AND p."createdAt" >= NOW() - INTERVAL '6 months'
      GROUP BY to_char(p."createdAt", 'YYYY-MM')
      ORDER BY month
    `);

    return {
      ...totalInventory,
      categories: inventory,
      inventoryByMonth,
    };
  }

  async getTopProductsByRating(): Promise<TopProductByRating[]> {
    const results = await this.databaseService.executeQuery(`
      SELECT p.id, p.name, p.description, p.price, p.quantity, AVG(r.rating) AS "avgRating"
      FROM "Product" p
      JOIN "Review" r ON p.id = r."productId"
      GROUP BY p.id, p.name, p.description, p.price, p.quantity
      ORDER BY "avgRating" DESC
      LIMIT 10
    `);

    return results.map((result: any) => ({
      id: result.id,
      name: result.name,
      description: result.description,
      price: parseFloat(result.price),
      quantity: result.quantity,
      avgRating: parseFloat(result.avgRating).toFixed(2),
    })) as TopProductByRating[];
  }

  async getTopProductsByPurchases(): Promise<TopProductByPurchases[]> {
    const results = await this.databaseService.executeQuery(`
      SELECT p.id, p.name, p.description, p.price, p.quantity, SUM(oi.quantity) AS "totalPurchased"
      FROM "Product" p
      JOIN "OrderItem" oi ON p.id = oi."productId"
      GROUP BY p.id, p.name, p.description, p.price, p.quantity
      ORDER BY "totalPurchased" DESC
      LIMIT 10
    `);

    return results.map((result: any) => ({
      id: result.id,
      name: result.name,
      description: result.description,
      price: parseFloat(result.price),
      quantity: result.quantity,
      totalPurchased: parseInt(result.totalPurchased, 10),
    })) as TopProductByPurchases[];
  }
}

export interface TopProductByRating {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  avgRating: number;
}

export interface TopProductByPurchases {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalPurchased: number;
}
