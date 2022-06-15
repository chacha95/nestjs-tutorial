import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();
      // stack trace
      if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
        console.log('Internal Server Error', exception.stack);
      }
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}