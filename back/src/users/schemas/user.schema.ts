import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: "" })
  picture_extension: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop({ default: "" })
  description: string;

  @Prop()
  gender: string;

  @Prop()
  birthdate: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop({ default: 0 })
  admin: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
