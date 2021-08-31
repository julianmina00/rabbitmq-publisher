import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { LoggerService } from '../services/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext(AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { url } = ctx.getRequest();
    const timestamp = new Date().toISOString();

    this.logger.error(
      JSON.stringify({
        error: exception,
        path: url,
        timestamp
      })
    );

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      (exception as any)?.response?.message ||
      (exception as any)?.message ||
      'Bad Request';

    response.status(status).json({
      statusCode: status,
      timestamp,
      path: url,
      message
    });
  }
}
