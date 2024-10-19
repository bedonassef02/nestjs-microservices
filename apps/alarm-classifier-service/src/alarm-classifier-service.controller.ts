import { Controller, Get } from '@nestjs/common';
import { AlarmClassifierServiceService } from './alarm-classifier-service.service';

@Controller()
export class AlarmClassifierServiceController {
  constructor(
    private readonly alarmClassifierServiceService: AlarmClassifierServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.alarmClassifierServiceService.getHello();
  }
}
