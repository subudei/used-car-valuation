import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// This decorator is used to extract the current user object from the request object.
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.currentUser; // this is the user object that we set in the CurrentUserInterceptor
  },
);
