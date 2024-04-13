import { Injectable } from '@nestjs/common';
import { CreatePostreplyDto } from './dto/create-postreply.dto';
import { UpdatePostreplyDto } from './dto/update-postreply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postreply } from './entities/postreply.entity';

@Injectable()
export class PostrepliesService {

  constructor(@InjectRepository (Postreply) private postrepo:Repository<Postreply>){}

  async create(createPostreplyDto: CreatePostreplyDto):Promise<Postreply> {
    
    const newpostreply = await this.postrepo.create(createPostreplyDto);

    return this.postrepo.save(newpostreply);
  }

  findAll() {
    return `This action returns all postreplies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postreply`;
  }

  update(id: number, updatePostreplyDto: UpdatePostreplyDto) {
    return `This action updates a #${id} postreply`;
  }

  remove(id: number) {
    return `This action removes a #${id} postreply`;
  }
}
