import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.find();
  }

  findOne(id: number): Promise<Schedule> {
    return this.schedulesRepository.findOneBy({ id });
  }

  create(schedule: Partial<Schedule>): Promise<Schedule> {
    const newSchedule = this.schedulesRepository.create(schedule);
    return this.schedulesRepository.save(newSchedule);
  }

  async update(id: number, schedule: Partial<Schedule>): Promise<Schedule> {
    await this.schedulesRepository.update(id, schedule);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.schedulesRepository.delete(id);
  }
}
