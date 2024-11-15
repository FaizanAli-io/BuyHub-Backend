import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProductService } from 'src/product/product.service';
import { CreateCartDto, UpdateCartDto } from './dto';
import { CartItem, Product } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly productService: ProductService,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<CartItem | null> {
    const product: Product = await this.productService.findOne(
      createCartDto.productId,
    );

    if (product.quantity < createCartDto.quantity) {
      throw new HttpException(
        'Requested quantity exceeds available stock',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.databaseService.createEntity('CartItem', createCartDto);
  }

  async findAll(): Promise<CartItem[]> {
    return this.databaseService.findAllEntities('CartItem');
  }

  async findOne(id: number): Promise<CartItem | null> {
    return this.databaseService.findEntityById('CartItem', id);
  }

  async update(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<CartItem | null> {
    return this.databaseService.updateEntity('CartItem', id, updateCartDto);
  }

  async remove(id: number): Promise<CartItem | null> {
    return this.databaseService.deleteEntity('CartItem', id);
  }
}
