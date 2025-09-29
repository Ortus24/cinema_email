import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // hoặc SMTP server bạn dùng
      auth: {
        user: 'nhatnlhe186939@fpt.edu.vn', // email thật
        pass: 'sxemtvxdnxgrvzuy', // app password
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    return this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  // async sendEmailPro(sendEmailDto: SendEmailDto) {
  //   const { to, subject, text } = sendEmailDto;

  //   const html = `<div style="max-width:600px;margin:30px auto;background:#000dff;padding:30px 40px;border-radius:15px;color:#f5f5f7;font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
  //                   <h1 style="font-size:2rem;text-align:center;color:#ffea00;text-shadow:2px 2px 8px rgba(0,0,0,0.5);">Welcome!</h1>
  //                   <p style="text-align:center;font-size:1.1rem;">Please verify your email address to complete the registration process.</p>
  //                   <div style="text-align:center;margin:30px 0;">
  //                     <a href="http://localhost:3001" style="background:#ffea00;color:#000dff;padding:15px 25px;border-radius:8px;text-decoration:none;font-weight:600;box-shadow:0 5px 15px rgba(255,234,0,0.4);transition:background 0.3s ease;">Verify Email</a>
  //                   </div>
  //                   <p style="text-align:center;color:#ffd700;font-style:italic;font-weight:600;">If you did not create an account, please ignore this email.</p>
  //                 </div>`;

  //   await this.mailer.sendMail({
  //     to,
  //     subject,
  //     text,
  //   });
  // }
}
