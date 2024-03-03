import { Entity , Column , PrimaryGeneratedColumn, CreateDateColumn ,  } from "typeorm";
import { Status } from "./status.enum";

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


    
}

