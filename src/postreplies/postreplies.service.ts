import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostreplyDto } from './dto/create-postreply.dto';
import { UpdatePostreplyDto } from './dto/update-postreply.dto';
import { Postreply } from './entities/postreply.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class PostrepliesService {
  constructor(
    @InjectRepository(Postreply)
    private readonly postReplyRepository: Repository<Postreply>,
    private readonly blogService: BlogService,
  ) {}

  async create(id: number, createPostReplyDto: CreatePostreplyDto): Promise<Postreply> {
    const blog = await this.blogService.findOne(id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    const newReply = this.postReplyRepository.create({
      ...createPostReplyDto,
      blog,
     
    });
    return this.postReplyRepository.save(newReply);
  }

  async findAllByBlogId(id: number): Promise<Postreply[]> {
    const blog = await this.blogService.findOne(id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  
    const postreplies = await Postreply.createQueryBuilder('postreply')
      .innerJoinAndSelect('postreply.blog', 'blog')
      .where('postreply.blogId = :id', { id: blog.id })
      .getMany();  
    return postreplies;
  }


  async findOne(id: number): Promise<Postreply> {
    const reply = await this.postReplyRepository.findOneBy({id});
    if (!reply) {
      throw new NotFoundException(`Post reply with ID ${id} not found`);
    }
    return reply;
  }

  async update(id: number, updatePostReplyDto: UpdatePostreplyDto, user): Promise<Postreply> {
    const reply = await this.findOne(id);
    Object.assign(reply, updatePostReplyDto, { updatedBy: user });
    return this.postReplyRepository.save(reply);
  }

  async remove(id: number, user): Promise<void> {
    const reply = await this.findOne(id);
    if (reply.createdBy !== user) {
      throw new ForbiddenException('You do not have permission to delete this post reply');
    }
    await this.postReplyRepository.remove(reply);
  }
}