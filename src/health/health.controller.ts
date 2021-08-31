import { Controller, Get, UseFilters } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiServiceUnavailableResponse
} from '@nestjs/swagger';

import { HealthService } from './health.service';
import { LoggerService } from '@src/shared/services/logger.service';
import { AllExceptionsFilter } from '@src/shared/filters/all-exception.filter';

@ApiTags('App')
@Controller()
@UseFilters(AllExceptionsFilter)
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(HealthController.name);
  }

  @Get('/health')
  @ApiOperation({ summary: 'Health check status' })
  @ApiOkResponse({ description: 'Service available' })
  @ApiServiceUnavailableResponse({ description: 'Service Unavailable' })
  getHealth() {
    this.logger.debug('Healthcheck has being requested');
    return this.healthService.getHealth();
  }
}
