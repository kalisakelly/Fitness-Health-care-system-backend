import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { object } from '@hapi/joi';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userrepository:Repository<User>){}
  
  async getByEmail(email:string){
    const user = await this.userrepository.findOneBy({ email })
    if(user){
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async create(createUserDto:CreateUserDto):Promise<User>{

    
    const user = new User();
    user.username=createUserDto.username;
    user.email=createUserDto.email;
    user.password=createUserDto.password;

    return this.userrepository.save(user);

  }

  findAll() {
    return this.userrepository.find();
  }

  findOne(userid: number) {
    return this.userrepository.findOneBy({userid})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updaterole(userid:number, updateUserDto:UpdateUserDto) : Promise<User>{

    const user = await this.findOne(userid);
    Object.assign(user, updateUserDto)
    return this.userrepository.save(user)
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
