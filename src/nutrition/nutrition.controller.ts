import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';



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
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @UploadedFile()Image,
    @Body('name') name: string,
    @Body('description') description: string,
   ) {

      const newnutri = {
        name,
        description,
        image:Image.filename,
      }
    const savenutri = await this.nutritionService.create(newnutri)
    return {message:'New nutrition saved successfully!'};
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
