import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  readonly to: string;

  @IsNotEmpty()
  readonly subject: string;

  @IsString()
  readonly text: string;
}
