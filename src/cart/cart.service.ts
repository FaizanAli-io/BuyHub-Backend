import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCartDto, UpdateCartDto } from './dto';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCartDto: CreateCartDto): Promise<Cart | null> {
    return this.databaseService.createEntity('Cart', createCartDto);
  }

  async findAll(): Promise<Cart[]> {
    return this.databaseService.findAllEntities('Cart');
  }

  async findOne(id: number): Promise<Cart | null> {
    return this.databaseService.findEntityById('Cart', id);
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart | null> {
    return this.databaseService.updateEntity('Cart', id, updateCartDto);
  }

  async remove(id: number): Promise<Cart | null> {
    return this.databaseService.deleteEntity('Cart', id);
  }
}
