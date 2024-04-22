import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/auth/decorator/roles.decorator";


@Injectable()

export class AuthorizationGuard implements CanActivate{

    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        const getrequiredroles= this.reflector.get(ROLES_KEY,context.getClass());
        console.log("inside authorizationGuard",getrequiredroles)

        const userrole = request.user.role;

        if(getrequiredroles!== userrole) return false;
        
        return true;

    }

}