import { Controller, Get, Logger } from '@nestjs/common';
import { AlarmsServiceService } from './alarms-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TracingLogger } from '@app/tracing/tracing.logger';
import { NatsClientProxy } from '@app/tracing/nats-client/nats-client.proxy';

@Controller()
export class AlarmsServiceController {
  // private readonly logger = new Logger(AlarmsServiceController.name);s

  constructor(
    private readonly alarmsServiceService: AlarmsServiceService,
    private readonly logger: TracingLogger,
    private readonly natsMessageBroker: NatsClientProxy,
  ) {}

  @EventPattern('alarm.created')
  create(@Payload() data: unknown) {
    this.logger.log(`received alarm ${JSON.stringify(data)}`);
  }
}
