import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';
import { SenderController } from './sender/sender.controller';
import { SenderModule } from './sender/sender.module';

@Global()
@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    SharedModule,
    SenderModule
  ],
  controllers: [SenderController],
  providers: [], 
})
export class AppModule {}
