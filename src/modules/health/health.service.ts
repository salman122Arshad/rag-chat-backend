import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class HealthService {
  constructor(@InjectConnection() private readonly conn: Connection) {}

  async check() {
    const mongoOk = this.conn.readyState === 1;
    return {
      status: mongoOk ? 'ok' : 'degraded',
      services: {
        mongo: mongoOk ? 'up' : 'down',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
