import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./categories.enum";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Video extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    url:string;

    @Column()
    category: string;

    @Column()
    description:string;

    @Column({nullable:true})
    coverImage: string;

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
