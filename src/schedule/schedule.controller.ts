import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { Schedule } from "./entities/schedule.entity";
import { ScheduleService } from "./schedule.service";

@Controller("schedules")
@UseGuards(AuthenticationGuard)
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly userservice: UsersService,
  ) {}

  // @Get()
  // findAll(): Promise<Schedule[]> {
  //   return this.scheduleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<Schedule> {
  //   return this.scheduleService.findOne(id);
  // }

  @Post()
  create(@Body() createScheduledto: CreateScheduleDto, @Req() req: any) {
    const userId = req.user.id;
    return this.scheduleService.create(createScheduledto, userId);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() schedule: Partial<Schedule>,
  ): Promise<Schedule> {
    return this.scheduleService.update(id, schedule);
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.scheduleService.remove(id);
  }

  // @Get('myschedule')
  // async myschedule(@Req() req: any): Promise<Schedule[]> {
  //   const userId = req.user.id;
  //   console.log('User ID:', userId); // Log user ID for debugging
  //   return this.scheduleService.myschedule(userId);
  // }

  @Get()
  async getSchedules(@Req() req: any) {
    const user = req.user.id;
    return this.scheduleService.getSchedulesByUserId(user);
  }
}
