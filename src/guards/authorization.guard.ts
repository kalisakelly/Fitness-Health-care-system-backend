import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No roles required for this route
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new UnauthorizedException('User roles are not defined');
    }

    const hasRole = () => user.roles.some((role) => roles.includes(role));
    if (!hasRole()) {
      throw new UnauthorizedException('You do not have the required roles');
    }

    return true;
  }
}
