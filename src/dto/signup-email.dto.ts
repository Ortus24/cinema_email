import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
