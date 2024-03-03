import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categories.enum";

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    Id: string;

    @Column()
    name:string;

    @Column()
    file:string;

    @Column({type:'enum',enum:Category,default:Category.Yoga})
    category:Category;

    @Column()
    description:string;

    

}
