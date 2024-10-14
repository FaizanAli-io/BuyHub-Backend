import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Order, OrderItem, OrderStatus, Product } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order | null> {
    const cart: Product[] = await this.userService.findCartByUserId(
      createOrderDto.userId,
    );

    const total = cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );

    const status = OrderStatus.PENDING;
    const createdAt = this.databaseService.getCurrentDate();

    return this.databaseService.createEntity('Order', {
      ...createOrderDto,
      total,
      status,
      createdAt,
    });
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
