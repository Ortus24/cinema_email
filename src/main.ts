import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'email_queue',
      queueOptions: { durable: false },
    },
  });
  await app.listen();

  console.log('🚀 Microservice is running and connected to RabbitMQ');
}
bootstrap();
