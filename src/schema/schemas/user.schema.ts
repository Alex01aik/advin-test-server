import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  email: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  password: string;

  @Prop({ required: true })
  role: 'user' | 'company';
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
  email: 1,
});
