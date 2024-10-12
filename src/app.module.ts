import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';

@Module({ imports: [DatabaseModule, UserModule, ProductModule] })
export class AppModule {}
