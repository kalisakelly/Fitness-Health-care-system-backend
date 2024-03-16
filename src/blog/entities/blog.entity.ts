import { Entity , Column , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany ,  } from "typeorm";
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

    @Column()
    createdby:string

    @UpdateDateColumn()
    updatedat:Date

    @ManyToMany(()=>User,(user)=>user.Posts)
    Postedby:User


    
}

