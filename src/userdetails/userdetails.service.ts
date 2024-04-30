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

  async create(createUserdetailDto: CreateUserdetailDto,owner): Promise<Userdetail> {
    const newUserdetail = this.userdetailrepository.create(
      {
        ...createUserdetailDto,
        user:owner
      }
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
    user, // Assuming you have the authenticated user's ID
    updateUserdetailDto: UpdateUserdetailDto,
  ): Promise<Userdetail> {
    // Find user details by user ID
    const userdetail = await this.userdetailrepository.findOne({ where: { user } });

    // If user details do not exist, throw an exception
    if (!userdetail) {
      throw new Error(`User details for user with ID ${user} not found`);
    }

    // Update user details with provided data
    Object.assign(userdetail, updateUserdetailDto);

    // Save the updated user details to the database
    return this.userdetailrepository.save(userdetail);
  }
  
  async remove(id: number): Promise<void> {
    const userdetail = await this.userdetailrepository.findOneBy({id});
    if (!userdetail) {
      throw new Error(`Userdetail with id ${id} not found`);
    }
    await this.userdetailrepository.remove(userdetail);
  }

  // bodyBMI(height: number, mass: number): number {
  //   // Calculate BMI based on height and mass
  //   // Formula: BMI = mass (kg) / (height (m) * height (m))
  //   const heightInMeters = height / 100; // Convert height from cm to meters
  //   const bmi = mass / (heightInMeters * heightInMeters);
  //   // Return BMI rounded to two decimal places
  //   return Math.round(bmi * 100) / 100;
  // }
}
