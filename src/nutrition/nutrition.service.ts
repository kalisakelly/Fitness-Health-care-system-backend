import { Injectable } from '@nestjs/common';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nutrition } from './entities/nutrition.entity';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(Nutrition)
    private nutrirepo: Repository<Nutrition>,
  ) {}

  async create(createNutritionDto: CreateNutritionDto, user): Promise<Nutrition> {
    const newNutr = this.nutrirepo.create({
      ...createNutritionDto,
      UploadedBy: user, // Assuming user contains the user object or its identifier
    });
    return this.nutrirepo.save(newNutr);
  }

  async findAll(): Promise<Nutrition[]> {
    return this.nutrirepo.find();
  }

  async findOne(id: number): Promise<Nutrition> {
    return this.nutrirepo.findOneBy({id});
  }

  async update(id: number, updateNutritionDto: UpdateNutritionDto): Promise<Nutrition> {
    const nutrition = await this.nutrirepo.findOneBy({id});
    if (!nutrition) {
      throw new Error(`Nutrition with id ${id} not found`);
    }
    // Update nutrition properties based on updateNutritionDto
    // Example: nutrition.name = updateNutritionDto.name;
    // Update other properties as needed
    return this.nutrirepo.save({
      ...nutrition,
      ...updateNutritionDto,
    });
  }

  async remove(id: number): Promise<void> {
    const nutrition = await this.nutrirepo.findOneBy({id});
    if (!nutrition) {
      throw new Error(`Nutrition with id ${id} not found`);
    }
    await this.nutrirepo.remove(nutrition);
  }
}

