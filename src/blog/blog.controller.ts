import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly usersService:UsersService,
    private readonly notificationsService:NotificationsService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req: any) {
    const userId = req.user.id;
    const blog = await this.blogService.create(createBlogDto, userId);

    // Notify all users about the new blog post
    const users = await this.usersService.findAll();
    for (const user of users) {
      await this.notificationsService.createNotification('A new blog has been added!', user);
    }

    return blog;
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('search') search: string = '',
    @Query('limit') limit: number = 4,
    @Query('sort') sort: string = 'desc',
  ) {
    return await this.blogService.findAll(page, search, limit, sort);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @Req() req: any) {
    const userId = req.user.id;
    return this.blogService.update(+id, updateBlogDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.blogService.remove(+id, userId);
  }

  @Patch(':id/view')
  async viewBlog(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.viewBlog(id);
  }

  @Patch(':id/like')
  @UseGuards(AuthenticationGuard)
  async likeBlog(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.blogService.likeBlog(id, userId);
  }

  @Post(':id/comment')
  @UseGuards(AuthenticationGuard)
  async commentOnBlog(@Param('id', ParseIntPipe) id: number, @Req() req: any, @Body('text') text: string) {
    const userId = req.user.id;
    return this.blogService.commentOnBlog(id, userId, text);
  }

}