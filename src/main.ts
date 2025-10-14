import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = parseInt(process.env.PORT || '3000', 10);
  const rabbitUrl = process.env.RABBITMQ_URL;
  const queueName = process.env.QUEUE_NAME || 'send_email';

  if (!rabbitUrl) {
    logger.error('❌ Missing RABBITMQ_URL in environment variables');
    process.exit(1);
  }

  // Tạo microservice kết nối RabbitMQ
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrl],
      queue: 'send_email',
      queueOptions: { durable: true },
    },
  });

  app.listen().then(() => {
    logger.log(`✅ RabbitMQ microservice is listening on queue "${queueName}"`);
  });

  // Thêm HTTP endpoint để Render không kill app
  const httpApp = await NestFactory.create(AppModule);
  await httpApp.listen(port, '0.0.0.0');
  logger.log(`🚀 Health check HTTP server running on port ${port}`);
}

bootstrap();
