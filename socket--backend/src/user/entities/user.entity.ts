import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  @IsString()
  name: string;

  @Prop({ nullable: true })
  @IsString()
  admin: boolean;

  @Prop()
  @IsString()
  password: string;

  @Prop()
  @IsString()
  email: string;

  @Prop()
  @IsString()
  document: string;

  @Prop()
  @IsString()
  contact: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
