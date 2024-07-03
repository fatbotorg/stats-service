import { Controller, Get, Query, Res } from '@nestjs/common';
import { StatsService } from '@app/stats/stats.service';
import { Response } from 'express';
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
        await this.statsService.getWorkoutsByWeekday(groupId)
        return {
            success: true,
            message: 'Workouts by weekday',
            error: null
        }
    }
}
