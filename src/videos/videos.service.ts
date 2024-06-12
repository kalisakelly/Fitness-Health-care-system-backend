// videos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Request, Response } from 'express';
import { createReadStream, statSync, readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto, user): Promise<Video> {
    const newVideo = this.videoRepository.create({
      ...createVideoDto,
      UploadedBy: user,
    });
    return this.videoRepository.save(newVideo);
  }

  async findAll(): Promise<{ name: string; url: string }[]> {
    const baseUrl = 'http://localhost:3001';
    const videos = await this.videoRepository.find();
    return videos.map((video) => ({
      name: video.name,
      url: `${baseUrl}/uploads/${video.name}`,
    }));
  }

  async findOne(id: number): Promise<Video> {
    const video = await this.videoRepository.findOneBy({ id });
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return video;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.findOne(id);
    return this.videoRepository.save({
      ...video,
      ...updateVideoDto,
    });
  }

  async remove(id: number): Promise<void> {
    const video = await this.findOne(id);
    await this.videoRepository.remove(video);
  }

  async streamVideo(name: string, response: Response, request: Request) {
    const path = join(__dirname, '../../uploads/', name);
    const isValidVideo = this.isValidVideo(name);

    if (!isValidVideo) {
      throw new NotFoundException('Video does not exist');
    }

    const { range } = request.headers;

    if (!range) {
      throw new NotFoundException('Range header is missing');
    }

    const videoSize = statSync(path).size;
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    response.writeHead(206, headers);

    const stream = createReadStream(path, { start, end });
    stream.pipe(response);
  }

  private isValidVideo(name: string): boolean {
    const allFiles: string[] = readdirSync(join(__dirname, '../../uploads/'));
    return allFiles.includes(name);
  }
}
