import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class SignupDto {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsStrongPassword()
    @MaxLength(255)
    password: string


    @IsString()
    @MinLength(3)
    firstName: string

    @IsString()
    @MinLength(3)
    lastName: string



}