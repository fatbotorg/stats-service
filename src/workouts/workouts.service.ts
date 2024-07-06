import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '@app/workouts/workout.entity';
import { User } from '@app/users/user.entity';
import { Group } from '@app/groups/group.entity';

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

    async getWorkoutsByGroups(period: number = 7) {
        return await this.workoutsRepository
            .createQueryBuilder('workout')
            .select('group.id', 'id')
            .addSelect('group.title', 'title')
            .addSelect('AVG(user_workout_count)', 'avg_workouts_per_user')
            .from(subQuery => {
                return subQuery
                    .select('workout.groupId', 'group_id')
                    .addSelect('COUNT(*)', 'user_workout_count')
                    .from(Workout, 'workout')
                    .where('workout.createdAt >= :startDate', { startDate: new Date(new Date().setDate(new Date().getDate() - period)) })
                    .groupBy('workout.groupId, workout.userId');
            }, 'user_workouts')
            .innerJoin(Group, 'group', 'user_workouts.group_id = group.id')
            .groupBy('group.id, group.title')
            .getRawMany();
    }
}
