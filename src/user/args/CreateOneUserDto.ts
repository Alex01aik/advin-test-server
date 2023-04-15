import { IsString, IsEmail, Validate, IsMongoId } from 'class-validator';
import { UserRole } from '../../validation/validationClasses/UserRole';

export class CreateOneUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @Validate(UserRole)
  role: string;

  @IsMongoId()
  company?: string;
}
