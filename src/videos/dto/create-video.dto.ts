import { IsNotEmpty } from "class-validator";

export class CreateVideoDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    description:string;
}
