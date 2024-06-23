import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.find();
  }

  findOne(id: number): Promise<Schedule> {
    return this.schedulesRepository.findOneBy({ id });
  }

  async create(schedule: Partial<Schedule>, user: User): Promise<Schedule> {
    const newSchedule = this.schedulesRepository.create({
      ...schedule,
      createdBy: user,
    });

    return this.schedulesRepository.save(newSchedule);
  }

  async update(id: number, schedule: Partial<Schedule>): Promise<Schedule> {
    await this.schedulesRepository.update(id, schedule);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.schedulesRepository.delete(id);
  }
  async findByUserId(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { userid: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async myschedule(userId: number): Promise<Schedule[]> {
    try {
      const user = await this.findByUserId(userId);

      const schedules = await this.schedulesRepository.createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.createdBy', 'user')
        .where('user.id = :userId', { userId })
        .getMany();

      if (!schedules || schedules.length === 0) {
        throw new NotFoundException('Schedules not found');
      }

      return schedules;
    } catch (error) {
      throw new Error(`Error fetching schedules: ${error.message}`);
    }
  }
}
