import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { DatabaseModule } from './database/database.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    ReviewModule,
    ProductModule,
    CategoryModule,
    CartItemModule,
    DatabaseModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
