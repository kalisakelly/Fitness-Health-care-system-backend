import { IsNotEmpty } from "class-validator";

export class CreateNutritionDto {


    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    file: string;

    @IsNotEmpty()
    description:string;
}
