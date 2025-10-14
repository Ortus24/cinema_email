import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'BREVO_TRANSPORT',
      useFactory: () => {
        return nodemailer.createTransport({
          host: 'smtp-relay.brevo.com',
          port: 587,
          auth: {
            user: 'nhatlckbt007@gmail.com', // Ví dụ: nhatlckbt007@gmail.com
            pass: 'Qn6S9mcyZaJp27AM', // Lấy từ Brevo -> SMTP & API -> SMTP Key
          },
        });
      },
    },
  ],
})
export class AppModule {}
