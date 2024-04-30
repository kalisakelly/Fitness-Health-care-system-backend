import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  
  constructor(@InjectRepository(Video) private videorepository: Repository<Video>){}
  
  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const newVideo = this.videorepository.create(createVideoDto);
    return this.videorepository.save(newVideo);
  }

  async findAll(): Promise<Video[]> {
    return this.videorepository.find();
  }

  async findOne(id: number): Promise<Video> {
    return this.videorepository.findOneBy({id});
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.videorepository.findOneBy({id});
    if (!video) {
      throw new Error(`Video with id ${id} not found`);
    }
    // Update video properties based on updateVideoDto
    // Example: video.name = updateVideoDto.name;
    // Update other properties as needed
    return this.videorepository.save({
      ...video,
      ...updateVideoDto,
    });
  }

  async remove(id: number): Promise<void> {
    const video = await this.videorepository.findOneBy({id});
    if (!video) {
      throw new Error(`Video with id ${id} not found`);
    }
    await this.videorepository.remove(video);
  }

 
}
