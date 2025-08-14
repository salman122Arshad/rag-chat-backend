import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiPropertyOptional({
    description: 'Title of the chat session (optional)',
    maxLength: 120,
    example: 'AI Assistant Brainstorm',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;
}
