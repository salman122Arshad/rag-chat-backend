import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Allow if route is marked as @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // Otherwise require API key
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log("----------apiKeyapiKey-----------",apiKey)
    if (!apiKey || apiKey !== this.configService.get<string>('API_KEY')) {
      throw new UnauthorizedException('Invalid API Key');
    }
    return true;
  }
}