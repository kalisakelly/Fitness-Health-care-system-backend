import { User } from "src/users/entities/user.entity";
import { OneToOne, Column, Entity , PrimaryGeneratedColumn , JoinColumn } from "typeorm";

@Entity('Userdetails')
export class Userdetail {

    @PrimaryGeneratedColumn()
    Id: string;
    @Column()
    name: string;
    @OneToOne((type)=>User)
    @JoinColumn({name:"UserID"})
    user:User
}
