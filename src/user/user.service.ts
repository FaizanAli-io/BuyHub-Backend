import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { User, Product, Review } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const authToken = this.databaseService.generateAuthToken(32);
    const createdAt = this.databaseService.getCurrentDate();
    const updatedAt = this.databaseService.getCurrentDate();

    return this.databaseService.createEntity('User', {
      ...createUserDto,
      authToken,
      createdAt,
      updatedAt,
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const users = await this.findAll();
    const { email, password } = loginUserDto;

    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (user) return user;
    else return false;
  }

  async findAll(role?: 'BUYER' | 'SELLER' | 'ADMIN'): Promise<User[]> {
    const users = await this.databaseService.findAllEntities('User');
    if (role) {
      return users.filter((user) => user.role === role);
    }
    return users;
  }

  async findOne(id: number): Promise<User | null> {
    return this.databaseService.findEntityById('User', id);
  }

  async findCartByUserId(userId: number): Promise<any[]> {
    const query: string = `SELECT * FROM "CartItem" WHERE "userId" = ${userId}`;
    const cartItems: any[] = await this.databaseService.executeQuery(query);

    for (const cartItem of cartItems) {
      const query: string = `SELECT * FROM "Product" WHERE id = ${cartItem.productId}`;
      cartItem.product = await this.databaseService.executeQuery(query, true);
    }

    return cartItems;
  }

  async findOrdersByUserId(userId: number): Promise<any[]> {
    const query: string = `SELECT * FROM "Order" WHERE "userId" = ${userId}`;
    const orders: any[] = await this.databaseService.executeQuery(query);

    for (const order of orders) {
      const query: string = `SELECT * FROM "OrderItem" WHERE "orderId" = ${order.id}`;
      order.items = await this.databaseService.executeQuery(query);
    }

    return orders;
  }

  async findProductsByUserId(userId: number): Promise<Product[]> {
    const query: string = `SELECT * FROM "Product" WHERE "userId" = ${userId}`;

    return this.databaseService.executeQuery(query);
  }

  async findReviewsByUserId(userId: number): Promise<Review[]> {
    const query: string = `SELECT * FROM "Review" WHERE "userId" = ${userId}`;

    return this.databaseService.executeQuery(query);
  }

  async dropCartByUserId(userId: number): Promise<any[]> {
    const query: string = `DELETE FROM "CartItem" WHERE "userId" = ${userId} RETURNING *`;
    const deletedCarts: any[] = await this.databaseService.executeQuery(query);

    return deletedCarts;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.databaseService.updateEntity('User', id, updateUserDto);
  }

  async remove(id: number): Promise<User | null> {
    return this.databaseService.deleteEntity('User', id);
  }
}
