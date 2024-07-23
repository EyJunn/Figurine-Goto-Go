import { Controller, Get, Param } from '@nestjs/common';
import { CartHasProductsService } from './cart-has-products.service';

@Controller('cart-has-products')
export class CartHasProductsController {
  constructor(private readonly cartHasProductsService: CartHasProductsService) { }

  //je suppose que oui
  // oublie pas de m'envoyer le résultat superheros postman
  //mp si besoin
  @Get("/verify/:id")
  veirfyQuantity(@Param("id") id: string){
    return this.cartHasProductsService.quantityCart(id)
  }

  
}
