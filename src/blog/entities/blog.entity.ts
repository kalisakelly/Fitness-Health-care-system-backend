import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Status } from "./status.enum";
import { User } from "src/users/entities/user.entity";
import { Postreply } from "src/postreplies/entities/postreply.entity";

@Entity()
export class Blog extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ type: 'enum', enum: Status, default: Status.Pending })
  status: Status;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @ManyToOne(() => User, (user) => user.Posts)
  createdby: User;

  @OneToMany(() => Postreply, (postreply) => postreply.blog)
  postreply: Postreply[];

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  views: number;
}
