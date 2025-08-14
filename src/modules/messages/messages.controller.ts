import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ListMessagesDto } from './dto/list-messages.dto';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('sessions/:sessionId')
@ApiSecurity('api-key')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/message')
  create(@Param('sessionId') sessionId: string, @Body() dto: CreateMessageDto) {
    return this.messagesService.create(sessionId, dto);
  }

  @Get('/messages')
  list(
    @Param('sessionId') sessionId: string,
    @Query() query: ListMessagesDto,
  ) {
    return this.messagesService.list(sessionId, { after: query.after, limit: query.limit });
  }
}
