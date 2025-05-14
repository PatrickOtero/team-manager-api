import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

 canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.getAllAndMerge<string[]>(
    ROLES_KEY,
    [context.getHandler(), context.getClass()],
  );

  console.log('REQUIRED:', requiredRoles);

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const request = context.switchToHttp().getRequest();
  const user = request.user;

  console.log('ROLE GUARD > user:', user);

  if (!user) return false;

  return requiredRoles.includes(user.role);
}
}
