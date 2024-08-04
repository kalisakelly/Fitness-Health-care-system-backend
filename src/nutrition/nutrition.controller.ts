import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req, Query } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UsersService } from 'src/users/users.service';




const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});

@Controller('nutrition')

export class NutritionController {
  constructor(
    private readonly nutritionService: NutritionService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService:UsersService,
    private readonly notificationsService:NotificationsService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('admin', 'nutritionist')
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body('name') name: string,
    @Body('description') description: string,
    @Req() req: any,
  ) {
    const user = req.user.id;

    // Upload image to Cloudinary
    const uploadResult = await this.cloudinaryService.uploadImage(image);

    const newNutrition = {
      name,
      description,
      image: uploadResult.secure_url, // Save the Cloudinary URL
      UploadedBy: user,
    };

    await this.nutritionService.create(newNutrition, user);

    // Notify all users about the new nutrition post
    const users = await this.usersService.findAll();
    for (const user of users) {
      await this.notificationsService.createNotification('A new nutrition post has been added!', user);
    }

    return { message: 'New nutrition saved successfully!' };
  }


  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('search') search: string = '',
    @Query('limit') limit: number = 6,
    @Query('sort') sort: string = 'desc',
  ) {
    return await this.nutritionService.findAll(page, search, limit, sort);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutritionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNutritionDto: UpdateNutritionDto) {
    return this.nutritionService.update(+id, updateNutritionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutritionService.remove(+id);
  }

  @Get('count/nutrition')
  async getNutritionCount() {
  
    const count = await this.nutritionService.countNutrition();
    return { count };
    
  }
}
