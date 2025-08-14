import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Session', index: true, required: true })
  sessionId: Types.ObjectId;

  @Prop({ enum: ['user', 'assistant', 'system'], required: true })
  sender: 'user' | 'assistant' | 'system';

  @Prop({ required: true })
  content: string;

  @Prop({ type: Object, default: null })
  context: Record<string, any> | null;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.index({ sessionId: 1, _id: 1 });
MessageSchema.index({ sessionId: 1, createdAt: 1 });
