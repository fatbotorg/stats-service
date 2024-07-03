import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '@app/workouts/workout.entity';
import { User } from '@app/users/user.entity';

@Injectable()
export class WorkoutsService {
    constructor(@InjectRepository(Workout) private workoutsRepository: Repository<Workout>) {}

    async getAll(): Promise<Workout[]> {
        return await this.workoutsRepository.find();
    }

    async getWorkoutsByWeekday(groupId: number) {
        return await this.workoutsRepository
            .createQueryBuilder('workout')
            .select('strftime(\'%w\', workout.createdAt) AS weekday')
            .addSelect('COUNT(workout.id)', 'workoutsCount')
            .addSelect('user.id', 'userId')
            .addSelect('user.nickName', 'nickName')
            .addSelect('user.name', 'name')
            .where('workout.groupId = :groupId', { groupId })
            .andWhere('user.active = 1')
            .andWhere('workout.createdAt >= date(\'now\', \'-30 days\')')
            .innerJoin(User, 'user', 'user.id = workout.userId')
            .groupBy('userId, weekday')
            .getRawMany();
    }
}
