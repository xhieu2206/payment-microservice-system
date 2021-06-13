import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://pmhdtbdy:ROUFcuWj4GH-jFrxsqtrxf6jgpUlB2ld@snake.rmq2.cloudamqp.com/pmhdtbdy',
      ],
      queue: 'payment_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.listen(() => {
    console.log('Microservice is listening');
  });
}

bootstrap().then(() => console.log('Running'));
