import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiSecurity } from '@nestjs/swagger';

@Controller()
@ApiSecurity('api-key')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('/session')
  create(@Body() dto: CreateSessionDto) {
    return this.sessionsService.create(dto);
  }

  @Get('sessions')
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get('sessions/:id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch('sessions/:id/rename')
  rename(@Param('id') id: string, @Body() dto: UpdateSessionDto) {
    return this.sessionsService.updateTitle(id, dto);
  }

  @Patch('sessions/:id/favorite')
  favorite(@Param('id') id: string, @Query('value') value: string) {
    return this.sessionsService.toggleFavorite(id, value === 'true');
  }

  @Delete('sessions/:id')
  remove(@Param('id') id: string) {
    return this.sessionsService.delete(id);
  }
}
