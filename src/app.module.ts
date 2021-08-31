import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    SharedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
