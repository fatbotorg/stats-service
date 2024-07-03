import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '@app/workouts/workout.entity';

@Injectable()
export class WorkoutsService {
    constructor(@InjectRepository(Workout) private workoutsRepository: Repository<Workout>) {}

    async getAll(): Promise<Workout[]> {
        return await this.workoutsRepository.find();
    }
}
