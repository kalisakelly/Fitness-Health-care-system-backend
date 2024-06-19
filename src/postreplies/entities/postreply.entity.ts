import { Blog } from "src/blog/entities/blog.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Postreply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => Blog, blog => blog.postreply)
  blog: Blog;

  @ManyToOne(() => User, user => user.postreply)
  createdBy: User;
}
