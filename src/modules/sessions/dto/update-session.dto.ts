import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionDto {
  @ApiProperty({
    description: 'Title of the session',
    maxLength: 120,
    example: 'Weekly AI Planning Meeting'
  })
  @IsString()
  @MaxLength(120)
  title: string;
}
