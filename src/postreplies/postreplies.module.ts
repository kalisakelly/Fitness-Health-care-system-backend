import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postreply } from './entities/postreply.entity';
import { Blog } from '../blog/entities/blog.entity'; // Assuming this is the correct path
import { PostrepliesService } from './postreplies.service';
import { PostrepliesController } from './postreplies.controller';
import { BlogService } from '../blog/blog.service'; // Assuming this is the correct path
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Postreply, Blog]),
  ],
  controllers: [PostrepliesController],
  providers: [PostrepliesService, BlogService,JwtService], // Remove JwtService if not needed
})
export class PostrepliesModule {}
