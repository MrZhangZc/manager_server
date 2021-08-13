import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Blogsystemlog extends Document {
  @Prop()
  ip: string;

  @Prop()
  type: string;

  @Prop()
  article: string;

  @Prop()
  category: string;
}

export const BlogsystemlogSecma = SchemaFactory.createForClass(Blogsystemlog);
