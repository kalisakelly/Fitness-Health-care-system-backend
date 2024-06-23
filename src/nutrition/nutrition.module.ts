import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrition } from './entities/nutrition.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { Notification } from 'src/notifications/entities/notification.entity';



@Module({
  imports:[
    TypeOrmModule.forFeature([
      Nutrition,
      User,
      Notification]),
    CloudinaryModule,
    
    
  ],
  controllers: [NutritionController],
  providers: [NutritionService,JwtService,UsersService,NotificationsService],
})
export class NutritionModule {}
