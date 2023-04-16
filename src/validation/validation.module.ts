import { Module } from '@nestjs/common';
import { UserRole } from './validationClasses/UserRole';
import { PasswordFormat } from './validationClasses/Password';

@Module({
  providers: [UserRole, PasswordFormat],
  exports: [UserRole, PasswordFormat],
})
export class ValidationModule {}
