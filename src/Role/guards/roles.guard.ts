import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return await this.matchRoles(roles, user.roles);
  }


  async matchRoles(requiredRoles: string[], userRoles: string[]): Promise<boolean> {
    if (userRoles.includes('admin')) {
      return true;
    }
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
