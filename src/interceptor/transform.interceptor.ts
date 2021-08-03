import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
  code?: number;
  data?: T;
  msg?: string;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  public intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: any) => {
        if (data['state'] && data['msg']) {
          return {
            data: data['msg'],
            state: data['state'],
            msg: data['msg'],
          };
        } else {
          return {
            data,
            state: 200,
            msg: '请求成功',
          };
        }
      }),
    );
  }
}
