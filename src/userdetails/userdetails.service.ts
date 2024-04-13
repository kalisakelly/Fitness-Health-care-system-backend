import { Injectable } from '@nestjs/common';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdetail } from './entities/userdetail.entity';

@Injectable()
export class UserdetailsService {

  private readonly userrepository: Repository<User>
  @InjectRepository (Userdetail) userdetailrepository: Repository<Userdetail>
  

  // async CalculateBMI()

  async create(createUserdetailDto: CreateUserdetailDto):Promise<Userdetail> {
    
    const newUserdetail = await this.userdetailrepository.create(createUserdetailDto)

    return this.userdetailrepository.save(newUserdetail);
  }

  findAll() {
    return this.userdetailrepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userdetail`;
  }

  update(id: number, updateUserdetailDto: UpdateUserdetailDto) {
    return `This action updates a #${id} userdetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} userdetail`;
  }

  bodyBMI(height: number, mass: number, updateUserdetailDto:UpdateUserdetailDto){


  }
}
