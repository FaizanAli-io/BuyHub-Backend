import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
