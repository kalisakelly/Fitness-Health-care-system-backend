import { Blog } from "src/blog/entities/blog.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Postreply  extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => Blog, blog => blog.postreply)
  blog: Blog;

  @ManyToOne(() => User, user => user.postreply)
  createdBy: User;

  @CreateDateColumn()
  createdAt
}
