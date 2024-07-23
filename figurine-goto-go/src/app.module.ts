import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ImagesModule } from './images/images.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartHasProductsModule } from './cart-has-products/cart-has-products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, EmailModule, ImagesModule, CategoryModule, AuthModule, PrismaModule, ProductsModule, CartModule, CartHasProductsModule, ConfigModule.forRoot({
    isGlobal: true,
  })],

})
export class AppModule {}
