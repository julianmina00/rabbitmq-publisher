import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Logger as WinstonLogger,
  transports,
  createLogger,
  format
} from 'winston';
import { Environments } from '@src/config/constants';

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: WinstonLogger;

  constructor(private readonly configService: ConfigService) {
    super();
    const metadata = { service: this.configService.get<string>('serviceName') };
    this.logger = createLogger({
      level: this.configService.get<string>('loggerLevel'),
      format: this.format(),
      defaultMeta: metadata,
      transports: [new transports.Console()]
    });
  }

  private readonly format = () => {
    const env = this.configService.get('ENV');
    return env === Environments.PROD ? this.prodFormat() : this.developFormat();
  };

  private prodFormat() {
    return format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    );
  }

  private developFormat() {
    const logFormat = format.printf(
      ({ level, message, timestamp, stack }) =>
        `${timestamp} ${level} [${this.context}] ${stack || message}`
    );
    return format.combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: true }),
      logFormat
    );
  }

  private metadata(context?: string, trace?: string): any {
    if (!context && !trace) {
      return undefined;
    }

    let meta = {};
    if (context) {
      meta = { context };
    }
    if (trace) {
      meta = { ...meta, trace };
    }
    return meta;
  }

  log(message: string, context?: string) {
    this.info(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, this.metadata(context, trace));
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, this.metadata(context));
  }

  info(message: string, context?: string) {
    this.logger.info(message, this.metadata(context));
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, this.metadata(context));
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, this.metadata(context));
  }

  innerLogger(): WinstonLogger {
    return this.logger;
  }
}
