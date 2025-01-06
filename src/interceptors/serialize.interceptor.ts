import {
  CallHandler,
  ExecutionContext,
  // useInterceptors,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// this is a custom Decorator, that cane be used to return objects in a specific format, based on the DTO provided
export const Serialize = (dto: any) =>
  UseInterceptors(new SerializeInterceptor(dto));

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // intercept method is called before the request is handled by the route handler. It receives the ExecutionContext and CallHandler objects as parameters.
    // console.log(
    //   'I am running Interceptor - CONTEXT  before the handler ->',
    //   context,
    // );

    return handler.handle().pipe(
      // map is an operator from the rxjs library that allows us to transform the response data before it is sent back to the client. In this case, we are using the plainToClass method from the class-transformer library to transform the response data into the specified class instance.
      map((data: any) => {
        // map operator is used to transform the response data before it is sent back to the client. In this case, we are using the plainToClass method from the class-transformer library to transform the response data into the specified class instance.
        // console.log(
        //   'I am running Interceptor - DATA after the handler ->',
        //   data,
        // );
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

// lesion - 62
