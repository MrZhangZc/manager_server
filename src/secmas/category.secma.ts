import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema()
export class Category extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  slug: number;

  @Prop()
  abbreviation: string;

  @Prop(raw({
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }))
  meta: any;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
