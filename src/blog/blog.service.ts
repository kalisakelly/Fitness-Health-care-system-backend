import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogrepository:Repository<Blog>){}


  async create(createBlogDto: CreateBlogDto, user): Promise<Blog> {
    const newBlog = this.blogrepository.create({
      ...createBlogDto,
      createdby: user,
    });
    return this.blogrepository.save(newBlog);
  }

  async findAll() {
    const blogs = await this.blogrepository.find({ relations: ['createdby', 'postreply'] });

    return blogs.map(blog => ({
      author: {
        name: blog.createdby.username,
        avatar: blog.createdby.profile || '/path/to/default/avatar.jpg',
        date: new Date(blog.createdat).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      },
      content: blog.body,
      tags: [],  // Assuming you might want to implement tags in the future
      stats: {
        views: 0,  // Replace with actual views if you have this information
        likes: 0,  // Replace with actual likes if you have this information
      },
    }));
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogrepository.findOneBy({id});
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, user): Promise<Blog> {
    const blog = await this.findOne(id);
    Object.assign(blog, updateBlogDto, { updatedBy: user });
    return this.blogrepository.save(blog);
  }

  async remove(id: number, user): Promise<void> {
    const blog = await this.findOne(id);
    if (blog.createdby !== user) {
      throw new ForbiddenException('You do not have permission to delete this blog');
    }
    await this.blogrepository.remove(blog);
  }
}