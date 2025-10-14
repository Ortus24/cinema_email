import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
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
  ],
  exports: ['BREVO_TRANSPORT'],
})
export class AppModule {}
