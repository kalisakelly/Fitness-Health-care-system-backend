import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogrepository:Repository<Blog>){}


  create(createBlogDto: CreateBlogDto) {

    const blog = new Blog()

    blog.title=createBlogDto.title
    blog.body=createBlogDto.body

    return this.blogrepository.save(blog)
    

  }

  findAll() {
    return this.blogrepository.find()
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogrepository.findOneBy({id});
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    Object.assign(blog, updateBlogDto);
    return this.blogrepository.save(blog);
  }

  async remove(id: number): Promise<void> {
    const blog = await this.findOne(id);
    await this.blogrepository.remove(blog);
  }
}
