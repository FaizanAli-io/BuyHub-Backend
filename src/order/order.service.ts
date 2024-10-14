import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Order, OrderItem, OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order | null> {
    const cartItems: any[] = await this.userService.findCartByUserId(
      createOrderDto.userId,
    );

    const total = cartItems.reduce(
      (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
      0,
    );

    const status = OrderStatus.PENDING;
    const createdAt = this.databaseService.getCurrentDate();

    const order = await this.databaseService.createEntity('Order', {
      ...createOrderDto,
      total,
      status,
      createdAt,
    });

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

      order.items.push(orderItem);
    }

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.databaseService.findAllEntities('Order');
  }

  async findOne(id: number): Promise<Order | null> {
    return this.databaseService.findEntityById('Order', id);
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
}
