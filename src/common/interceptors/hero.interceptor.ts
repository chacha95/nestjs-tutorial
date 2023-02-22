// Ref. https://github.com/algoan/nestjs-components/blob/master/packages/logging-interceptor/src/logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HeroInterceptor implements NestInterceptor {
  /**
   * Intercept method, logs before and after the request being processed
   * @param context details about the current request
   * @param call$ implements the handle method that returns an Observable
   */
  public intercept(
    context: ExecutionContext,
    call$: CallHandler,
  ): Observable<unknown> {
    return call$.handle().pipe(
      tap({
        next: (val: unknown): void => {
          this.logNext(val, context);
        },
      }),
    );
  }

  /**
   * Logs the request response in success cases
   * @param body body returned
   * @param context details about the current request
   */
  private logNext(body: unknown, context: ExecutionContext): void {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const res: Response = context.switchToHttp().getResponse<Response>();
    const { method, url } = req;
    const { statusCode } = res;

    if (200 <= statusCode && statusCode < 300) {
      const lastUrl = url.split('/').at(-1);
      if (lastUrl == 'users' && method == 'POST')
        console.log(`status code is ${statusCode}`);
    }
  }
}
