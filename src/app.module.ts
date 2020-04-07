import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(TypeOrmConfig)],
})
export class AppModule {}
