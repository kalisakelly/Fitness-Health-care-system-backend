import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrition } from './entities/nutrition.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';



@Module({
  imports:[
    TypeOrmModule.forFeature([Nutrition]),
    CloudinaryModule
  ],
  controllers: [NutritionController],
  providers: [NutritionService],
})
export class NutritionModule {}
