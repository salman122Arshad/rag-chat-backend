import { Transform } from 'class-transformer';
import { IsMongoId, IsOptional, IsPositive, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListMessagesDto {
  @ApiPropertyOptional({
    description: 'Cursor for pagination (last message _id)',
    type: String,
    example: '64dcb29b9c73356b3b2f6f90',
  })
  @IsOptional()
  @IsMongoId()
  after?: string;

  @ApiPropertyOptional({
    description: 'Max number of messages to return (1–200)',
    type: Number,
    example: 50,
    default: 50,
    minimum: 1,
    maximum: 200,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive()
  @Max(200)
  limit = 50;
}
