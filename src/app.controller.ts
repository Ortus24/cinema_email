import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailDto } from './dto/send-email.dto';
import { SignupEmailDto } from './dto/signup-email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('send_email')
  async handleSendEmail(
    @Payload() data: SendEmailDto,
  ): Promise<{ success: boolean }> {
    console.log('Received email data:', data);
    await this.appService.sendEmail1(data.to, data.subject, data.text);
    return { success: true };
  }

  @MessagePattern('signup_email')
  async handleSignupEmail(
    @Payload() data: SignupEmailDto,
  ): Promise<{ success: boolean }> {
    await this.appService.signupByBrevo(data.email, data.token);
    return { success: true };
  }

  @Post('test')
  async sendTestMail(@Body() body: { email: string }) {
    const subject = 'Email Verification';
    const html = `<div
     style="max-width:600px;margin:30px auto;background:#000dff;padding:30px 40px;border-radius:15px;color:#f5f5f7;font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
                        <h1 style="font-size:2rem;text-align:center;color:#ffea00;text-shadow:2px 2px 8px rgba(0,0,0,0.5);">Welcome!</h1>
                        <p style="text-align:center;font-size:1.1rem;">Please verify your email address to complete the registration process.</p>
                        <div style="text-align:center;margin:30px 0;">
                          <a href="https://cinema-boking.vercel.app/auth/verify?token=213213213" style="background:#ffea00;color:#000dff;padding:15px 25px;border-radius:8px;text-decoration:none;font-weight:600;box-shadow:0 5px 15px rgba(255,234,0,0.4);transition:background 0.3s ease;">Verify Email</a>
                        </div>
                        <p style="text-align:center;color:#ffd700;font-style:italic;font-weight:600;">If you did not create an account, please ignore this email.</p>
                      </div>`;
    const result = await this.appService.sendEmail1(body.email, subject, html);

    return {
      success: result,
      message: result ? 'Gửi thành công' : 'Gửi thất bại',
    };
  }
}
