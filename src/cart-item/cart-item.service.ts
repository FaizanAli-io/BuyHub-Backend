import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProductService } from 'src/product/product.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { CartItem, Product } from '@prisma/client';

@Injectable()
export class CartItemService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly productService: ProductService,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem | null> {
    const product: Product = await this.productService.findOne(
      createCartItemDto.productId,
    );

    if (product.quantity < createCartItemDto.quantity) {
      throw new HttpException(
        'Requested quantity exceeds available stock',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.databaseService.createEntity('CartItem', createCartItemDto);
  }

  async findAll(): Promise<CartItem[]> {
    return this.databaseService.findAllEntities('CartItem');
  }

  async findOne(id: number): Promise<CartItem | null> {
    return this.databaseService.findEntityById('CartItem', id);
  }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem | null> {
    return this.databaseService.updateEntity('CartItem', id, updateCartItemDto);
  }

  async remove(id: number): Promise<CartItem | null> {
    return this.databaseService.deleteEntity('CartItem', id);
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

  async dropCartByUserId(userId: number): Promise<any[]> {
    const query: string = `DELETE FROM "CartItem" WHERE "userId" = ${userId} RETURNING *`;
    const deletedCarts: any[] = await this.databaseService.executeQuery(query);

    return deletedCarts;
  }
}
