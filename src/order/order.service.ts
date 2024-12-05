import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '@prisma/client';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly cartItemService: CartItemService,
    private readonly databaseService: DatabaseService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order | null> {
    const order: any = await this.databaseService.createEntity('Order', {
      ...createOrderDto,
      buyerConfirmed: false,
      sellerConfirmed: false,
      status: OrderStatus.SHIPPING,
      createdAt: this.databaseService.getCurrentDate(),
    });

    await this.createOrderItems(order);
    await this.populateOrder(order);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders: any[] = await this.databaseService.findAllEntities('Order');
    await Promise.all(orders.map((order) => this.populateOrder(order)));

    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order: any = await this.databaseService.findEntityById('Order', id);
    await this.populateOrder(order);

    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    return this.databaseService.updateEntity('Order', id, updateOrderDto);
  }

  async remove(id: number): Promise<Order | null> {
    return this.databaseService.deleteEntity('Order', id);
  }

  async findOrdersByUserId(userId: number): Promise<Order[]> {
    const query: string = `SELECT * FROM "Order" WHERE "userId" = ${userId}`;

    const orders: any[] = await this.databaseService.executeQuery(query);
    await Promise.all(orders.map((order) => this.populateOrder(order)));

    return orders;
  }

  async payOrder(id: number): Promise<{ message: string }> {
    const order = await this.findOne(id);
    this.populateOrder(order);

    const total = this.computeTotal(order);

    const user = await this.userService.findOne(order.userId);

    if (user.balance < total) {
      throw new HttpException(
        'Total cost exceeds user balance',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.update(user.id, {
      balance: user.balance - total,
    });

    await this.update(id, {
      status: OrderStatus.COMPLETED,
    });

    return { message: 'payment successfully processed' };
  }

  async cancelOrder(id: number): Promise<{ message: string }> {
    const order = await this.findOne(id);

    await this.update(id, {
      status: OrderStatus.CANCELLED,
    });

    return { message: 'order successfully cancelled' };
  }

  private async createOrderItems(order: Order): Promise<void> {
    const cartItems = await this.cartItemService.findCartByUserId(order.userId);

    for (const cartItem of cartItems) {
      const orderItemData = {
        orderId: order.id,
        price: cartItem.product.price,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      };

      await this.databaseService.createEntity('OrderItem', orderItemData);

      const product = await this.productService.findOne(cartItem.productId);

      await this.productService.update(product.id, {
        quantity: product.quantity - cartItem.quantity,
      });
    }

    await this.cartItemService.dropCartByUserId(order.userId);
  }

  private async populateOrder(order: any): Promise<void> {
    const query: string = `SELECT * FROM "OrderItem" WHERE "orderId" = ${order.id}`;
    order.items = await this.databaseService.executeQuery(query);
  }

  private computeTotal(order: any): number {
    let total: number = 0;

    for (const item of order.items) {
      total += item.quantity * item.price;
    }

    return total;
  }
}
