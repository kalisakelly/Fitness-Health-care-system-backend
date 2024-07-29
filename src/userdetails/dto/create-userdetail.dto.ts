import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min, IsIn, IsString } from 'class-validator';

export class CreateUserdetailDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Height cannot be negative' })
  @IsOptional()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Mass cannot be negative' })
  @IsOptional()
  mass: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0, { message: 'BMI cannot be negative' })
  @IsOptional()
  BMI: number;

  @IsString()
  @IsIn(['male', 'female'], { message: 'Gender must be either "male" or "female"' })
  gender: string;

  @IsString()
  @IsOptional()
  @IsIn(['Good', 'Poor', 'Excellent'], { message: 'Health status not defined' })
  healthstatus: string;

  @IsString()
  @IsOptional()
  dietaryPreferences?: string;

  @IsString()
  @IsOptional()
  medicalHistory?: string;

  @IsString()
  @IsOptional()
  fitnessGoals?: string;

  @IsString()
  @IsOptional()
  currentFitnessLevel?: string;

  @IsString()
  @IsOptional()
  sleepPatterns?: string;

  @IsString()
  @IsOptional()
  stressLevel?: string;

  @IsNumber()
  @IsOptional()
  waistCircumference?: number;

  @IsNumber()
  @IsOptional()
  hipCircumference?: number;

  @IsNumber()
  @IsOptional()
  bodyFatPercentage?: number;

  @IsString()
  @IsOptional()
  bloodPressure?: string;

  @IsString()
  @IsOptional()
  cholesterolLevels?: string;

  @IsString()
  @IsOptional()
  bloodSugarLevels?: string;

  @IsString()
  @IsOptional()
  fitnessAssessmentResults?: string;

  @IsString()
  @IsOptional()
  activityTrackingData?: string;

  @IsString()
  @IsOptional()
  nutritionalIntake?: string;

  @IsString()
  @IsOptional()
  hydrationLevel?: string;

  @IsString()
  @IsOptional()
  mentalHealthInfo?: string;

  @IsString()
  @IsOptional()
  injuryHistory?: string;

  @IsString()
  @IsOptional()
  socialSupportNetwork?: string;
}
