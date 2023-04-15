import { Validate } from 'class-validator';
import { LoginArgs } from './LoginArgs';
import { UserRole } from '../../validation/validationClasses/UserRole';

export class RegisterArgs extends LoginArgs {
  @Validate(UserRole)
  role: string;

  name?: string;
}
