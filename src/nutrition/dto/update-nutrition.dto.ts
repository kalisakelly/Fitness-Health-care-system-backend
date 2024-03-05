import { PartialType } from '@nestjs/mapped-types';
import { CreateNutritionDto } from './create-nutrition.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateNutritionDto extends PartialType(CreateNutritionDto) {


    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    file: string;

    @IsNotEmpty()
    description:string;
}
