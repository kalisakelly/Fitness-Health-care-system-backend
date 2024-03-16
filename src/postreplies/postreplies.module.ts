import { Module } from '@nestjs/common';
import { PostrepliesService } from './postreplies.service';
import { PostrepliesController } from './postreplies.controller';

@Module({
  controllers: [PostrepliesController],
  providers: [PostrepliesService],
})
export class PostrepliesModule {}
