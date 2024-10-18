import { Controller, Get, Logger } from '@nestjs/common';
import { AlarmsServiceService } from './alarms-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsServiceController {
  private readonly logger = new Logger(AlarmsServiceController.name);

  constructor(private readonly alarmsServiceService: AlarmsServiceService) {}

  @EventPattern('alarm.created')
  create(@Payload() data: unknown) {
    this.logger.log(`received alarm ${JSON.stringify(data)}`);
  }
}
