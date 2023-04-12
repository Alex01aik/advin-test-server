import { IsEmail } from 'class-validator';

export class FindOneUserByEmailDto {
  @IsEmail()
  email: string;
}
