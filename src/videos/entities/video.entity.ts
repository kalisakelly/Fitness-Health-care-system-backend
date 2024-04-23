import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./categories.enum";
import { User } from "src/users/entities/user.entity";
import { UserConfig } from "vite";

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    file:string;

    @Column({type:'enum',enum:Category,default:Category.Yoga})
    category:Category;

    @Column()
    description:string;

    @CreateDateColumn()
    createdate: Date

    @UpdateDateColumn()
    updatedate: Date

    @ManyToOne(()=>User,(user)=>user.likedvideos)
    Likedby:User

    @ManyToOne(()=>User,(user)=>user.videosupload)
    UploadedBy:User

    @OneToOne(()=>User,(user)=>user.Watchedvideos)
    watchedby:User



}
