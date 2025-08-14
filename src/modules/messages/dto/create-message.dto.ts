import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
    @ApiProperty({
        description: 'The role of the message sender',
        enum: ['user', 'assistant', 'system'],
        example: 'user'
    })
    @IsIn(['user', 'assistant', 'system'])
    sender: 'user' | 'assistant' | 'system';

    @ApiProperty({
        description: 'The text content of the message',
        minLength: 1,
        example: 'Hello, how can I help you today?'
    })
    @IsString()
    @MinLength(1)
    content: string;

    @ApiPropertyOptional({
        description: 'Optional context object containing extra metadata',
        type: 'object',
        additionalProperties: true,
        example: { topic: 'customer_support', priority: 'high' }
    })
    @IsOptional()
    context?: Record<string, any>;
}
