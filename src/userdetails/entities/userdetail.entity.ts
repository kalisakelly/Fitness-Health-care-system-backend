import { User } from "src/users/entities/user.entity";
import { OneToOne, Column, Entity , PrimaryGeneratedColumn , JoinColumn } from "typeorm";
import { Physicalactivities } from "./physicalactivities.enum";

@Entity('Userdetails')
export class Userdetail {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable:true})
    name: string;

    @OneToOne(() => User, user => user.userDetails)
    @JoinColumn()
    user: User;

    @Column()
    height: number;

    @Column()
    mass: number;

    @Column()
    age: number;

    @Column({nullable:true})
    BMI: number;

    @Column()
    healthstatus: string;

    // Additional Fields
    @Column({ nullable: true }) // Gender
    gender: string;

    @Column({ type: 'date', nullable: true }) // Date of Birth
    dateOfBirth: Date;

    @Column({ type:'enum' , enum:Physicalactivities,default:Physicalactivities.Moderately_active_lifestyle }) // Physical Activity Level
    physicalActivityLevel: Physicalactivities;

    @Column({ nullable: true }) // Dietary Preferences/Restrictions
    dietaryPreferences: string;

    @Column({ nullable: true }) // Medical History
    medicalHistory: string;

    @Column({ nullable: true }) // Fitness Goals
    fitnessGoals: string;

    @Column({ nullable: true }) // Current Fitness Level
    currentFitnessLevel: string;

    @Column({ nullable: true }) // Sleep Patterns
    sleepPatterns: string;

    @Column({ nullable: true }) // Stress Level
    stressLevel: string;

    @Column({ nullable: true }) // Body Measurements
    waistCircumference: number;

    @Column({ nullable: true })
    hipCircumference: number;

    @Column({ nullable: true })
    bodyFatPercentage: number;

    @Column({ nullable: true }) // Blood Pressure
    bloodPressure: string;

    @Column({ nullable: true }) // Cholesterol Levels
    cholesterolLevels: string;

    @Column({ nullable: true }) // Blood Sugar Levels
    bloodSugarLevels: string;

    @Column({ nullable: true }) // Fitness Assessment Results
    fitnessAssessmentResults: string;

    @Column({ nullable: true }) // Activity Tracking Data
    activityTrackingData: string;

    @Column({ nullable: true }) // Nutritional Intake
    nutritionalIntake: string;

    @Column({ nullable: true }) // Hydration Level
    hydrationLevel: string;

    @Column({ nullable: true }) // Mental Health Information
    mentalHealthInfo: string;

    @Column({ nullable: true }) // Injury History
    injuryHistory: string;

    @Column({ nullable: true }) // Social Support Network
    socialSupportNetwork: string;

    

}

