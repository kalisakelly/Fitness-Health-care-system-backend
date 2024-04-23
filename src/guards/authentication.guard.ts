import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import * as dotenv from 'dotenv';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    private readonly jwtSecret: string;

    constructor(private jwtService: JwtService) {
        // Load environment variables from .env file
        dotenv.config();
        this.jwtSecret = process.env.JWT_SECRET;
        if (!this.jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        // Extract the token from the Authorization header
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid Authorization header');
        }
        const token = authHeader.split(' ')[1];

        try {
            // Verify the token and decode its payload using the retrieved secret key
            const decodedToken = this.jwtService.verify(token, { secret: this.jwtSecret });  
            // Attach the decoded user information to the request for further processing
            request.user = decodedToken;            
            // Allow access to the protected route
            return true;
        } catch (error) {
            // Catch any token verification errors and handle them appropriately
            console.error(error);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
