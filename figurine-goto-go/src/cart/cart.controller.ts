import { Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}




  @Post()
  createCart(userId: string){
    return this.cartService.createCart(userId)
  }





}
