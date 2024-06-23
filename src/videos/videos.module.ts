import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { User } from 'src/users/entities/user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Video,User,Notification])],
  controllers: [VideosController],
  providers: [VideosService,JwtService,UsersService,NotificationsService],
})
export class VideosModule {}
