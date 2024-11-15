import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ProductModule,
    CategoryModule,
    CartModule,
    OrderModule,
    ReviewModule,
  ],
})
export class AppModule {}
