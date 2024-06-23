import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule,User]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService,JwtService,UsersService],
})
export class ScheduleModule {}
