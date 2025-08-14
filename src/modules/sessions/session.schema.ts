import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  isFavorite: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
