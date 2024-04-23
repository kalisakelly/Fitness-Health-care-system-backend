import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostreplyDto } from './dto/create-postreply.dto';
import { UpdatePostreplyDto } from './dto/update-postreply.dto';
import { Postreply } from './entities/postreply.entity';

@Injectable()
export class PostrepliesService {
  constructor(
    @InjectRepository(Postreply)
    private postrepo: Repository<Postreply>,
  ) {}

  async create(createPostreplyDto: CreatePostreplyDto): Promise<Postreply> {
    const newPostreply = this.postrepo.create(createPostreplyDto);
    return this.postrepo.save(newPostreply);
  }

  async findAll(): Promise<Postreply[]> {
    return this.postrepo.find();
  }

  async findOne(id: number): Promise<Postreply> {
    return this.postrepo.findOneBy({id});
  }

  async update(
    id: number,
    updatePostreplyDto: UpdatePostreplyDto,
  ): Promise<Postreply> {
    const postreply = await this.postrepo.findOneBy({id});
    if (!postreply) {
      throw new Error(`Postreply with id ${id} not found`);
    }
    // Update postreply properties based on updatePostreplyDto
    // Example: postreply.body = updatePostreplyDto.body;
    // Update other properties as needed
    return this.postrepo.save({
      ...postreply,
      ...updatePostreplyDto,
    });
  }

  async remove(id: number): Promise<void> {
    const postreply = await this.postrepo.findOneBy({id});
    if (!postreply) {
      throw new Error(`Postreply with id ${id} not found`);
    }
    await this.postrepo.remove(postreply);
  }
}
