import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.headers['role'];

    return userRole === 'admin';
  }
}
