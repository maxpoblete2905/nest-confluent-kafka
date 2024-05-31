import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
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
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
