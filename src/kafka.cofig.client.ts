import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export const kafkaConfigFactory = (configService: ConfigService) => ({
  name: 'KAFKA',
  transport: Transport.KAFKA,
  options: {
    subscribe: {
      fromBeginning: true,
    },
    client: {
      brokers: configService.get<string>('BROKERS').split(','),
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: configService.get<string>('SASL_USERNAME'),
        password: configService.get<string>('SASL_PASSWORD'),
      },
    },
  },
});
