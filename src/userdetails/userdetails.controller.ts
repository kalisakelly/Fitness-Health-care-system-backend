import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserdetailsService } from './userdetails.service';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Userdetail } from './entities/userdetail.entity';

@UseGuards(AuthenticationGuard)
@Controller('userdetails')
export class UserdetailsController {
  constructor(private readonly userdetailsService: UserdetailsService) {}

  @Post()
  create(
    @Body() createUserdetailDto: CreateUserdetailDto,
    @Req()req:any) {
      const user = req.user.id;
      return this.userdetailsService.create(createUserdetailDto,user);
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

  @Get('/user/:userId')
  async getUserdetailsByUserId(@Param('userId') userId: number): Promise<Userdetail[]> {
    return this.userdetailsService.findByUserId(userId);
  }


  @Get(':id/recommendations')
  async getRecommendations(@Param('id') id: number) {
      const userDetail: Userdetail = await this.userdetailsService.findOne(id);
      const nutritionRecommendation = this.userdetailsService.getNutritionRecommendation(userDetail);
      const exerciseRecommendation = this.userdetailsService.getExerciseRecommendation(userDetail);

      return {
          nutritionRecommendation,
          exerciseRecommendation
      };
  }
}
