import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schema/schemas/company.schema';
import { User } from '../schema/schemas/user.schema';
import { CreateOneCompanyDto } from './args/CreateOneCompany';
import { CustomException } from '../common/CustomException';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async createOne(args: CreateOneCompanyDto): Promise<CompanyDocument> {
    const createdCompany = new this.companyModel({
      name: args.name,
      doc: args.doc,
    });
    await createdCompany.save();

    return createdCompany;
  }
}
