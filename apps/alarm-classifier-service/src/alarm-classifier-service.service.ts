import { TracingLogger } from '@app/tracing/tracing.logger';
import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class AlarmClassifierServiceService {
  constructor(private readonly logger: TracingLogger) {}
  @MessagePattern('alarm.classify')
  async classifyAlarm(@Payload() data: unknown) {
    this.logger.debug(`received alarm ${JSON.stringify(data)}`);

    return {
      category: ['critical', 'non-critical', 'invalid'][
        Math.floor(Math.random() * 3)
      ],
    };
  }
}
