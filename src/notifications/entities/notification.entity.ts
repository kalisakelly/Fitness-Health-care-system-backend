import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => User, user => user.notifications)
  user: User;

  @Column()
  createdAt: Date;
}
