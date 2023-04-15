import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [AuthModule, UserModule, CompanyModule, S3Module],
})
export class AppModule {}
