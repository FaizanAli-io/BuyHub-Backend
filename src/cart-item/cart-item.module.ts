import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
