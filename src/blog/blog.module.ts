import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { JwtService } from '@nestjs/jwt';
import { Postreply } from 'src/postreplies/entities/postreply.entity';
import { PostrepliesService } from 'src/postreplies/postreplies.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Blog,Postreply,User])],
  controllers: [BlogController],
  providers: [BlogService,JwtService,PostrepliesService,UsersService],
})
export class BlogModule {}
