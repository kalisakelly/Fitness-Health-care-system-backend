import { Entity , Column , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne ,  } from "typeorm";
import { Status } from "./status.enum";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    body:string

    @Column({type:'enum',enum:Status,default:Status.Pending})
    status:Status

    @CreateDateColumn()
    createdat:Date

    @UpdateDateColumn()
    updatedat:Date

    @ManyToOne(()=>User,(user)=>user.Posts)
    createdby:User


    
}

