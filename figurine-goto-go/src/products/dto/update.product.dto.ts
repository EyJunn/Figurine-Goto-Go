import { IsNumber, IsString } from "class-validator";

export class updateProductsDto {

    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsNumber()
    quantity: number
}