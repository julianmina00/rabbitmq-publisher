import { Body, Controller, Param, Post, UseFilters } from '@nestjs/common';
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

  @Post('/:type')
  @ApiOperation({ summary: 'Send messages to RabbitMQ' })
  @ApiOkResponse({ description: 'Service available' })
  async sendMessage(@Param('type') type: string, @Body() message: any) {
    this.logger.debug(`Send message of type: ${type}. Message: ${JSON.stringify(message)}`);
    try {      
      return await this.sender.send(type, message);
    } catch (error) {
      this.logger.error(error);
    }
  }
}

