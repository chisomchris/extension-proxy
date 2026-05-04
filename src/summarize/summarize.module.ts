import { Module } from '@nestjs/common';
import { SummarizeService } from './summarize.service';
import { SummarizeController } from './summarize.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5,
      max: 15,
    }),
  ],
  controllers: [SummarizeController],
  providers: [SummarizeService],
})
export class SummarizeModule {}
