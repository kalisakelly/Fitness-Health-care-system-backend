import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostrepliesService } from './postreplies.service';
import { CreatePostreplyDto } from './dto/create-postreply.dto';
import { UpdatePostreplyDto } from './dto/update-postreply.dto';

@Controller('postreplies')
export class PostrepliesController {
  constructor(private readonly postrepliesService: PostrepliesService) {}

  @Post()
  create(@Body() createPostreplyDto: CreatePostreplyDto) {
    return this.postrepliesService.create(createPostreplyDto);
  }

  @Get()
  findAll() {
    return this.postrepliesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postrepliesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostreplyDto: UpdatePostreplyDto) {
    return this.postrepliesService.update(+id, updatePostreplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postrepliesService.remove(+id);
  }
}
