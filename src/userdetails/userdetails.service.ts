import { Injectable } from '@nestjs/common';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdetail } from './entities/userdetail.entity';

@Injectable()
export class UserdetailsService {
  constructor(
    @InjectRepository(Userdetail)
    private userdetailrepository: Repository<Userdetail>,
  ) {}

  async create(
    createUserdetailDto: CreateUserdetailDto,
  ): Promise<Userdetail> {
    const newUserdetail = this.userdetailrepository.create(
      createUserdetailDto,
    );
    return this.userdetailrepository.save(newUserdetail);
  }

  async findAll(): Promise<Userdetail[]> {
    return this.userdetailrepository.find();
  }

  async findOne(id: number): Promise<Userdetail> {
    return this.userdetailrepository.findOneBy({id});
  }

  async update(
    id: number,
    updateUserdetailDto: UpdateUserdetailDto,
  ): Promise<Userdetail> {
    const userdetail = await this.userdetailrepository.findOneBy({id});
    if (!userdetail) {
      throw new Error(`Userdetail with id ${id} not found`);
    }
    // Update userdetail properties based on updateUserdetailDto
    // Example: userdetail.height = updateUserdetailDto.height;
    // Update other properties as needed
    return this.userdetailrepository.save({
      ...userdetail,
      ...updateUserdetailDto,
    });
  }

  async remove(id: number): Promise<void> {
    const userdetail = await this.userdetailrepository.findOneBy({id});
    if (!userdetail) {
      throw new Error(`Userdetail with id ${id} not found`);
    }
    await this.userdetailrepository.remove(userdetail);
  }

  bodyBMI(height: number, mass: number): number {
    // Calculate BMI based on height and mass
    // Formula: BMI = mass (kg) / (height (m) * height (m))
    const heightInMeters = height / 100; // Convert height from cm to meters
    const bmi = mass / (heightInMeters * heightInMeters);
    // Return BMI rounded to two decimal places
    return Math.round(bmi * 100) / 100;
  }
}
