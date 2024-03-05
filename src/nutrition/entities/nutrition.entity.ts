import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { NutrCategory } from "./nucategory.enum";

@Entity()
export class Nutrition {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    description:string

    @Column({type:'enum',enum:NutrCategory,default:NutrCategory.Cabohydrate})
    
    category:NutrCategory

    @CreateDateColumn()
    creationdate:Date

}
