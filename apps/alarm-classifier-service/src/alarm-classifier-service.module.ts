import { Module } from '@nestjs/common';
import { AlarmClassifierServiceController } from './alarm-classifier-service.controller';
import { AlarmClassifierServiceService } from './alarm-classifier-service.service';
import { TracingModule } from '@app/tracing';

@Module({
  imports: [TracingModule],
  controllers: [AlarmClassifierServiceController],
  providers: [AlarmClassifierServiceService],
})
export class AlarmClassifierServiceModule {}
