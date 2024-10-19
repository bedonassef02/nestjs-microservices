import { Module } from '@nestjs/common';
import { AlarmsServiceController } from './alarms-service.controller';
import { AlarmsServiceService } from './alarms-service.service';
import { ClientsModule } from '@nestjs/microservices';
import { TracingModule } from '@app/tracing';
import { NatsClientModule } from '@app/tracing/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule, TracingModule],
  controllers: [AlarmsServiceController],
  providers: [AlarmsServiceService],
})
export class AlarmsServiceModule {}
