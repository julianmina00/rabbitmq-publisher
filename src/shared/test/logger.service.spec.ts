import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { Logger as WinstonLogger } from 'winston';

import { LoggerService } from '../services/logger.service';
import configuration from '@src/config/configuration';
import { LogLevels } from '@src/config/constants';

const context = 'this is the context';
const trace = 'this is the trace';

describe('LoggerService', () => {
  let logger: LoggerService;
  let innerLogger: WinstonLogger;

  beforeEach(async () => {
    process.env.LOGGER_LEVEL = LogLevels.DEBUG;
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        })
      ],
      providers: [LoggerService]
    }).compile();
    logger = module.get<LoggerService>(LoggerService);
    expect(logger).toBeDefined();
    logger.setContext('LoggerTesting');
    innerLogger = logger.innerLogger();
  });

  it('Logger should call error with no trace or context', () => {
    const spy = jest.spyOn(innerLogger, 'error');
    expect(logger.error).toBeTruthy();
    logger.error('Testing logger ERROR');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger ERROR', undefined);
  });

  it('Logger should call error with trace and context', () => {
    const spy = jest.spyOn(innerLogger, 'error');
    expect(logger.error).toBeTruthy();
    logger.error('Testing logger ERROR', trace, context);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger ERROR', {
      context,
      trace
    });
  });

  it('Logger should call warn with no context', () => {
    const spy = jest.spyOn(innerLogger, 'warn');
    expect(logger.warn).toBeTruthy();
    logger.warn('Testing logger WARN');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger WARN', undefined);
  });

  it('Logger should call warn with context', () => {
    const spy = jest.spyOn(innerLogger, 'warn');
    expect(logger.warn).toBeTruthy();
    logger.warn('Testing logger WARN', context);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger WARN', { context });
  });

  it('Logger should call info with no context', () => {
    const spy = jest.spyOn(innerLogger, 'info');
    expect(logger.info).toBeTruthy();
    logger.info('Testing logger INFO');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger INFO', undefined);
  });

  it('Logger should call info with context', () => {
    const spy = jest.spyOn(innerLogger, 'info');
    expect(logger.info).toBeTruthy();
    logger.info('Testing logger INFO', context);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger INFO', { context });
  });

  it('Logger should call debug with no context', () => {
    const spy = jest.spyOn(innerLogger, 'debug');
    expect(logger.debug).toBeTruthy();
    logger.debug('Testing logger DEBUG');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger DEBUG', undefined);
  });

  it('Logger should call debug with context', () => {
    const spy = jest.spyOn(innerLogger, 'debug');
    expect(logger.debug).toBeTruthy();
    logger.debug('Testing logger DEBUG', context);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger DEBUG', { context });
  });

  it('Logger should call verbose with no context', () => {
    const spy = jest.spyOn(innerLogger, 'verbose');
    expect(logger.verbose).toBeTruthy();
    logger.verbose('Testing logger VERBOSE');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger VERBOSE', undefined);
  });

  it('Logger should call verbose with context', () => {
    const spy = jest.spyOn(innerLogger, 'verbose');
    expect(logger.verbose).toBeTruthy();
    logger.verbose('Testing logger VERBOSE', context);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Testing logger VERBOSE', { context });
  });
});
