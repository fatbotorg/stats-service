import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {

    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    lastWorkout: Date;

    @ApiProperty()
    @Column()
    chatId: number;

    @ApiProperty()
    @Column()
    telegramUserId: number;

    @ApiProperty()
    @Column()
    wasNotified: number;

    @ApiProperty()
    @Column()
    isActive: number;

    @ApiProperty()
    @Column()
    lastLastWorkout: Date;

    @ApiProperty()
    @Column()
    photoUpdate: Date;

    @ApiProperty()
    @Column()
    isAdmin: number;

    @ApiProperty()
    @Column()
    nickName: string;

    @ApiProperty()
    @Column()
    notificationCount: number;

    @ApiProperty()
    @Column()
    banCount: number;

    @ApiProperty()
    @Column()
    active: number;

    @ApiProperty()
    @Column()
    onProbation: number;

    @ApiProperty()
    @Column()
    immuned: number;

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
