import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { WorkoutsService } from '@app/workouts/workouts.service';
import { Workout } from '@app/workouts/workout.entity';

@Controller('workouts')
export class WorkoutsController {
    constructor(private readonly workoutService: WorkoutsService) {}

    @Get()
    @ApiCreatedResponse({
        description: 'Get All Workouts',
        type: [Workout]
    })
    async getAll() {
        return await this.workoutService.getAll();
    }
}
