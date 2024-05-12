import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { PostrepliesService } from './postreplies.service';
import { CreatePostreplyDto } from './dto/create-postreply.dto';
import { UpdatePostreplyDto } from './dto/update-postreply.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('postreplies')
@UseGuards(AuthenticationGuard)
export class PostrepliesController {
  constructor(private readonly postrepliesService: PostrepliesService) {}

  @Post(':id') // Expecting blogId in the URL
  async create(@Param('id') id: string, @Body() createPostreplyDto: CreatePostreplyDto) {
    try {
      const createdPostReply = await this.postrepliesService.create(+id, createPostreplyDto);
      return createdPostReply;
    } catch (error) {
      // Handle errors gracefully
      throw new NotFoundException(error.message);
    }
  }

  @Get(':blogId') // Expecting blogId in the URL
  findAllByBlogId(@Param('blogId') blogId: string) {
    return this.postrepliesService.findAllByBlogId(+blogId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postrepliesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostreplyDto: UpdatePostreplyDto, @Req() req) {
    return this.postrepliesService.update(+id, updatePostreplyDto, req.user); // Pass authenticated user to service
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.postrepliesService.remove(+id, req.user); // Pass authenticated user to service
  }
}