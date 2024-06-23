// videos.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { Request, Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UsersService } from 'src/users/users.service';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly usersService:UsersService,
    private readonly notificationsService:NotificationsService) {}

  
  // @UseGuards(AuthenticationGuard, AuthorizationGuard) 
  // @Roles('admin')
  @Post('upload')
  @UseGuards(AuthenticationGuard)
  async create(@Body() createVideoDto: CreateVideoDto, @Req() req: any) {
    const user = req.user.id; // Extract authenticated user ID
    const video = await this.videosService.create(createVideoDto, user);

    // Notify all users about the new video
    const users = await this.usersService.findAll();
    for (const user of users) {
      await this.notificationsService.createNotification('A new video has been added!', user);
    }

    return video;
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('search') search: string = '',
    @Query('limit') limit: number = 6,
    @Query('sort') sort: string = 'desc',
  ) {
    return await this.videosService.findAll(page, search, limit, sort);
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

  @Get('count')
  async countAll():Promise<{ count: number }>{
    const count = await this.videosService.countVideos();
    return { count };
  }

}
