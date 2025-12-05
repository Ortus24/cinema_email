import { Inject, Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

@Injectable()
export class AppService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'nhatnlhe186939@fpt.edu.vn',
      pass: 'tahjapoghwvglfzp',
    },
    // FIX LỖI TREO TRÊN RAILWAY:
    family: 4, // Ép dùng IPv4
    logger: true, // Log chi tiết
    debug: true, // Bật debug
    connectionTimeout: 10000, // Chờ tối đa 10s
  });

  async sendEmail(to: string, subject: string, html: string) {
    try {
      return this.transporter.sendMail({
        from: 'nhatnlhe186939@fpt.edu.vn',
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async signup(to: string, token: string) {
    const subject = 'Email Verification';
    const html = `<div
     style="max-width:600px;margin:30px auto;background:#000dff;padding:30px 40px;border-radius:15px;color:#f5f5f7;font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
                        <h1 style="font-size:2rem;text-align:center;color:#ffea00;text-shadow:2px 2px 8px rgba(0,0,0,0.5);">Welcome!</h1>
                        <p style="text-align:center;font-size:1.1rem;">Please verify your email address to complete the registration process.</p>
                        <div style="text-align:center;margin:30px 0;">
                          <a href="https://cinema-boking.vercel.app/auth/verify?token=${token}" style="background:#ffea00;color:#000dff;padding:15px 25px;border-radius:8px;text-decoration:none;font-weight:600;box-shadow:0 5px 15px rgba(255,234,0,0.4);transition:background 0.3s ease;">Verify Email</a>
                        </div>
                        <p style="text-align:center;color:#ffd700;font-style:italic;font-weight:600;">If you did not create an account, please ignore this email.</p>
                      </div>`;

    // console.log('Sending signup email to:', to);
    // console.log('Verification token:', token);
    // console.log('Email subject:', subject);
    // console.log('Email HTML content:', html);x`

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
