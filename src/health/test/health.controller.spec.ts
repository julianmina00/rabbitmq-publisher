import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { HealthController } from '../health.controller';
import { HealthService } from '../health.service';
import { LoggerService } from '@src/shared/services/logger.service';

describe('AppController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [HealthController],
      providers: [HealthService, LoggerService, ConfigService]
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "status: pass"', () => {
      const currentTime = new Date().getTime();
      expect(healthController.getHealth().status).toBe('pass');
      expect(healthController.getHealth().uptime.getTime()).toBeLessThanOrEqual(
        currentTime
      );
    });
  });
});
