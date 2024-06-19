import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { PostrepliesService } from './postreplies.service';
import { CreatePostreplyDto } from './dto/create-postreply.dto';
import { UpdatePostreplyDto } from './dto/update-postreply.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('postreplies')
@UseGuards(AuthenticationGuard)
export class PostrepliesController {
  constructor(private readonly postrepliesService: PostrepliesService) {}

  @Post(':id')
  async create(@Param('id') id: string, @Body() createPostreplyDto: CreatePostreplyDto) {
    try {
      return await this.postrepliesService.create(+id, createPostreplyDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':blogId')
  findAllByBlogId(@Param('blogId') blogId: string) {
    return this.postrepliesService.findAllByBlogId(+blogId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postrepliesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostreplyDto: UpdatePostreplyDto, @Req() req: any) {
    return this.postrepliesService.update(+id, updatePostreplyDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.postrepliesService.remove(+id, req.user);
  }
}