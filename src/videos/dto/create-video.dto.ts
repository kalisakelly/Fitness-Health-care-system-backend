import { IsNotEmpty } from "class-validator";

export class CreateVideoDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    file: string;

    @IsNotEmpty()
    description:string;
}
