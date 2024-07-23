import { IsNumber, IsString } from "class-validator";

export class insertProductsDto{

    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsNumber()
    height: number

    @IsNumber()
    weight: number

    @IsNumber()
    quantity: number
    
    @IsString()
    image: string
}