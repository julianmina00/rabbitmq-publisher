import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AllExceptionsFilter } from '../filters/all-exception.filter';
import { LoggerService } from '../services/logger.service';

const path = 'http://localhost:3000/test';

const mockAppLoggerService = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  setContext: jest.fn()
};
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus
}));

const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn(() => {
    return { url: path };
  })
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn()
};

describe('Exception validation service', () => {
  let service: AllExceptionsFilter;
  let timestamp: string;

  beforeEach(async () => {
    jest.clearAllMocks();
    const mockDate = new Date(1466424490000);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
    timestamp = new Date().toISOString();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: LoggerService,
          useValue: mockAppLoggerService
        }
      ]
    }).compile();

    service = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  describe('All exception filter tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('Http exception', () => {
      service.catch(
        new HttpException('Http exception', HttpStatus.BAD_REQUEST),
        mockArgumentsHost
      );
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        message: 'Http exception',
        path,
        statusCode: 400,
        timestamp
      });
    });
  });
});
