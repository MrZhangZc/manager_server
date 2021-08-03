import * as dayjs from 'dayjs';

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  public catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const nowDate = dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss');
    const errorResponse = {
      state: status,
      msg: exception.message,
      data: {
        error: exception.name,
        date: nowDate,
        path: request.url,
      },
    };
    response.status(status).json(errorResponse);
  }
}
