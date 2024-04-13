import { Module } from '@nestjs/common';
import { PostrepliesService } from './postreplies.service';
import { PostrepliesController } from './postreplies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postreply } from './entities/postreply.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Postreply])],
  controllers: [PostrepliesController],
  providers: [PostrepliesService],
})
export class PostrepliesModule {}
