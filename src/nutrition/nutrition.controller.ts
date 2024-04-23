import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';



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
  constructor(private readonly nutritionService: NutritionService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @UploadedFile() image,
    @Body('name') name: string,
    @Body('description') description: string,
    @Req() req: any, // Inject the request object
  ) {
    // Extract the authenticated user from the request object
    const user = req.user.id;

    // Create the nutrition entity with the associated user
    const newNutrition = {
      name,
      description,
      image: image.filename,
      UploadedBy: user, // Associate the nutrition with the authenticated user
    };

    // Call the nutrition service to create the nutrition
    await this.nutritionService.create(newNutrition,user);

    return { message: 'New nutrition saved successfully!' };
  }


  @Get()
  findAll() {
    return this.nutritionService.findAll();
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
}
