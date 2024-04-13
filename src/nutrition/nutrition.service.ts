import { Injectable } from '@nestjs/common';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nutrition } from './entities/nutrition.entity';

@Injectable()
export class NutritionService {
  constructor(@InjectRepository(Nutrition) private nutrirepo:Repository<Nutrition>){}


  async create(createNutritionDto: CreateNutritionDto):Promise<Nutrition> {

    const newnutr= this.nutrirepo.create(createNutritionDto)
    
    return  this.nutrirepo.save(newnutr);
  }

  async findAll() {

    return await this.nutrirepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} nutrition`;
  }

  update(id: number, updateNutritionDto: UpdateNutritionDto) {
    return `This action updates a #${id} nutrition`;
  }

  remove(id: number) {
    return `This action removes a #${id} nutrition`;
  }
}
