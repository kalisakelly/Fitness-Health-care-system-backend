import { Injectable } from '@nestjs/common';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserdetailsService {

  private readonly userrepository: Repository<User>

  // async CalculateBMI()

  create(createUserdetailDto: CreateUserdetailDto) {
    return 'This action adds a new userdetail';
  }

  findAll() {
    return `This action returns all userdetails`;
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
