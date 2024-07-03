import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatsModule } from './stats/stats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    StatsModule,
    UsersModule,
    WorkoutsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './fat.db',
      synchronize: false,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: 'all'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
