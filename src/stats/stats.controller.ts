import { Controller, Get, Res } from '@nestjs/common';
import { StatsService } from '@app/stats/stats.service';
import { Response } from 'express';

@Controller('stats')
export class StatsController {

    constructor(private readonly statsService: StatsService) {}

    @Get()
    async getAll(@Res() res: Response) {
        res.setHeader('Content-Type', 'image/png');
        res.send(this.statsService.weekdays())
    }
}
