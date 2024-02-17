import { Column , Entity , PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn } from 'typeorm'

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
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