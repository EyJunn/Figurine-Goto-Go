import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2'
import { Role } from 'src/Utils/const';
import { isString } from 'class-validator';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        private emailService: EmailService,
        private cart: CartService
    ) { }

    async signup(dto: SignupDto) {
        const existingUser = await this.prisma.users.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (existingUser) {
            throw new ForbiddenException('Email already taken')
        }
        const userRole = await this.prisma.role.findUnique({
            where: {
                name: Role.USER,
            },
        });

        if (!userRole) {
            throw new NotFoundException('Not Found');
        }

        const hash = await argon.hash(dto.password)
        
        const activationToken = await argon.hash(`${new Date()} + ${dto.email}`)
        const newToken = activationToken.replaceAll('/', '');

        const user = await this.prisma.users.create({
            data: {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                password: hash,
                roleId: userRole.id,
                token: newToken,
            }
        })

        await this.emailService.sendUserConfirmation(user, newToken)


        return {message: "Register Succesfully"}
    }

    async signin(dto: SigninDto) {
        const user = await this.prisma.users.findUnique({
            where: {
                email: dto.email
            },
            select: {
                id: true,
                role: true,
                password: true
            }
        });
        if (!user) {
            throw new ForbiddenException('Invalid crendentials');
        }

        const isValidPassword = await argon.verify(user.password, dto.password);
        if (!isValidPassword) {
            throw new ForbiddenException('Invalid crendentials');
        }
        return this.signToken(user.id, user.role.name);

    }

    async signToken(userId: string, Role: string): Promise<{ access_token: string, Role: string }> {
        const payload = {
            sub: userId,
            role: Role
        };


        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30d',
            secret: secret,
        });

        return {
            access_token: token,
            Role: Role
        };
    }

    async activateAccount(token: string, res: any) {
        if (!token || !isString(token)) {
            throw new BadRequestException('Need a token');
        }
        const user = await this.prisma.users.findFirst({
            where: {
                token: token,
            },
        });
        if (!user) {
            throw new NotFoundException('Not found');
        }

        await this.cart.createCart(user.id)


        await this.prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                token: null,
                isActive: true,
            },
        });
        return ['Account activate',
            res.redirect('http://localhost:3001/signin')];
    }
}

