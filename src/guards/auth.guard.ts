import {
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // :boolean | Promise<boolean> | Observable<boolean>
    const request = context.switchToHttp().getRequest();
    const user = request.session.userId;
    if (!user) {
      return new NotFoundException('User not found');
    }
    // return true;
    return user;
  }
}
