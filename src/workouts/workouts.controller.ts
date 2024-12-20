import { Controller, Get, Query } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { WorkoutsService } from '@app/workouts/workouts.service';
import { Workout } from '@app/workouts/workout.entity';

@Controller('workouts')
export class WorkoutsController {
    constructor(private readonly workoutService: WorkoutsService) {}

    @Get('/weekday')
    @ApiCreatedResponse({
        description: 'Get Workouts by weekday',
        type: [Workout]
    })
    async getWorkoutsByWeekday(@Query('group_id') groupId: number) {
        return await this.workoutService.getWorkoutsByWeekday(groupId)
    }

    @Get('/monthly')
    @ApiCreatedResponse({
        description: 'Get Workouts monthly',
        type: [Workout]
    })
    async getMonthlyWorkouts(@Query('group_id') groupId: number) {
        return await this.workoutService.getMonthlyWorkouts(groupId)
    }

    @Get('/avg-workouts-per-group')
    @ApiCreatedResponse({
        description: 'Get Avg workouts by groups',
        type: [Workout]
    })
    async getAvgWorkoutPerGroup(@Query('period') period: number,
                                @Query('group_id') groupId: number) {
        return await this.workoutService.getAvgWorkoutsByGroups(period, groupId)
    }
}
