import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { kafkaConfigFactory } from './kafka.cofig.client'; // Importa la fábrica de configuraciones de Kafka

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: kafkaConfigFactory as any,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
