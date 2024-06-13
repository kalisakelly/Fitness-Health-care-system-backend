import { Injectable } from '@nestjs/common';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdetail } from './entities/userdetail.entity';
import * as XLSX from 'xlsx';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';


@Injectable()
export class UserdetailsService {
  constructor(
    @InjectRepository(Userdetail)
    private userdetailrepository: Repository<Userdetail>,
  ) {}

  async create(createUserdetailDto: CreateUserdetailDto,owner): Promise<Userdetail> {
    const newUserdetail = this.userdetailrepository.create(
      {
        ...createUserdetailDto,
        user:owner
      }
    );
    return this.userdetailrepository.save(newUserdetail);
  }

  async findAll(): Promise<Userdetail[]> {
    return this.userdetailrepository.find();
  }

  async findOne(id: number): Promise<Userdetail> {
    return this.userdetailrepository.findOneBy({id});
  }
 
  // async findByUserId(userId: number): Promise<Userdetail[]> {
  //   return this.userdetailrepository.find({ where: { id: userId } });
  // }

  async update(
    user, // Assuming you have the authenticated user's ID
    updateUserdetailDto: UpdateUserdetailDto,
  ): Promise<Userdetail> {
    // Find user details by user ID
    const userdetail = await this.userdetailrepository.findOne({ where: { user } });

    // If user details do not exist, throw an exception
    if (!userdetail) {
      throw new Error(`User details for user with ID ${user} not found`);
    }

    // Update user details with provided data
    Object.assign(userdetail, updateUserdetailDto);

    // Save the updated user details to the database
    return this.userdetailrepository.save(userdetail);
  }
  
  async remove(id: number): Promise<void> {
    const userdetail = await this.userdetailrepository.findOneBy({id});
    if (!userdetail) {
      throw new Error(`Userdetail with id ${id} not found`);
    }
    await this.userdetailrepository.remove(userdetail);
  }



  getNutritionRecommendation(userDetail: Userdetail): string {
    const { healthstatus, dietaryPreferences, age } = userDetail;
    
    if (healthstatus === 'Underweight') {
        return 'High-calorie diet with nutrient-dense foods';
    } else if (healthstatus === 'Healthy weight') {
        return 'Balanced diet with a mix of all food groups';
    } else if (healthstatus === 'Overweight' || healthstatus === 'Obesity') {
        return 'Low-calorie diet with a focus on whole foods';
    } else {
        return 'General healthy diet';
    }
}

getExerciseRecommendation(userDetail: Userdetail): string {
    const { fitnessGoals, currentFitnessLevel, physicalActivityLevel } = userDetail;

    if (fitnessGoals.includes('weight loss')) {
        return 'Combination of cardio and strength training, at least 150 minutes of moderate activity per week';
    } else if (fitnessGoals.includes('muscle gain')) {
        return 'Strength training exercises targeting all major muscle groups, 3-4 times per week';
    } else if (fitnessGoals.includes('endurance')) {
        return 'Cardio exercises such as running, cycling, or swimming, gradually increasing intensity';
    } else {
        return 'General fitness regime with a mix of cardio, strength, and flexibility exercises';
    }
}

async findByUserId(userId: number): Promise<Userdetail[]> {
  return this.userdetailrepository.find({ where: { user: { userid: userId } } });
}

async exportToExcel(userDetails: Userdetail[], res: Response) {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(userDetails);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'UserDetails');
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename="userdetails.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
}

async exportToPDF(userDetails: Userdetail[], res: Response) {
  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.setHeader('Content-Disposition', 'attachment; filename="userdetails.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfData);
  });

  doc.fontSize(16).text('User Details Report', { align: 'center' });
  doc.moveDown();
  userDetails.forEach(userDetail => {
    doc.fontSize(12).text(`Name: ${userDetail.name}`);
    doc.text(`Height: ${userDetail.height}`);
    doc.text(`Mass: ${userDetail.mass}`);
    doc.text(`BMI: ${userDetail.BMI}`);
    doc.text(`Health Status: ${userDetail.healthstatus}`);
    // Add other fields as needed
    doc.moveDown();
  });

  doc.end();
}
}
