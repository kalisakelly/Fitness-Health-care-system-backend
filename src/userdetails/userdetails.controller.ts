import {
  BadRequestException,
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
import * as XLSX from 'xlsx';


@Controller("userdetails")
export class UserdetailsController {
  constructor(private readonly userdetailsService: UserdetailsService) {}

  @Post("/create")
  @UseGuards(AuthenticationGuard)
  async create(@Body() createUserdetailDto: CreateUserdetailDto, @Req() req: any) {
    try {
      const user = req.user.id;
      console.log("Received data:", createUserdetailDto);  // Log the received data
      return await this.userdetailsService.create(createUserdetailDto, user);
    } catch (error) {
      console.error('Error creating user details:', error);
      throw new BadRequestException('Validation failed or other error');
    }
  }


  @Get()
  @UseGuards(AuthenticationGuard)
  findAll() {
    return this.userdetailsService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthenticationGuard)
  findOne(@Param("id") id: string) {
    return this.userdetailsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthenticationGuard)
  update(
    @Param("id") id: string,
    @Body() updateUserdetailDto: UpdateUserdetailDto,
  ) {
    return this.userdetailsService.update(+id, updateUserdetailDto);
  }

  @Delete(":id")
  @UseGuards(AuthenticationGuard)
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
  @UseGuards(AuthenticationGuard)
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
  @UseGuards(AuthenticationGuard)
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
  @UseGuards(AuthenticationGuard)
  async downloadUserDetailsPDF(@Req() req: any, @Res() res: Response) {
    const userId = req.user.id;
    const userDetails = await this.userdetailsService.findByUserId(userId);
    await this.userdetailsService.exportToPDF(userDetails, res);
  }

  @Get("/pdf")
  @UseGuards(AuthenticationGuard)
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
  @UseGuards(AuthenticationGuard)
    async getUserDetails(@Param('userId') userId: number) {
    return this.userdetailsService.findByUserId(userId);
  }

  @Get('bmi/stats')
  async getBMIStats() {
    try {
      const result = await this.userdetailsService.getBMIStats();
      return result;
    } catch (error) {
      console.error('Error fetching BMI stats:', error.message);
      throw new Error('Could not fetch BMI statistics');
    }
  }

  
  @Get('user-details/excel')
  async exportUserReportToExcel(@Res() res: Response) {
    const userDetails = await this.userdetailsService.getUserReport();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(userDetails);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'UserDetails');
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="userdetails.xlsx"',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buf);
  }
 
  @Get('user-details')
  async getUserReport() {
    return this.userdetailsService.getUserReport();
  }

}
