import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from '../../users/entities/user.entity';  // Adjust the import based on your directory structure
import { Physicalactivities } from './physicalactivities.enum';

@Entity('Userdetails')
export class Userdetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @OneToOne(() => User, user => user.userDetails)
    @JoinColumn()
    user: User;

    @Column()
    height: number; // Assume height is in cm

    @Column()
    mass: number; // Assume mass is in kg

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    BMI: number;

    @Column({ nullable: true })
    healthstatus: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    yearofbirth: number;

    @Column({
        type: 'enum', enum: Physicalactivities,
        default: Physicalactivities.Moderately_active_lifestyle
    })
    physicalActivityLevel: Physicalactivities;

    @Column({ nullable: true })
    dietaryPreferences: string;

    @Column({ nullable: true })
    medicalHistory: string;

    @Column({ nullable: true })
    fitnessGoals: string;

    @Column({ nullable: true })
    currentFitnessLevel: string;

    @Column({ nullable: true })
    sleepPatterns: string;

    @Column({ nullable: true })
    stressLevel: string;

    @Column({ nullable: true })
    waistCircumference: number;

    @Column({ nullable: true })
    hipCircumference: number;

    @Column({ nullable: true })
    bodyFatPercentage: number;

    @Column({ nullable: true })
    bloodPressure: string;

    @Column({ nullable: true })
    cholesterolLevels: string;

    @Column({ nullable: true })
    bloodSugarLevels: string;

    @Column({ nullable: true })
    fitnessAssessmentResults: string;

    @Column({ nullable: true })
    activityTrackingData: string;

    @Column({ nullable: true })
    nutritionalIntake: string;

    @Column({ nullable: true })
    hydrationLevel: string;

    @Column({ nullable: true })
    mentalHealthInfo: string;

    @Column({ nullable: true })
    injuryHistory: string;

    @Column({ nullable: true })
    socialSupportNetwork: string;

    // Method to calculate BMI
    calculateBMI(): number {
        if (this.height && this.mass) {
            const heightInMeters = this.height / 100;
            const bmi = this.mass / (heightInMeters * heightInMeters);
            return isNaN(bmi) ? null : bmi;
        }
        return null;
    }

    // Method to determine health status
    determineHealthStatus(): string {
        if (this.BMI) {
            if (this.BMI < 18.5) {
                return 'Underweight';
            } else if (this.BMI >= 18.5 && this.BMI < 24.9) {
                return 'Healthy weight';
            } else if (this.BMI >= 25 && this.BMI < 29.9) {
                return 'Overweight';
            } else {
                return 'Obesity';
            }
        }
        return 'Unknown';
    }

    @BeforeInsert()
    @BeforeUpdate()
    updateMetrics() {
        this.BMI = this.calculateBMI();
        this.healthstatus = this.determineHealthStatus();

        console.log('Updated Metrics:', {
            BMI: this.BMI,
            healthstatus: this.healthstatus,
            height: this.height,
            mass: this.mass
        });

        if (isNaN(this.BMI)) {
            throw new Error('Invalid BMI value: NaN');
        }
    }
}