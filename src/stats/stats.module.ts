import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { WorkoutsModule } from '@app/workouts/workouts.module';

@Module({
  imports: [WorkoutsModule],
  providers: [StatsService],
  controllers: [StatsController]
})
export class StatsModule {}
