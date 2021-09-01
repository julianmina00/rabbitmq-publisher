import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AllExceptionsFilter } from '@src/shared/filters/all-exception.filter';
import { LoggerService } from '@src/shared/services/logger.service';
import { SenderService } from './sender.service';

@Controller('send')
@UseFilters(AllExceptionsFilter)
export class SenderController {
  constructor(
    private readonly sender: SenderService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(SenderController.name);
  }

  @Post('/message')
  @ApiOperation({ summary: 'Send messages to RabbitMQ' })
  @ApiOkResponse({ description: 'Service available' })
  async sendMessage(@Body() message: any) {
    try {
      return await this.sender.send('message', message);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
