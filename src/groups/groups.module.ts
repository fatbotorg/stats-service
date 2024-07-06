import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@app/groups/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupsService]
})
export class GroupsModule {}
