import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { NutrCategory } from "./nucategory.enum";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Nutrition {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: NutrCategory, default: NutrCategory.Cabohydrate })
    category: NutrCategory;

    @CreateDateColumn()
    creationdate: Date;

    @UpdateDateColumn()
    updatedate: Date;

    @Column()
    image: string;

    @ManyToOne(() => User, user => user.nutrient)
    UploadedBy: User;
}
