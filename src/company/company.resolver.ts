import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDocument } from '../schema/schemas/company.schema';
import { CreateOneCompanyDto } from './args/CreateOneCompany';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('createOne')
  async createOne(@Body() args: CreateOneCompanyDto): Promise<CompanyDocument> {
    return this.companyService.createOne(args);
  }
}
