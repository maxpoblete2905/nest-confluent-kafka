import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      client: {
        brokers: ['pkc-03gz2.southamerica-west1.gcp.confluent.cloud:9092'],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: 'WPZRUFYHPNVTSO3Q',
          password:
            'kJR5RHJIOY8CdevLJTRH7iXc8LZqPf1bkYsrPD7A/z7ab/r3bIsxN5KWW26iHax2',
        },
      },
      consumer: {
        groupId: 'kafka-consumer',
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}

bootstrap();
