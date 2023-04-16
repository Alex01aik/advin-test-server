import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { SchemaModule } from '../schema/schema.module';
import { CreateOneCompanyDto } from './args/CreateOneCompany';

@Module({
  imports: [SchemaModule],
  providers: [CompanyService, CreateOneCompanyDto],
})
export class CompanyModule {}
