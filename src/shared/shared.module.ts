import { Global, Module } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exception.filter';

import { LoggerService } from './services/logger.service';

@Global()
@Module({
  imports: [],
  providers: [LoggerService, AllExceptionsFilter],
  exports: [LoggerService, AllExceptionsFilter]
})
export class SharedModule {}
