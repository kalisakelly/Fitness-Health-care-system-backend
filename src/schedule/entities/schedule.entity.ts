import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
