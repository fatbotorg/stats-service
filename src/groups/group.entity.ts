import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('groups')
export class Group {

    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column()
    chatId: number;

    @ApiProperty()
    @Column()
    approved: number;

    @ApiProperty()
    @Column()
    title: string;

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
