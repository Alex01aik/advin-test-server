import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FindOneUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
