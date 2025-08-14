import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Message } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { GeminiService } from '../../common/services/geminiai.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private msgModel: Model<Message>,
    private readonly openai: GeminiService,
  ) {}

  async create(sessionId: string, dto: CreateMessageDto) {
    const sessionObjectId = new Types.ObjectId(sessionId);

    // Store user message
    const userMsg = await this.msgModel.create({
      sessionId: sessionObjectId,
      sender: dto.sender,
      content: dto.content,
      context: dto.context ?? null,
    });

    // Generate AI response
    const aiReplyText = await this.openai.generateResponse(dto.content);

    // Store AI message
    const aiMsg = await this.msgModel.create({
      sessionId: sessionObjectId,
      sender: 'assistant',
      content: aiReplyText,
    });

    return {
      user: userMsg,
      assistant: aiMsg,
    };
  }

  async list(sessionId: string, { after, limit }: { after?: string; limit: number }) {
    const query: FilterQuery<Message> = { sessionId: new Types.ObjectId(sessionId) };
    if (after) query._id = { $gt: new Types.ObjectId(after) };
    const items = await this.msgModel.find(query).sort({ _id: 1 }).limit(limit).lean();
    const nextCursor = items.length === limit ? String(items[items.length - 1]._id) : null;
    return { items, nextCursor };
  }

  async deleteBySession(sessionId: string) {
    await this.msgModel.deleteMany({ sessionId: new Types.ObjectId(sessionId) });
  }
}
