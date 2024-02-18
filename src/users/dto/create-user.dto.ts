import { IsNotEmpty,IsEmail } from "class-validator";
export class CreateUserDto {

  @IsEmail()
  email: string;
  @IsNotEmpty()
  usernames: string;
  @IsNotEmpty()
  password: string;
    
}
