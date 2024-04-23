import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserdetailsService } from './userdetails.service';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';

@Controller('userdetails')
export class UserdetailsController {
  constructor(private readonly userdetailsService: UserdetailsService) {}

  @Post()
  create(@Body() createUserdetailDto: CreateUserdetailDto) {
    return this.userdetailsService.create(createUserdetailDto);
  }

  @Get()
  findAll() {
    return this.userdetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userdetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserdetailDto: UpdateUserdetailDto) {
    return this.userdetailsService.update(+id, updateUserdetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userdetailsService.remove(+id);
  }

  @Post('calculate-bmi') // Endpoint to calculate BMI
  calculateBMI(@Body() body: { height: number, mass: number }) {
    const { height, mass } = body;
    const bmi = this.userdetailsService.bodyBMI(height, mass);
    return { bmi }; // Return the calculated BMI
  }
}
