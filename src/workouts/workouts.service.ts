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
            .select('user.id', 'userId')
            .addSelect('strftime(\'%w\', workout.createdAt) AS weekday')
            .addSelect('COUNT(workout.id)', 'rowCount')
            .addSelect('user.nickName', 'firstName')
            .where('workout.groupId = :groupId', { groupId })
            .andWhere('workout.createdAt >= date(\'now\', \'-30 days\')')
            .innerJoin(User, 'user', 'user.id = workout.userId')
            .groupBy('user.id, weekday')
            .getRawMany();
    }
}
