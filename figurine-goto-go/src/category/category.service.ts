import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    getAllcategory() {
        return this.prisma.category.findMany();
    }

    async insertNewCategory(dto: CategoryDto) {
        return this.prisma.category.create({
            data: {
                name: dto.name,
            }
        })
    }

    async editCategory(id: string, dto: CategoryDto) {
        if (!id || !dto.name) {
            throw new BadRequestException('Missing Fields')
        }

        const existingCategoryName = await this.prisma.category.findFirst({
            where: {
                name: dto.name,
            },
        });

        if (existingCategoryName) {
            throw new ForbiddenException('Name Already taken')
        } else {
            return this.prisma.category.update({
                where: {
                    id: id
                },
                data: {
                    name: dto.name
                }
            })
        }
    }

    async deleteCategory(id: string) {
        if (!id) {
            throw new BadRequestException('Missing Fields')
        } else {

            const existingCategory = await this.prisma.category.findUnique({
                where: {
                    id: id
                }
            })

            if (!existingCategory || !existingCategory.id) {
                throw new ForbiddenException("Category doesn't exist")
            }


            return this.prisma.category.delete({


                where: {
                    id: id
                }
            })
        }
    }
}
