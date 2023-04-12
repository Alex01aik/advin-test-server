import { Module } from '@nestjs/common';
import { UserRole } from './validationClasses/UserRole';

@Module({
  providers: [UserRole],
  exports: [UserRole],
})
export class ValidationModule {}
