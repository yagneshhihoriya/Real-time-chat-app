import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({nullable:true})
  admin: Boolean;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  document: string;

  @Prop()
  contact: String

}

export const UserSchema = SchemaFactory.createForClass(User);
