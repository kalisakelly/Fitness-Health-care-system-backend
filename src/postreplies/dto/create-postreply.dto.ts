import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostreplyDto {
    @IsNotEmpty()
    @IsString()
    body:string;

    
}
