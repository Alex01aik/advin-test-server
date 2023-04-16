import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { SchemaModule } from '../schema/schema.module';

@Module({
  imports: [SchemaModule],
  providers: [CompanyService],
})
export class CompanyModule {}
