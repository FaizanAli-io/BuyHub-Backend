import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from 'src/product/product.module';
import { CartItemModule } from 'src/cart-item/cart-item.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, ProductModule, CartItemModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
