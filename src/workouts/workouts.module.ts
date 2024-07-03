import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from '@app/workouts/workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  providers: [WorkoutsService],
  controllers: [WorkoutsController]
})
export class WorkoutsModule {}
