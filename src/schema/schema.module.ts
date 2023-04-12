import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Company, CompanySchema } from './schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:LnFP3lrheKGvM9jz@cluster0.yv2cr9r.mongodb.net/advintest?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemaModule {}
