import { Module } from '@nestjs/common';
import { SenderController } from './sender.controller';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  RmqOptions,
  Transport
} from '@nestjs/microservices';
import { SenderService } from './sender.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [SenderController],
  providers: [
    {
      provide: 'rabbit-mq',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('rabbitConnectionUrl')],
            queue: configService.get<string>('rabbitQueueName'),
            noAck: false,
            persistent: true,
            queueOptions: {
              durable: true
            }
          }
        } as RmqOptions)
    },
    SenderService
  ],
  exports: [SenderService]
})
export class SenderModule {}
