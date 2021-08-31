import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  private readonly uptime = new Date();

  getHealth(): { status: string; uptime: Date } {
    return { status: 'pass', uptime: this.uptime };
  }
}
