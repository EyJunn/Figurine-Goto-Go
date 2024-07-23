import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { insertProductsDto } from './dto/produtcs.dto';
import { updateProductsDto } from './dto/update.product.dto';
import { CategoryProps } from 'src/Utils/type';

@Injectable()
export class ProductsService {
    constructor(
        private prisma: PrismaService) { }

    async getAllProducts() {
        return this.prisma.products.findMany({
            orderBy: {
                name: 'asc'
            },
            select: {
                name: true,
                image: true,
                height: true,
                weight: true,
                price: true,
                quantity: true
            }
        })
    }

    async globalSearch(query: string) {
        return this.prisma.products.findMany({
            where: {
                name: query,
            },
        });
    }

    async createProduct(dto: insertProductsDto, category: CategoryProps) {

     await this.prisma.products.create({
            data: {
                name: dto.name,
                price: dto.price,
                weight: dto.weight,
                height: dto.height,
                quantity: dto.quantity,
                categoryId: category.id,
                image: dto.image
            }
        })

    }

    async updateProducts(id: string, dto: updateProductsDto) {
        const existingProduct = await this.prisma.products.findUnique({
            where: {
                id: id,
            }
        })

        if (!existingProduct || !existingProduct.id) {
            throw new ForbiddenException('Unexisting id')
        }

        return this.prisma.products.update({
            where: {
                id: id,
            },
            data: {
                ...dto
            }
        })
    }

    async deleteProducts(id: string) {
        const existingProduct = await this.prisma.products.findUnique({
            where: {
                id: id,
            },
        });
        if (!existingProduct || !existingProduct.id) {
            throw new ForbiddenException("Id doesn't exist");
        } else {

            await this.prisma.products.delete({
                where: {
                    id: id,
                },
            })

            return 'deleted';
        }
    }
}
