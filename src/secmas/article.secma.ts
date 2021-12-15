import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema()
export class Article extends mongoose.Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  imgurl: string;

  @Prop()
  slug: string;

  @Prop({ type: Array })
  tags: any;

  @Prop({ type: String, default: '文章描述' })
  desc: any;

  @Prop()
  abbreviation: string;

  @Prop()
  publishd: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop(
    raw({
      createdAt: { type: Date },
      updatedAt: { type: Date },
    }),
  )
  meta: any;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});
