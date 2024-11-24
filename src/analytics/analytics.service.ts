import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
  ) {}

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
      WHERE o."userId" = ${buyerId}
      GROUP BY c.name
    `);

    // Fetch total lifetime spending
    const lifetimeSpent = await this.databaseService.executeQuery(
      `
      SELECT SUM(oi.price * oi.quantity) AS "lifetimeSpent"
      FROM "Order" o
      JOIN "OrderItem" oi ON o.id = oi."orderId"
      WHERE o."userId" = ${buyerId}
    `,
      false,
    );

    // Fetch spending by month for the last 6 months
    const spendingByMonth = await this.databaseService.executeQuery(`
      SELECT to_char(o."createdAt", 'YYYY-MM') AS month, 
             SUM(oi.price * oi.quantity) AS spending 
      FROM "Order" o
      JOIN "OrderItem" oi ON o.id = oi."orderId"
      WHERE o."userId" = ${buyerId} AND o."createdAt" >= NOW() - INTERVAL '6 months'
      GROUP BY to_char(o."createdAt", 'YYYY-MM')
      ORDER BY month
    `);

    return {
      ...lifetimeSpent,
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
}
