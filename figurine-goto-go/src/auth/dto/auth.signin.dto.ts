import { IsEmail, IsString,  MaxLength, } from "class-validator"

export class SigninDto {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MaxLength(255)
    password: string

}