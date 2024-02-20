import { Column , Entity , PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique:true })
    email: string
    
    @Column()
    usernames: string

    @Column()
    password: string

    @CreateDateColumn()
    createdat: Date

    @UpdateDateColumn()
    updatedat: Date
    
    

}