import { Inject, Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nhatnlhe186939@fpt.edu.vn',
      pass: 'sxemtvxdnxgrvzuy',
    },
  });

  async sendEmail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: 'nhatnlhe186939@fpt.edu.vn',
      to,
      subject,
      html,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
