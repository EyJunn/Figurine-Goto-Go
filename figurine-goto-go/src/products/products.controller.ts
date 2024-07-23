import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { insertProductsDto } from './dto/produtcs.dto';
import { Category } from '@prisma/client';
import { updateProductsDto } from './dto';
import { AdminGuard, JwtGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/allProducts')
  getAllProducts(){
    return this.productsService.getAllProducts()
  }

  @UseGuards(AdminGuard)
  @Post("/newProduct")
  createProduct(@Body() dto: insertProductsDto, @Body() Category: Category ){
    return this.productsService.createProduct(dto, Category)
  }

  @UseGuards(AdminGuard)
  @Patch("/updateProduct/:id")
  updateProduct(@Param("id") id: string, @Body() dto: updateProductsDto ){
    return this.productsService.updateProducts(id, dto)
  }

  @UseGuards(AdminGuard)
  @Delete("/delete/:id")
  deleteProduct(@Param("id") id: string){
    return this.productsService.deleteProducts(id)
  }


}
