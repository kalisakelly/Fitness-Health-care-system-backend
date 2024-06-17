// videos.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { Request, Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  
  // @UseGuards(AuthenticationGuard, AuthorizationGuard) 
  // @Roles('admin')
  @Post('upload')
  create(@Body() createVideoDto: CreateVideoDto, @Req() req: any) {
    const user = 8 // Extract authenticated user ID
    return this.videosService.create(createVideoDto, user);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  // @Get(':name/stream')
  // async streamVideo(@Param('name') name: string, @Res() response: Response, @Req() request: Request) {
  //   return this.videosService.streamVideo(name, response, request);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
