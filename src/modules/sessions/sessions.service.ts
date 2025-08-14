import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session } from './session.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Message } from '../messages/message.schema';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(Message.name) private msgModel: Model<Message>,
  ) {}

  async create(dto: CreateSessionDto) {
    return this.sessionModel.create({ title: dto.title || 'New Session' });
  }

  async findAll() {
    return this.sessionModel.find({ deletedAt: null }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const session = await this.sessionModel.findById(id).exec();
    if (!session || session.deletedAt) throw new NotFoundException('Session not found');
    return session;
  }

  async updateTitle(id: string, dto: UpdateSessionDto) {
    const updated = await this.sessionModel.findByIdAndUpdate(
      id,
      { title: dto.title },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Session not found');
    return updated;
  }

  async toggleFavorite(id: string, isFavorite: boolean) {
    const updated = await this.sessionModel.findByIdAndUpdate(
      id,
      { isFavorite },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Session not found');
    return updated;
  }

  async delete(id: string) {
    // Soft delete session
    const deleted = await this.sessionModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
    if (!deleted) throw new NotFoundException('Session not found');

    // Hard-delete messages for this session
    await this.msgModel.deleteMany({ sessionId: new Types.ObjectId(id) });
    return { ok: true, session: deleted };
  }
}
