import { Body,Controller,Get,Param,Post,Delete } from "@nestjs/common";
import { User } from "./users.entity";
import { UserService } from "./users.service"
import  {Userdto} from "./dto/user.dto"

@Controller('Users')

export class UsersController
{
    constructor( private readonly usersService:UserService){}
    

    @Get()
    async getallusers():Promise<User[]>{
        const users =await this.usersService.getallusers();
        return users;
    }

    @Get(':id')
    async getuserbyid(id:string):Promise<User>{
        const users =await this.usersService.getUserById(Number(id));
        return users;
    }
    @Post()
    async createuser(@Body( ) createuserdto:Userdto):Promise<User>{
        const newUser=await this.usersService.createuser(createuserdto);
        return newUser;
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string): Promise<User> {
    const user = this.usersService.deleteById(Number(id));
    return user;
  }
}
