import { NestFactory } from '@nestjs/core';
import { AlarmClassifierServiceModule } from './alarm-classifier-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AlarmClassifierServiceModule);
  await app.listen(3000);
}
bootstrap();
