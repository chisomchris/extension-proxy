import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SummarizeService } from './summarize.service';

export interface SummarizeRequest {
  text: string;
  bulletPoints?: number;
}

@Controller()
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Post('summarize')
  async summarize(@Body() body: SummarizeRequest) {
    if (!body.text) {
      throw new HttpException('Text is required', HttpStatus.BAD_REQUEST);
    }

    return this.summarizeService.getSummary(body.text, body.bulletPoints);
  }
}
