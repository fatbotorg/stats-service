import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('workouts')
export class Workout {

    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column()
    cancelled: number;

    @ApiProperty()
    @Column()
    userId: number;

    @ApiProperty()
    @Column()
    photoMessageId: number;

    @ApiProperty()
    @Column()
    groupId: number;

    @ApiProperty()
    @Column()
    flagged: number;

    @ApiProperty()
    @Column()
    streak: number;

    @ApiProperty()
    @Column()
    createdAt: Date;

    @ApiProperty()
    @Column()
    updatedAt: Date;

    @ApiProperty()
    @Column()
    deletedAt: Date;
}
