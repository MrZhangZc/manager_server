import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class OauthUser extends mongoose.Document {
  @Prop()
  account: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: string;

  @Prop({ default: '1.png' })
  avatar: string;

  @Prop()
  info: string;

  @Prop()
  from: string;
}

export const OauthUserSchema = SchemaFactory.createForClass(OauthUser);
