import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidationModule } from '../validation/validation.module';
import { SchemaModule } from '../schema/schema.module';
import { CreateOneUserDto } from './args/CreateOneUserDto';
import { FindOneUserByEmailDto } from './args/FindOneUserByEmailDto';
import { FindOneUserDto } from './args/FindOneUserDto';

@Module({
  imports: [ValidationModule, SchemaModule],
  controllers: [UserController],
  providers: [
    UserService,
    CreateOneUserDto,
    FindOneUserByEmailDto,
    FindOneUserDto,
  ],
  exports: [UserService],
})
export class UserModule {}
