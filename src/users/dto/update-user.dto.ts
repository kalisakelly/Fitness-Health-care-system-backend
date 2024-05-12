import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../entities/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
 
  @IsNotEmpty()
  role: Role;
}
