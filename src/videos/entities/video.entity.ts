import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./categories.enum";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    @ManyToOne(() => User, (user) => user.userid)
    Id: User;

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

    @Column()
    UploadedBy:string



}
