import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { ILike, Like, Repository } from 'typeorm';
import { Postreply } from 'src/postreplies/entities/postreply.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogrepository:Repository<Blog>,
    @InjectRepository(Postreply)
    private readonly postReplyRepository: Repository<Postreply>,
    @InjectRepository(User) private userrepository:Repository<User>){}


  async create(createBlogDto: CreateBlogDto, user): Promise<Blog> {
    const newBlog = this.blogrepository.create({
      ...createBlogDto,
      createdby: user,
    });
    return this.blogrepository.save(newBlog);
  }

  async findAll(page: number, search: string, limit: number, sort: string) {
    const skip = (page - 1) * limit;
    const order = sort === 'asc' ? 'ASC' : 'DESC';

    // Assuming your repository has a method to search and paginate blogs
    const [blogs, totalBlogs] = await this.blogrepository.findAndCount({
      where: { title: Like(`%${search}%`) }, // Adjust based on your search criteria
      order: { createdat: order },
      take: limit,
      skip,
    });

    return {
      blogs,
      totalBlogs,
    };
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
  async likeBlog(id: number, userId: number): Promise<Blog> {
    console.log('Service Like Blog ID:', id);  // Log the ID

    if (isNaN(id)) {
      throw new BadRequestException('Invalid blog ID');
    }

    const blog = await this.blogrepository.findOneBy({id});
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    // Implement like logic here

    await this.blogrepository.save(blog);
    return blog;
  }


  async viewBlog(id: number): Promise<Blog> {
    console.log('Service View Blog ID:', id);  // Log the ID

    if (isNaN(id)) {
      throw new BadRequestException('Invalid blog ID');
    }

    const blog = await this.blogrepository.findOneBy({id});
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    blog.views += 1;
    await this.blogrepository.save(blog);
    return blog;
  }

  async commentOnBlog(id: number, userId: number, body: string): Promise<Postreply> {
    const blog = await this.blogrepository.findOneBy({id});
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Create a new Postreply entity
    const newPostreply = new Postreply();
    newPostreply.body = body;
    newPostreply.blog = blog;
    newPostreply.createdBy = await this.findOrCreateUser(userId);

    return this.postReplyRepository.save(newPostreply);
  }

  private async findOrCreateUser(userid: number): Promise<User> {
    // Implement logic to find or create user
    // Example:
    let user = await this.userrepository.findOneBy({userid});
    if (!user) {
      // Create user logic here
      user = new User();
      user.userid = userid; // Ensure to set correct properties
      // Save user or handle creation
    }
    return user;
  }
}