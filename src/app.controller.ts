import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA')
    private readonly kafka: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('message.create')
  messageCreate(@Payload() payload: any) {
    Logger.log(payload);
  }

  @Post('/send')
  sendMessage(@Body('message') message: string, @Body('user') user: string) {
    return this.kafka.emit('message.create', {
      message,
      user,
    });
  }
}
