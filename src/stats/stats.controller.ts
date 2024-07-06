import { Controller, Get, Query, Res } from '@nestjs/common';
import { StatsService } from '@app/stats/stats.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Workout } from '@app/workouts/workout.entity';

@Controller('stats')
export class StatsController {

    constructor(private readonly statsService: StatsService) {}

    @Get('/weekday')
    @ApiCreatedResponse({
        description: 'Get Workouts by weekday'
    })
    async getWorkoutsByWeekday(@Query('group_id') groupId: number) {
        try {
            await this.statsService.getWorkoutsByWeekday(groupId)
            return {
                success: true,
                message: 'Workouts by weekday',
                error: null
            }
        }
        catch (e) {
            return {
                success: false,
                message: 'Error getting workouts by weekday',
                error: e
            }
        }
    }


    @Get('/avg-workouts-per-group')
    @ApiCreatedResponse({
        description: 'Get Avg workouts by groups',
        type: [Workout]
    })
    async getAvgWorkoutPerGroup(@Query('period') period: number) {
        try {
            await this.statsService.getAvgWorkoutsPerGroup(period)
            return {
                success: true,
                message: 'AVG Workouts by groups',
                error: null
            }
        }
        catch (e) {
            return {
                success: false,
                message: 'Error getting workouts by groups',
                error: e
            }
        }
    }
}
