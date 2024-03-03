import { Column , Entity , PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn , OneToOne , OneToMany, JoinColumn } from 'typeorm'
import { Role } from './role.enum'
import { Userdetail } from 'src/userdetails/entities/userdetail.entity'
import Joi from '@hapi/joi'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userid: number

    @Column({ unique:true })
    email: string
    
    @Column()
    usernames: string

    @Column()
    password: string

    @Column({type:'enum',enum:Role,default:Role.User})
    role: Role

    @CreateDateColumn()
    createdat: Date

    @UpdateDateColumn()
    updatedat: Date

    @OneToOne(() => Userdetail, userDetails => userDetails.user)
    userDetails: Userdetail;

    @Column()
    Watchedvideos:string
    
    

}