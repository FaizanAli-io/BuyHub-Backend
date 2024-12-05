import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { CartItemModule } from 'src/cart-item/cart-item.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule, CartItemModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
