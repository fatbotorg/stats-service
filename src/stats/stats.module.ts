import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';

@Module({
  imports: [],
  providers: [StatsService],
  controllers: [StatsController]
})
export class StatsModule {}
