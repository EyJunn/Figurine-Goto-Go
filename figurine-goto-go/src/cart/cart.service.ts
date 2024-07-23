import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }


    async createCart(userId: string){
        const existingUser = await this.prisma.users.findUnique({
            where:{ 
                id: userId
            }
        })

        if (!existingUser || !existingUser.id){
            throw new ForbiddenException("Unexisting user")
        }

        const Cart = await this.prisma.cart.create({
            data:{
                usersId: userId
            }
        })
    }

}
