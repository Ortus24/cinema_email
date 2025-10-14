import { Inject, Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { Resend } from 'resend';
import { Transporter } from 'nodemailer';

dotenv.config();

@Injectable()
export class AppService {
  // private transporter;

  private readonly resend: Resend;
  private readonly logger = new Logger(AppService.name);

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: 587,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    const mailOptions = {
      from: 'Cinema App <cinema@yourdomain.com>', // hoặc dùng cùng email đăng ký Brevo
      to: 'your@gmail.com',
      subject: '✅ Test Email from Brevo',
      text: 'Hello, this is a test email sent via Brevo SMTP + Nodemailer!',
    };

    transporter
      .sendMail(mailOptions)
      .then(() => console.log('✅ Email sent successfully'))
      .catch((err) => console.error('❌ Error:', err));
  }

  getHello(): string {
    return 'Hello World!';
  }

  // async sginupEmail(to: string, token: string) {
  //   const html = `<div style="max-width:600px;margin:30px auto;background:#000dff;padding:30px 40px;border-radius:15px;color:#f5f5f7;font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
  //                   <h1 style="font-size:2rem;text-align:center;color:#ffea00;text-shadow:2px 2px 8px rgba(0,0,0,0.5);">Welcome!</h1>
  //                   <p style="text-align:center;font-size:1.1rem;">Please verify your email address to complete the create user account.</p>
  //                   <div style="text-align:center;margin:30px 0;">
  //                     <a href="http://localhost:3001/signup-verify/${token}" style="background:#ffea00;color:#000dff;padding:15px 25px;border-radius:8px;text-decoration:none;font-weight:600;box-shadow:0 5px 15px rgba(255,234,0,0.4);transition:background 0.3s ease;">Verify Email</a>
  //                   </div>
  //                   <p style="text-align:center;color:#ffd700;font-style:italic;font-weight:600;">If you did not create an account, please ignore this email.</p>
  //                 </div>`;

  //   const subject = 'Verify your email address';

  //   const text = `Please verify your email address to complete the create user account. If you did not create an account, please ignore this email.`;

  //   return this.transporter.sendMail({
  //     from: process.env.EMAIL_USER,
  //     to,
  //     subject,
  //     html,
  //     text,
  //   });
  // }
}
