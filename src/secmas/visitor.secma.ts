import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Visitor extends mongoose.Document {
  @Prop()
  ip: string;

  @Prop({ default: '未知' })
  province: string;

  @Prop({ default: '未知' })
  city: string;

  @Prop()
  adcoce: string;

  @Prop()
  agent: string;

  @Prop(raw({
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }))
  meta: any;
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
