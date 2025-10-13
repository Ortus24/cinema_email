import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import express from 'express';

async function bootstrap() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);

  const rabbitUrl = process.env.RABBITMQ_URL;
  const queueName = process.env.QUEUE_NAME || 'email_queue_v2';

  if (!rabbitUrl) {
    console.error('❌ Missing RABBITMQ_URL in environment variables');
    process.exit(1);
  }

  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrl],
      queue: 'send_email',
      queueOptions: { durable: false },
    },
  });

  await microservice.listen();

  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Email service running on port ${port}`);
  });
}

bootstrap();
