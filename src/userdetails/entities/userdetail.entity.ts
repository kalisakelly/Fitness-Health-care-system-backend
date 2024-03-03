import { User } from "src/users/entities/user.entity";
import { OneToOne, Column, Entity , PrimaryGeneratedColumn , JoinColumn } from "typeorm";

@Entity('Userdetails')
export class Userdetail {

    @PrimaryGeneratedColumn()
    Id: string;
    @Column()
    name: string;

    @OneToOne(() => User, user => user.userDetails)
    @JoinColumn()
    user: User;

    @Column()
    height:number

    @Column()
    mass:number

    @Column()
    age:number

    @Column()
    BMI:number

    @Column()
    healthstatus:string
    

}
