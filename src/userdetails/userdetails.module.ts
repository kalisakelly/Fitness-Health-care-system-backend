import { Module } from '@nestjs/common';
import { UserdetailsService } from './userdetails.service';
import { UserdetailsController } from './userdetails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userdetail } from './entities/userdetail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Userdetail])],
  controllers: [UserdetailsController],
  providers: [UserdetailsService],
})
export class UserdetailsModule {}
