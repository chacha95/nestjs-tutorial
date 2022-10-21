import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  WinstonLogger,
  WINSTON_MODULE_PROVIDER,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        console.log(request.body);
        console.log(response.body);
        // this.logger.warn({
        //   req: {
        //     url: request.url,
        //     method: request.method,
        //     referrer: request.referrer,
        //     header: request.headers,
        //   },
        //   res: {
        //     status: response.status,
        //     header: response.headers,
        //     body: response.body,
        //   },
        // });
      }),
    );
  }
}
