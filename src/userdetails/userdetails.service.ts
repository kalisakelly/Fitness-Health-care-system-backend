import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { log } from "console";
import { Response } from "express";
import * as PDFDocument from "pdfkit";
import { Repository } from "typeorm";
import * as XLSX from "xlsx";
import { CreateUserdetailDto } from "./dto/create-userdetail.dto";
import { UpdateUserdetailDto } from "./dto/update-userdetail.dto";
import { Userdetail } from "./entities/userdetail.entity";

@Injectable()
export class UserdetailsService {
  constructor(
    @InjectRepository(Userdetail)
    private userdetailrepository: Repository<Userdetail>,
  ) {}

  async create(
    createUserdetailDto: CreateUserdetailDto,
    owner,
  ): Promise<Userdetail> {
    const newUserdetail = this.userdetailrepository.create({
      ...createUserdetailDto,
      user: owner,
    });
    return this.userdetailrepository.save(newUserdetail);
  }

  async findAll(): Promise<Userdetail[]> {
    return this.userdetailrepository.find();
  }

  async findOne(id: number): Promise<Userdetail> {
    // This should be replaced with actual database fetch logic
    return this.userdetailrepository.findOne({ where: { id } });
  }
  // async findByUserId(userId: number): Promise<Userdetail[]> {
  //   return this.userdetailrepository.find({ where: { id: userId } });
  // }

  async update(
    user, // Assuming you have the authenticated user's ID
    updateUserdetailDto: UpdateUserdetailDto,
  ): Promise<Userdetail> {
    // Find user details by user ID
    const userdetail = await this.userdetailrepository.findOne({
      where: { user },
    });

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
    const userdetail = await this.userdetailrepository.findOneBy({ id });
    if (!userdetail) {
      throw new Error(`Userdetail with id ${id} not found`);
    }
    await this.userdetailrepository.remove(userdetail);
  }

  getNutritionRecommendation(userDetail: Userdetail): string {
    const { healthstatus, dietaryPreferences, age } = userDetail;

    if (healthstatus === "Underweight") {
      return "High-calorie diet with nutrient-dense foods";
    } else if (healthstatus === "Healthy weight") {
      return "Balanced diet with a mix of all food groups";
    } else if (healthstatus === "Overweight" || healthstatus === "Obesity") {
      return "Low-calorie diet with a focus on whole foods";
    } else {
      return "General healthy diet";
    }
  }

  getExerciseRecommendation(userDetail: Userdetail): string {
    const { fitnessGoals, currentFitnessLevel, physicalActivityLevel } =
      userDetail;

    if (fitnessGoals.includes("weight loss")) {
      return "Combination of cardio and strength training, at least 150 minutes of moderate activity per week";
    } else if (fitnessGoals.includes("muscle gain")) {
      return "Strength training exercises targeting all major muscle groups, 3-4 times per week";
    } else if (fitnessGoals.includes("endurance")) {
      return "Cardio exercises such as running, cycling, or swimming, gradually increasing intensity";
    } else {
      return "General fitness regime with a mix of cardio, strength, and flexibility exercises";
    }
  }

  async findByUserId(userId: number): Promise<Userdetail[]> {
    return this.userdetailrepository.find({
      where: { user: { userid: userId } },
    });
  }
  async findByUser(userId: number) {
    return this.userdetailrepository.findOne({
        where: { user: { userid: userId } },
    });
}

  async exportToExcel(userDetails: Userdetail[], res: Response) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(userDetails);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserDetails");
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="userdetails.xlsx"',
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.send(buf);
  }

  async exportToPDF(userDetails: Userdetail[], res: Response) {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="userdetails.pdf"',
      );
      res.setHeader("Content-Type", "application/pdf");
      res.send(pdfData);
    });

    doc.fontSize(16).text("User Details Report", { align: "center" });
    doc.moveDown();

    userDetails.forEach((userDetail) => {
      doc.fontSize(12).text(`Name: ${userDetail.name}`);
      doc.text(`Height: ${userDetail.height} cm`);
      doc.text(`Mass: ${userDetail.mass} kg`);
      doc.text(`BMI: ${userDetail.BMI}`);
      doc.text(`Gender: ${userDetail.gender}`);
      doc.text(`Health Status: ${userDetail.healthstatus}`);
      doc.text(`Year of Birth: ${userDetail.yearofbirth}`);
      doc.text(`Physical Activity Level: ${userDetail.physicalActivityLevel}`);
      doc.text(`Dietary Preferences: ${userDetail.dietaryPreferences}`);
      doc.text(`Medical History: ${userDetail.medicalHistory}`);
      doc.text(`Fitness Goals: ${userDetail.fitnessGoals}`);
      doc.text(`Current Fitness Level: ${userDetail.currentFitnessLevel}`);
      doc.text(`Sleep Patterns: ${userDetail.sleepPatterns}`);
      doc.text(`Stress Level: ${userDetail.stressLevel}`);
      doc.text(`Waist Circumference: ${userDetail.waistCircumference} cm`);
      doc.text(`Hip Circumference: ${userDetail.hipCircumference} cm`);
      doc.text(`Body Fat Percentage: ${userDetail.bodyFatPercentage} %`);
      doc.text(`Blood Pressure: ${userDetail.bloodPressure}`);
      doc.text(`Cholesterol Levels: ${userDetail.cholesterolLevels}`);
      doc.text(`Blood Sugar Levels: ${userDetail.bloodSugarLevels}`);
      doc.text(
        `Fitness Assessment Results: ${userDetail.fitnessAssessmentResults}`,
      );
      doc.text(`Activity Tracking Data: ${userDetail.activityTrackingData}`);
      doc.text(`Nutritional Intake: ${userDetail.nutritionalIntake}`);
      doc.text(`Hydration Level: ${userDetail.hydrationLevel}`);
      doc.text(`Mental Health Info: ${userDetail.mentalHealthInfo}`);
      doc.text(`Injury History: ${userDetail.injuryHistory}`);
      doc.text(`Social Support Network: ${userDetail.socialSupportNetwork}`);

      // Add a separator between users
      doc.moveDown();
      doc.fontSize(12).text("---------------------------------------------");
      doc.moveDown();
    });

    doc.end();
  }

  generateHealthDeductions(userDetails: Userdetail): string {
    const deductions = [];

    if (userDetails.BMI) {
      if (userDetails.BMI < 18.5) {
        deductions.push("Underweight");
      } else if (userDetails.BMI >= 18.5 && userDetails.BMI < 24.9) {
        deductions.push("Healthy weight");
      } else if (userDetails.BMI >= 25 && userDetails.BMI < 29.9) {
        deductions.push("Overweight");
      } else {
        deductions.push("Obesity");
      }
    }

    if (userDetails.bodyFatPercentage) {
      if (userDetails.gender === "male") {
        if (userDetails.bodyFatPercentage < 6) {
          deductions.push("Essential fat");
        } else if (
          userDetails.bodyFatPercentage >= 6 &&
          userDetails.bodyFatPercentage < 24
        ) {
          deductions.push("Athletes/Fitness");
        } else if (
          userDetails.bodyFatPercentage >= 24 &&
          userDetails.bodyFatPercentage < 31
        ) {
          deductions.push("Acceptable");
        } else {
          deductions.push("Obese");
        }
      } else if (userDetails.gender === "female") {
        if (userDetails.bodyFatPercentage < 14) {
          deductions.push("Essential fat");
        } else if (
          userDetails.bodyFatPercentage >= 14 &&
          userDetails.bodyFatPercentage < 31
        ) {
          deductions.push("Athletes/Fitness");
        } else if (
          userDetails.bodyFatPercentage >= 31 &&
          userDetails.bodyFatPercentage < 40
        ) {
          deductions.push("Acceptable");
        } else {
          deductions.push("Obese");
        }
      }
    }

    if (userDetails.bloodPressure) {
      const [systolic, diastolic] = userDetails.bloodPressure
        .split("/")
        .map(Number);
      if (systolic < 120 && diastolic < 80) {
        deductions.push("Normal blood pressure");
      } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
        deductions.push("Elevated blood pressure");
      } else if (
        (systolic >= 130 && systolic < 140) ||
        (diastolic >= 80 && diastolic < 90)
      ) {
        deductions.push("Hypertension stage 1");
      } else {
        deductions.push("Hypertension stage 2");
      }
    }

    return deductions.join(", ");
  }

  async exportToPDF1(userDetails: Userdetail, res: Response) {
    try {
      console.log("Exporting to PDF:", userDetails);

      const doc = new PDFDocument();
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        let pdfData = Buffer.concat(buffers);
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="user-details.pdf"',
        );
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfData);
      });

      doc.pipe(res);

      doc.fontSize(20).text("User Details", { align: "center" });
      doc.moveDown();

      // Function to handle NaN values and replace them with a default value
      const safeValue = (value: any, defaultValue: string = "N/A"): string => {
        if (typeof value === "number" && isNaN(value)) {
          console.warn(
            `Encountered NaN value: ${value}, replacing with default: ${defaultValue}`,
          );
          return defaultValue;
        }
        return value !== undefined && value !== null
          ? value.toString()
          : defaultValue;
      };

      // Add user details to PDF
      doc.fontSize(14).text(`Name: ${safeValue(userDetails.name)}`);
      doc.text(`Height: ${safeValue(userDetails.height, "0")} cm`);
      doc.text(`Mass: ${safeValue(userDetails.mass, "0")} kg`);
      doc.text(`BMI: ${safeValue(userDetails.BMI, "0")}`);
      doc.text(`Gender: ${safeValue(userDetails.gender)}`);
      doc.text(`Health Status: ${safeValue(userDetails.healthstatus)}`);
      doc.text(`Year of Birth: ${safeValue(userDetails.yearofbirth)}`);
      doc.text(
        `Physical Activity Level: ${safeValue(
          userDetails.physicalActivityLevel,
        )}`,
      );
      doc.text(
        `Dietary Preferences: ${safeValue(userDetails.dietaryPreferences)}`,
      );
      doc.text(`Medical History: ${safeValue(userDetails.medicalHistory)}`);
      doc.text(`Fitness Goals: ${safeValue(userDetails.fitnessGoals)}`);
      doc.text(
        `Current Fitness Level: ${safeValue(userDetails.currentFitnessLevel)}`,
      );
      doc.text(`Sleep Patterns: ${safeValue(userDetails.sleepPatterns)}`);
      doc.text(`Stress Level: ${safeValue(userDetails.stressLevel)}`);
      doc.text(
        `Waist Circumference: ${safeValue(
          userDetails.waistCircumference,
          "0",
        )} cm`,
      );
      doc.text(
        `Hip Circumference: ${safeValue(userDetails.hipCircumference, "0")} cm`,
      );
      doc.text(
        `Body Fat Percentage: ${safeValue(
          userDetails.bodyFatPercentage,
          "0",
        )} %`,
      );
      doc.text(`Blood Pressure: ${safeValue(userDetails.bloodPressure)}`);
      doc.text(
        `Cholesterol Levels: ${safeValue(userDetails.cholesterolLevels)}`,
      );
      doc.text(
        `Blood Sugar Levels: ${safeValue(userDetails.bloodSugarLevels)}`,
      );
      doc.text(
        `Fitness Assessment Results: ${safeValue(
          userDetails.fitnessAssessmentResults,
        )}`,
      );
      doc.text(
        `Activity Tracking Data: ${safeValue(
          userDetails.activityTrackingData,
        )}`,
      );
      doc.text(
        `Nutritional Intake: ${safeValue(userDetails.nutritionalIntake)}`,
      );
      doc.text(`Hydration Level: ${safeValue(userDetails.hydrationLevel)}`);
      doc.text(
        `Mental Health Info: ${safeValue(userDetails.mentalHealthInfo)}`,
      );
      doc.text(`Injury History: ${safeValue(userDetails.injuryHistory)}`);
      doc.text(
        `Social Support Network: ${safeValue(
          userDetails.socialSupportNetwork,
        )}`,
      );

      doc.moveDown();
      doc.fontSize(16).text("Health Deductions", { underline: true });
      doc.moveDown();

      doc.end();
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      throw new Error("Error exporting to PDF");
    }
  }

  async getBMIStats() {
    try {
      const query = `
        SELECT 
          SUM(CASE WHEN "BMI" >= 18.5 AND "BMI" < 24.9 THEN 1 ELSE 0 END) AS healthy,
          SUM(CASE WHEN "BMI" >= 24.9 THEN 1 ELSE 0 END) AS obese,
          SUM(CASE WHEN "BMI" < 18.5 THEN 1 ELSE 0 END) AS underweight
        FROM "Userdetails" u;
      `;
      
      const result = await this.userdetailrepository.query(query);
  
      return {
        healthy: parseInt(result[0].healthy, 10) || 0,
        obese: parseInt(result[0].obese, 10) || 0,
        underweight: parseInt(result[0].underweight, 10) || 0,
      };
    } catch (error) {
      console.error('Error fetching BMI stats:', error.message);
      throw new Error('Could not fetch BMI statistics');
    }
  }
  
}

