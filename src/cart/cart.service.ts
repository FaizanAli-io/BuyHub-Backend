import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCartDto: CreateCartDto): Promise<void> {
    return this.databaseService.createEntity('Cart', createCartDto);
  }

  async findAll(): Promise<Cart[]> {
    return this.databaseService.findAllEntities('Cart');
  }

  async findOne(id: number): Promise<Cart | null> {
    return this.databaseService.findEntityById('Cart', id);
  }

  async update(id: number, updateCartDto: CreateCartDto): Promise<void> {
    return this.databaseService.updateEntity('Cart', id, updateCartDto);
  }

  async remove(id: number): Promise<void> {
    return this.databaseService.deleteEntity('Cart', id);
  }
}
