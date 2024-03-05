import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  
  constructor(@InjectRepository(Video) private videorepository:Repository<Video>){}
  
  async create(createVideoDto: CreateVideoDto):Promise<Video> {

    const video = new Video();

    video.name=createVideoDto.name;
    video.description=createVideoDto.description;
    video.file=createVideoDto.file;
  

    return await this.videorepository.save(video);

    
  }

  findAll() {
    return `This action returns all videos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
