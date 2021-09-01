import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from '@src/shared/services/logger.service';

interface IMessage {
  type: string;
  payload: any;
}

@Injectable()
export class SenderService {
  private messsages = [] as IMessage[];
  private processing = false;
  private waiting = false;

  constructor(
    @Inject('rabbit-mq') private readonly client: ClientProxy,
    private readonly logger: LoggerService
  ) {
    logger.setContext(SenderService.name);
  }

  async send<T>(type: string, payload: T): Promise<void> {
    this.logger.debug(`Sending message [${type}: ${JSON.stringify(payload)}]`);
    this.messsages.push({ type, payload });
  }

  @Cron(CronExpression.EVERY_SECOND)
  async handleCron() {
    if (this.canSend()) {
      await this.internalSender();
    }
  }

  private canSend(): boolean {
    return this.messsages.length > 0 && !this.processing && !this.waiting;
  }

  private async internalSender() {
    this.processing = true;
    try {
      while (this.messsages.length > 0) {
        const message = this.messsages[0] as IMessage;
        await this.client
          .emit<void, any>(message.type, message.payload)
          .toPromise();
        this.messsages.splice(0, 1);
        this.logger.debug(
          `Message [${message.type}: ${JSON.stringify(
            message.payload
          )}] was sent`
        );
      }
    } catch (error) {
      this.logger.error(`error ${JSON.stringify(error)}`);
      this.wait();
    }
    this.processing = false;
  }

  wait() {
    this.waiting = true;
    setTimeout(() => {
      this.waiting = false;
    }, 5000);
  }
}
