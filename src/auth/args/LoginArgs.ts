import { IsString, IsEmail, Validate } from 'class-validator';
import { PasswordFormat } from '../../validation/validationClasses/Password';

export class LoginArgs {
  @IsEmail()
  email: string;

  @IsString()
  @Validate(PasswordFormat)
  password: string;
}
