import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Postreply {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    body:string

    @Column()
    post:number

    @Column()
    Commentedby:string
}
