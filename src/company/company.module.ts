import { Module } from '@nestjs/common';
import { CompanyController } from './company.resolver';
import { CompanyService } from './company.service';
import { SchemaModule } from '../schema/schema.module';

@Module({
  imports: [SchemaModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
