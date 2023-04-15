import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ValidationModule } from '../validation/validation.module';
import { UserService } from '../user/user.service';
import { SchemaModule } from '../schema/schema.module';
import { CompanyService } from '../company/company.service';
import { CompanyModule } from '../company/company.module';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';

@Module({
  imports: [
    UserModule,
    ValidationModule,
    SchemaModule,
    CompanyModule,
    S3Module,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, CompanyService, S3Service],
})
export class AuthModule {}
