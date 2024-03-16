import { Injectable } from '@nestjs/common';
import { CreatePostreplyDto } from './dto/create-postreply.dto';
import { UpdatePostreplyDto } from './dto/update-postreply.dto';

@Injectable()
export class PostrepliesService {
  create(createPostreplyDto: CreatePostreplyDto) {
    return 'This action adds a new postreply';
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
