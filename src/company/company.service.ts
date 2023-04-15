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
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createOne(args: CreateOneCompanyDto): Promise<CompanyDocument> {
    const user = await this.userModel.findById(args.userId);

    if (!user || user.role !== 'company') {
      throw new CustomException("Can't create company");
    }

    const createdCompany = new this.companyModel({
      name: args.name,
      doc: args.doc,
      user: args.userId,
    });
    await createdCompany.save();

    return createdCompany;
  }
}
