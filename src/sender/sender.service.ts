import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoggerService } from '@src/shared/services/logger.service';

@Injectable()
export class SenderService {
  constructor(
    @Inject('rabbit-mq') private readonly client: ClientProxy,
    private readonly logger: LoggerService
  ) {
    logger.setContext(SenderService.name);
  }

  async send<T>(type: string, payload: T): Promise<void> {
    this.logger.debug(
      `Sending message ${JSON.stringify(payload)} with type [${type}]`
    );
    await this.client.emit<void, T>(type, payload).toPromise();
  }
}