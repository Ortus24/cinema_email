import { DiscoveryService, MetadataScanner, NestFactory } from '@nestjs/core';
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

  // 🐇 Microservice RabbitMQ
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrl],
      queue: 'send_email',
      queueOptions: { durable: true },
    },
  });

  // 🔍 Liệt kê tất cả message handler
  const discovery = app.get(DiscoveryService);
  const metadataScanner = app.get(MetadataScanner);

  const controllers = discovery.getControllers();
  for (const wrapper of controllers) {
    const { instance } = wrapper;
    if (!instance) continue;

    const prototype = Object.getPrototypeOf(instance);
    metadataScanner.getAllMethodNames(prototype).forEach((methodName) => {
      const methodRef = instance[methodName];
      const metadataKeys = Reflect.getMetadataKeys(methodRef);
      if (metadataKeys.includes('pattern')) {
        const pattern = Reflect.getMetadata('pattern', methodRef);
        console.log(
          `🟢 Registered pattern: ${JSON.stringify(pattern)} in ${prototype.constructor.name}.${methodName}`,
        );
      }
    });
  }

  await app.listen();
  logger.log(`✅ RabbitMQ microservice is listening on queue "${queueName}"`);

  // 🌐 HTTP health check (Render yêu cầu)
  const httpApp = await NestFactory.create(AppModule);
  await httpApp.listen(port, '0.0.0.0');
  logger.log(`🚀 Health check HTTP server running on port ${port}`);
}

bootstrap();
