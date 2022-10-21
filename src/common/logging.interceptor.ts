// Ref. https://github.com/algoan/nestjs-components/blob/master/packages/logging-interceptor/src/logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly ctxPrefix: string = LoggingInterceptor.name;
  private readonly logger: Logger = new Logger(this.ctxPrefix);
  private userPrefix = `${process.env.APP_NAME}`;

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
        error: (err: Error): void => {
          this.logError(err, context);
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
    const { ip, method, url, headers } = req;
    const { statusCode } = res;
    const ctx = `${this.userPrefix} - ${statusCode} - ${method} - ${url}`;
    const message = createMessage({
      ip: ip,
      statusCode: statusCode,
      request: url,
      referer: headers.referer,
      body: body,
    });

    this.logger.log({ message }, ctx);
  }

  /**
   * Logs the request response in success cases
   * @param error Error object
   * @param context details about the current request
   */
  private logError(error: Error, context: ExecutionContext): void {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const { ip, method, url, headers, body } = req;

    if (error instanceof HttpException) {
      const statusCode: number = error.getStatus();
      const ctx = `${this.userPrefix} - ${statusCode} - ${method} - ${url} - ${error}`;
      const message = createMessage({
        ip: ip,
        statusCode: statusCode,
        request: url,
        referer: headers.referer,
        body: body,
      });
      message.body = body;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error({ message }, ctx, error.stack);
      } else {
        this.logger.warn({ message }, ctx);
      }
    } else {
      this.logger.error(error, error.stack);
    }
  }
}

interface Message {
  time?: string;
  ip: string;
  statusCode: number;
  request: string;
  size?: number;
  referer: string;
  body?: any;
}

function createMessage(message: Message): Message {
  let size = 0;
  if (message.body) {
    size = Buffer.from(JSON.stringify(message.body)).length;
  }
  return {
    time: new Date().toISOString(),
    ip: message.ip,
    statusCode: message.statusCode,
    request: message.request,
    size: size,
    referer: message.referer,
  };
}
