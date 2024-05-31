import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

export const createKafkaOptions = (
  configService: ConfigService,
): MicroserviceOptions => ({
  transport: Transport.KAFKA,
  options: {
    subscribe: {
      fromBeginning: true,
    },
    client: {
      brokers: configService.get<string>('BROKERS').split(','),
      ssl: true,
      sasl: {
        mechanism: configService.get<string>('SASL_MECHANISM') as any,
        username: configService.get<string>('SASL_USERNAME'),
        password: configService.get<string>('SASL_PASSWORD'),
      },
    },
    consumer: {
      groupId: configService.get<string>('GROUP_ID'),
    },
  },
});
