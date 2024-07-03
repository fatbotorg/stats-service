import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';

@Module({
  providers: [WorkoutsService]
})
export class WorkoutsModule {}
