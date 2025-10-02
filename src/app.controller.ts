import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailDto } from './dto/send-email.dto';
import { Sign, sign } from 'crypto';
import { SignupEmailDto } from './dto/signup-email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('send_email')
  async handleSendEmail(@Payload() data: SendEmailDto) {
    return this.appService.sendEmail(data.to, data.subject, data.text);
  }

  @MessagePattern('signup_email')
  async handleSignupEmail(@Payload() signupEmail: SignupEmailDto) {
    return this.appService.sginupEmail(signupEmail.email, signupEmail.token);
  }
}
