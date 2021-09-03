import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop()
  content: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  date: string;

  @Prop()
  from: string;
}

export const ChatSecma = SchemaFactory.createForClass(Chat);
