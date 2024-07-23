import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartHasProductsService {
    constructor(private prisma: PrismaService,
        private products: ProductsService
    ) { }



    async quantityCart(id: string) {
        const verifyQuantity = await this.prisma.products.findUnique({
            where: {
                id: id
            },
            select: {
                quantity: true,
                cartHasProducts: {
                    select: {
                        quantity: true
                    }
                }
            }
        })

        
        return verifyQuantity
 
    }






}








