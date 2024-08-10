import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { NutrCategory } from './nucategory.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Nutrition extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    category: string;

    @CreateDateColumn()
    creationdate: Date;

    @UpdateDateColumn()
    updatedate: Date;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => User, user => user.nutrient)
    UploadedBy: User;
}
