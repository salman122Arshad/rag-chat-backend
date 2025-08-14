import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: string;

  constructor(private config: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      this.config.get<string>('GEMINI_API_KEY')!,
    );

    // Default to free-tier friendly model
    this.model = this.config.get<string>('GEMINI_MODEL', 'gemini-1.5-flash');
  }

  async generateResponse(prompt: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: this.model });

    const result = await model.generateContent(prompt);

    // Depending on SDK version, result.text() is the easiest way to get output
    return result.response?.text() || '';
  }
}
