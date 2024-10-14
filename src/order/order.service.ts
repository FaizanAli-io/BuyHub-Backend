import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Order, OrderItem, OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order | null> {
    let order = await this.databaseService.createEntity('Order', {
      total: 0,
      ...createOrderDto,
      status: OrderStatus.PENDING,
      createdAt: this.databaseService.getCurrentDate(),
    });

    order = await this.populateOrder(order);

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.databaseService.findAllEntities('Order');
  }

  async findOne(id: number): Promise<any> {
    const order: any = await this.databaseService.findEntityById('Order', id);

    const query: string = `SELECT * FROM "OrderItem" WHERE "orderId" = ${id}`;
    order.items = await this.databaseService.executeQuery(query);

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

  async populateOrder(order: any) {
    const cartItems: any[] = await this.userService.findCartByUserId(
      order.userId,
    );

    order.items = [];

    for (const cartItem of cartItems) {
      const orderItemData = {
        orderId: order.id,
        price: cartItem.product.price,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      };

      const orderItem: OrderItem = await this.databaseService.createEntity(
        'OrderItem',
        orderItemData,
      );

      const boughtProduct = await this.productService.findOne(
        orderItem.productId,
      );

      const updateProductData = {
        quantity: boughtProduct.quantity - orderItem.quantity,
      };

      await this.productService.update(boughtProduct.id, updateProductData);

      order.items.push(orderItem);
    }

    const total = this.computeTotal(order.items);

    await this.update(order.id, { total });

    order.total = total;

    await this.userService.dropCartByUserId(order.userId);

    return order;
  }

  computeTotal(orderItems: OrderItem[]): number {
    return orderItems.reduce(
      (sum, orderItem) => sum + orderItem.price * orderItem.quantity,
      0,
    );
  }
}
