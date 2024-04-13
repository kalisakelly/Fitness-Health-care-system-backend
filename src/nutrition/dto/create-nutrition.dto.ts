import { IsNotEmpty } from "class-validator";

export class CreateNutritionDto {


    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    description:string;
}
