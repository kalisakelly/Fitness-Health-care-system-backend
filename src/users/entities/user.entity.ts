import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, BaseEntity } from 'typeorm';
import { Role } from './role.enum';
import { Userdetail } from 'src/userdetails/entities/userdetail.entity';
import { Video } from 'src/videos/entities/video.entity';
import { Nutrition } from 'src/nutrition/entities/nutrition.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { Postreply } from 'src/postreplies/entities/postreply.entity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    userid: number;

    @Column({ unique: true })
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @CreateDateColumn()
    createdate: Date;

    @UpdateDateColumn()
    updatedate: Date;

    @OneToOne(() => Userdetail, userDetails => userDetails.user)
    userDetails: Userdetail;

    @OneToOne(() => Video, (video) => video.watchedby)
    Watchedvideos: Video[];

    @Column({nullable:true})
    profile: string;

    @Column({nullable:true})
    OTP: number;

    @OneToMany(() => Video, (video) => video.Likedby)
    likedvideos: Video[];

    @OneToMany(() => Nutrition, nutrition => nutrition.UploadedBy)
    nutrient: Nutrition[];

    @Column({ nullable: true }) // Phone Number
    phoneNumber: string;

    @Column({ nullable: true }) // Address
    address: string;

    @Column({ nullable: true }) // Emergency Contact Information
    emergencyContact: string;

    @OneToMany(() => Blog, (blog) => blog.createdby)
    Posts: Blog[];

    @OneToMany(()=>Video,(video)=>video.UploadedBy)
    videosupload:Video[];

    @OneToMany(()=>Postreply,(postreply)=>postreply.Commentedby)
    postreply:Postreply[];
}
