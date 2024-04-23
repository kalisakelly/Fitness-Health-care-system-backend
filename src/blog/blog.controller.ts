import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('blog')
@UseGuards(AuthenticationGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(
    @Body() createBlogDto: CreateBlogDto,
    @Req() req:any) {
    const user=req.user.id
    return this.blogService.create(createBlogDto,user);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
