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
    private readonly nutritionRepository: Repository<Nutrition>,
  ) {}

  async create(nutritionData: Partial<Nutrition>, userId: number): Promise<Nutrition> {
    const nutrition = this.nutritionRepository.create(nutritionData);
    return await this.nutritionRepository.save(nutrition);
  }

  async findAll(page: number, search: string, limit: number, sort: string): Promise<{ data: Nutrition[]; count: number }> {
    const queryBuilder = this.nutritionRepository.createQueryBuilder('nutrition');

    if (search) {
      queryBuilder.where('nutrition.name LIKE :search OR nutrition.description LIKE :search', { search: `%${search}%` });
    }

    queryBuilder.orderBy('nutrition.creationdate', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }

  async findOne(id: number): Promise<Nutrition> {
    return await this.nutritionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateNutritionDto: Partial<Nutrition>): Promise<Nutrition> {
    await this.nutritionRepository.update(id, updateNutritionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.nutritionRepository.delete(id);
  }
}