import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidationModule } from '../validation/validation.module';
import { SchemaModule } from '../schema/schema.module';

@Module({
  imports: [ValidationModule, SchemaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
