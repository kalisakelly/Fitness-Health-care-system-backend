import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    Id: string;

    @Column()
    name:string;
    

}
