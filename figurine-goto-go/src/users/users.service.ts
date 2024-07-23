import { ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateUsersDto } from './dto/updateUsers.dto';
import { disableDto } from './dto/disable.dto';
import { Role } from 'src/Utils/const';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getAllUsers() {
        return this.prisma.users.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                firstName: true,
                email: true,
            }
        })
    }

    async updateUser(id: string, dto: updateUsersDto) {
        const existingUser = await this.prisma.users.findUnique({
            where: {
                id: id
            }
        })

        if (!existingUser || !existingUser.id) {
            throw new ForbiddenException("Unexisting id")
        }


        const UpdatedUser = await this.prisma.users.update({
            where: {
                id: id,
            },
            data: {
                ...dto
            }
        })

        delete UpdatedUser.password

        return UpdatedUser
    }



    async deleteUser(id: string) {
        const existingUser = await this.prisma.users.findUnique({
            where: {
                id: id
            }
        })

        if (!existingUser || !existingUser.id) {
            throw new ForbiddenException("Unexisting id")
        }

        return this.prisma.users.delete({
            where: {
                id: id
            }
        })
    }

    async updateAdmin(id: string, dto: disableDto){
        const existingUser = await this.prisma.users.findUnique({
            where: {
                id: id
            }
        })

        if ( !existingUser || !existingUser.id){
            throw new ForbiddenException("Unexisting id")
        }

        await this.prisma.users.update({
            where: {
                id: id,
            },
            data: {
                isActive: dto.isActive,
            },
        });
        return 'Update registered'
    }
}
