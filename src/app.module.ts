import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { DiscoveryModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscoveryModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'BREVO_TRANSPORT',
      useFactory: () => {
        return nodemailer.createTransport({
          host: process.env.BREVO_HOST,
          port: Number(process.env.BREVO_PORT),
          secure: false,
          auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASS,
          },
        });
      },
    },
    AppService,
  ],
})
export class AppModule {}
