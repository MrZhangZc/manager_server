import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema()
export class Comment extends mongoose.Document {

  @Prop()
  content: string;

  @Prop()
  type: string;

  @Prop()
  email: number;

  @Prop(raw({
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }))
  meta: any;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
