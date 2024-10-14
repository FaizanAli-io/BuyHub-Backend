import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProductService } from 'src/product/product.service';
import { CreateCartDto, UpdateCartDto } from './dto';
import { Cart, Product } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly productService: ProductService,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart | null> {
    const product: Product = await this.productService.findOne(
      createCartDto.productId,
    );

    if (product.quantity < createCartDto.quantity) {
      throw new HttpException(
        'Requested quantity exceeds available stock',
        HttpStatus.BAD_REQUEST,
      );
    }

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
