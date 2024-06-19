import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: any) {
    const userId = req.user.id;
    return this.blogService.create(createBlogDto, userId);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('search') search: string = '') {
    return this.blogService.findAll(page, search);
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
    console.log('View Blog ID:', id);  // Log the ID
    return this.blogService.viewBlog(id);
  }

  @Patch(':id/like')
  @UseGuards(AuthenticationGuard)
  async likeBlog(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user.id;
    console.log('Like Blog ID:', id);  // Log the ID
    return this.blogService.likeBlog(id, userId);
  }

  @Post(':id/comment')
  @UseGuards(AuthenticationGuard)
  async commentOnBlog(@Param('id', ParseIntPipe) id: number, @Req() req: any, @Body('text') text: string) {
    const userId = req.user.id;
    console.log('Comment Blog ID:', id);  // Log the ID
    return this.blogService.commentOnBlog(id, userId, text);
  }

}