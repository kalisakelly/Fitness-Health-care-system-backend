import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  hour: number;

  @Column()
  minute: number;

  @Column({nullable:false})
  Details: string;

  @ManyToOne(()=>User,(user)=>user.myschedule)
  createdBy:User;
}
