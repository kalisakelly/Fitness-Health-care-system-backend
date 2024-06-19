import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './entities/schedule.entity';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Schedule> {
    return this.scheduleService.findOne(id);
  }

  @Post()
  create(@Body() schedule: Partial<Schedule>): Promise<Schedule> {
    return this.scheduleService.create(schedule);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() schedule: Partial<Schedule>): Promise<Schedule> {
    return this.scheduleService.update(id, schedule);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.scheduleService.remove(id);
  }
}
