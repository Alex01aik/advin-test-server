import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ValidationModule } from '../validation/validation.module';
import { UserService } from '../user/user.service';
import { SchemaModule } from '../schema/schema.module';

@Module({
  imports: [UserModule, ValidationModule, SchemaModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
