import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as express from 'express';

async function bootstrap() {
  // Khởi tạo microservice RabbitMQ
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'main_queue',
      queueOptions: { durable: true },
    },
  });
  await microservice.listen();
  console.log('🐇 Microservice is running and connected to RabbitMQ');

  // Tạo express app "fake" để Render thấy cổng hoạt động
  const app = express();
  const port = process.env.PORT || 3000;

  app.get('/', (_, res) => {
    res.send('✅ Microservice is running!');
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`🌐 Listening on port ${port}`);
