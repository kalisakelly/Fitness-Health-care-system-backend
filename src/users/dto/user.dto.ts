import {IsNotEmpty,IsEmail,MinLength, isNotEmpty} from 'class-validator'

export class Userdto{
    @IsNotEmpty()
    fullname:string;

    @IsNotEmpty()
     @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}