import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Postreply {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    body:string

    @Column({nullable:true})
    post:number

    @Column({nullable:true})
    Commentedby:string
}
