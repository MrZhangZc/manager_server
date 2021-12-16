import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Banner extends Document {
  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop()
  pic_path: string;

  @Prop()
  post_path: string;

  @Prop({ default: 0 })
  rank: number;
}

export const BannerSecma = SchemaFactory.createForClass(Banner);
