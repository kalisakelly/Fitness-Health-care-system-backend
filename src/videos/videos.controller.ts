import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';


const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(
    @UploadedFile() file,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    const createVideoDto = {
      name,
      description,
      file: file.filename, // Assuming file.filename contains the filename
    };
    
    const savedVideo = await this.videosService.create(createVideoDto);
    return { message: 'Video uploaded successfully!', video: savedVideo };
  }
  @Get()
  findAll() {
    return this.videosService.findAll();
  }
  // @Post()
  // async create(@Body() video: Video): Promise<Video> {
  //   return await this.videosService.create(video);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
  //   return this.videosService.update(+id, updateVideoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
