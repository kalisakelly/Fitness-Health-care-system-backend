import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/auth/decorator/roles.decorator";
import { UsersService } from "src/users/users.service";


@Injectable()

export class AuthorizationGuard implements CanActivate{

    constructor(
        private reflector:Reflector,
        private useservice:UsersService

    ){}


    async canActivate(context: ExecutionContext): Promise<boolean>  {

        const request = context.switchToHttp().getRequest();
        const roles= this.reflector.get<string[]>(ROLES_KEY,context.getHandler());
        
        if(request?.user){
            
            const {id} = request.user;
            
            const user = await this.useservice.findOne(id)

            return roles.includes(user.role)
        }

        return false

    }  

   

}