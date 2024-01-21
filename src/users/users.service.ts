import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { Userdto } from "./dto/user.dto";

export class UserService {

    constructor( @InjectRepository(User) private usersrepository:Repository<User>){}

    async getallusers(){
        const users = this.usersrepository.find();
        return users;
    }
    async getUserById(id:number){
        const user = this.usersrepository.findOne({
            where: {id:id},
        });
        if(user){
            return user;
        }
        throw new NotFoundException("User not found");
    }

    async createuser(createuserdto:Userdto){
        const newuser = await this.usersrepository.create(createuserdto);
        await this.usersrepository.save({
            fullname:createuserdto.fullname,
            email:createuserdto.email,
            password:createuserdto.password,
        });
        return newuser;
    }

    async deleteById(id:number){
        const user = await this.usersrepository.findOne({
            where:{id:id},
        });
        if(!user){
            return null;
        }
        await this.usersrepository.remove(user);
        return user;
    }

}