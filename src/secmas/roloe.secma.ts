import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop()
  name: string;

  @Prop()
  access: string;

  @Prop()
  desc: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
