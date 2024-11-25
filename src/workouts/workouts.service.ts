import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '@app/workouts/workout.entity';
import { User } from '@app/users/user.entity';
import { Group } from '@app/groups/group.entity';

@Injectable()
export class WorkoutsService {
    constructor(@InjectRepository(Workout) private workoutsRepository: Repository<Workout>) {}

    async getMonthlyWorkouts(groupId: number) {
        const now = new Date();
        const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
        
        return await this.workoutsRepository
            .createQueryBuilder('workout')
            .select('COUNT(workout.id)', 'workoutsCount')
            .addSelect('user.id', 'userId')
            .addSelect('user.nickName', 'nickName')
            .addSelect('user.name', 'name')
            .where('workout.groupId = :groupId', { groupId })
            .andWhere('user.active = 1')
            .andWhere('workout.createdAt >= :startOfMonth', { startOfMonth })
            .innerJoin(User, 'user', 'user.id = workout.userId')
            .groupBy('userId')
            .getRawMany();
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

    async getAvgWorkoutsByGroups(period: number = 7, groupId: number) {
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
                    .where('workout.groupId = :groupId', { groupId })
                    .andWhere('workout.createdAt >= :startDate', { startDate: new Date(new Date().setDate(new Date().getDate() - period)) })
                    .groupBy('workout.groupId, workout.userId');
            }, 'user_workouts')
            .innerJoin(Group, 'group', 'user_workouts.group_id = group.id')
            .groupBy('group.id, group.title')
            .getRawMany();
    }

    async getAvgWorkoutPerPerson(period: number = 7, groupId: number) {
        return await this.workoutsRepository
            .createQueryBuilder('workout')
            .select('workout.userId', 'userId')
            .addSelect('COUNT(workout.id)', 'averageWorkouts')
            .where('workout.groupId = :groupId', { groupId })
            .andWhere('workout.createdAt >= :startDate', { startDate: new Date(new Date().setDate(new Date().getDate() - period)) })
            .groupBy('workout.userId')
            .getRawMany();
    }
}
