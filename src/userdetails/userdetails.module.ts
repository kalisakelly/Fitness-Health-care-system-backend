import { Module } from '@nestjs/common';
import { UserdetailsService } from './userdetails.service';
import { UserdetailsController } from './userdetails.controller';

@Module({
  controllers: [UserdetailsController],
  providers: [UserdetailsService],
})
export class UserdetailsModule {}
