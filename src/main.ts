import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createKafkaOptions } from './kafka.config.consumer.ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice(createKafkaOptions(configService));

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
