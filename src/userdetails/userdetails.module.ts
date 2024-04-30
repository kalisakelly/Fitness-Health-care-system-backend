import { Module } from '@nestjs/common';
import { UserdetailsService } from './userdetails.service';
import { UserdetailsController } from './userdetails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userdetail } from './entities/userdetail.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Userdetail])],
  controllers: [UserdetailsController],
  providers: [UserdetailsService,JwtService],
})
export class UserdetailsModule {}
