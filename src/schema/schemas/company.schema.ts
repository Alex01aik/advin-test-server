import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
