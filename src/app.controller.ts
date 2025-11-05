import { Controller, Get } from '@nestjs/common';
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
  async handleSendEmail(@Payload() data: SendEmailDto): Promise<{ success: boolean }> {
    await this.appService.sendEmail(data.to, data.subject, data.text);
    return { success: true };
  }

  @MessagePattern('signup_email')
  async handleSignupEmail(@Payload() data: SignupEmailDto): Promise<{ success: boolean }> {
    await this.appService.sendEmail(data.email, 'Signup', `Token: ${data.token}`);
    return { success: true };
  }
}