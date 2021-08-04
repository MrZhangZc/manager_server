import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Comment extends mongoose.Document {
  @Prop()
  content: string;

  @Prop()
  email: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
