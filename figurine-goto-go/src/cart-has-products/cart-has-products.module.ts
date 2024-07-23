import { Module } from '@nestjs/common';
import { CartHasProductsService } from './cart-has-products.service';
import { CartHasProductsController } from './cart-has-products.controller';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [CartHasProductsController],
  providers: [CartHasProductsService, ProductsService],
})
export class CartHasProductsModule {}
