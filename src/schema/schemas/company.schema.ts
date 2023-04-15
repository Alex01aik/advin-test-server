import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company extends mongoose.Document {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  doc: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date;

  // @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // user: User;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
