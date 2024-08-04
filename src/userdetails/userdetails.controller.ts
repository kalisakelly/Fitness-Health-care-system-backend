import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { User } from "src/users/entities/user.entity";
import { CreateUserdetailDto } from "./dto/create-userdetail.dto";
import { UpdateUserdetailDto } from "./dto/update-userdetail.dto";
import { Userdetail } from "./entities/userdetail.entity";
import { UserdetailsService } from "./userdetails.service";
import { kill } from "process";

@UseGuards(AuthenticationGuard)
@Controller("userdetails")
export class UserdetailsController {
  constructor(private readonly userdetailsService: UserdetailsService) {}

  @Post("/create")
  create(@Body() createUserdetailDto: CreateUserdetailDto, @Req() req: any) {
    const user = req.user.id;
    console.log("Successfully saved");  // Log the received data
    return this.userdetailsService.create(createUserdetailDto, user);
}


  @Get()
  findAll() {
    return this.userdetailsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userdetailsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserdetailDto: UpdateUserdetailDto,
  ) {
    return this.userdetailsService.update(+id, updateUserdetailDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userdetailsService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get("/user/test")
  async getUserdetailsByUserId(@Req() req: any) {
      const userId: number = req.user.id; // Correctly extract user ID from the request
      return this.userdetailsService.findByUser(userId); // Pass user ID to the service method
  }

  @Get(':id/recommendations')
  async getRecommendations(@Req() req: any) {
    const userId: number = req.user.id;
    const userDetail: Userdetail = await this.userdetailsService.findByUser(userId);
    
    if (!userDetail) {
      throw new NotFoundException('User not found');
    }

    const nutritionRecommendation = this.userdetailsService.getNutritionRecommendation(userDetail);
    const exerciseRecommendation = this.userdetailsService.getExerciseRecommendation(userDetail);

    return {
      nutritionRecommendation,
      exerciseRecommendation,
    };
  }

  @Get("download/excel")
  async downloadUserDetailsExcel(@Req() req: any, @Res() res: Response) {
    const userId = req.user.id;
    const userDetails = await this.userdetailsService.findByUserId(userId);
    console.log(userDetails); // Add this line
    if (userDetails.length === 0) {
      return res.status(404).send("No user details found");
    }
    await this.userdetailsService.exportToExcel(userDetails, res);
  }

  @Get("download/pdf")
  async downloadUserDetailsPDF(@Req() req: any, @Res() res: Response) {
    const userId = req.user.id;
    const userDetails = await this.userdetailsService.findByUserId(userId);
    await this.userdetailsService.exportToPDF(userDetails, res);
  }

  @Get("/pdf")
  async downloadUserDetailsPDF1(@Req() req: any, @Res() res: Response) {
    try {
      const userId = req.user.id;
      const userDetails = await this.userdetailsService.findByUserId(userId);
      if (userDetails.length === 0) {
        return res.status(404).send("No user details found");
      }
      await this.userdetailsService.exportToPDF1(userDetails[0], res);
    } catch (error) {
      console.error("Error generating PDF:", error.message);
      return res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  }

  @Get('/user/:userId')
    async getUserDetails(@Param('userId') userId: number) {
    return this.userdetailsService.findByUserId(userId);
  }

  @Get('bmi/stats')
  async getBMIStats(@Req() req: any) {
    const result = await this.userdetailsService.getBMIStats();
    return result;
  }


}
