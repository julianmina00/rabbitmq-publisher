import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

function getMessageEnding(id?: string) {
  return id ? ` with ID eq ${id}` : '';
}

/**
 * NotFoundInterceptor is an interceptor that throws NotFoundException when response returned value eq null.
 *
 * @param {String} modelName A model name that will be mentioned in NotFoundException message
 * @param {String} messageOverride An override for a default message
 *
 * Interceptor can be used on a controller and method level.
 *
 *  @UseInterceptors(new NotFoundInterceptor('ModelName'))
 *  export class Controller {
 *    ...
 *  }
 *
 *
 *  export class Controller {
 *
 *   @Get(':id')
 *   @UseInterceptors(new NotFoundInterceptor('ModelName', 'Override Not Found Message'))
 *   async findOne() {
 *     ...
 *    }
 *  }
 */

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(
    private readonly modelName: string,
    private readonly messageOverride?: string
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((value) => {
        if (value === null) {
          const { params } = context.switchToHttp().getRequest<Request>();
          const id = params?.id;
          const message =
            this.messageOverride ??
            `Cannot find ${this.modelName}${getMessageEnding(id)}`;
          throw new NotFoundException({ message });
        }
      })
    );
  }
}
