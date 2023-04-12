import { IsString, IsEmail } from 'class-validator';

export class LoginArgs {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
