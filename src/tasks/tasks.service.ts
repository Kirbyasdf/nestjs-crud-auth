import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOne(id);
    if (!foundTask) {
      throw new NotFoundException(`Task with id: ${id} NOT FOUND`);
    }
    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const foundTask = await this.getTaskById(id);
    foundTask.status = status;
    await foundTask.save();
    return foundTask;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} NOT FOUND`);
    }
  }
}

// private tasks: Task[] = []; //if not made private any other component can adjust
// getAllTasks(): Task[] {
//   return this.tasks;
// }

// getTaskById(id: string): Task {
//   const foundTask = this.tasks.find(task => task.id === id);
//   if (!foundTask) {
//     throw new NotFoundException(`Task with id: ${id} NOT FOUND`);
//   } else return foundTask;
// }
// getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
//   const { status, search } = filterDto;
//   let tasks = this.getAllTasks();
//   if (status) {
//     tasks = tasks.filter(t => t.status === status);
//   }
//   if (search) {
//     tasks = tasks.filter(
//       t => t.title.includes(search) || t.description.includes(search),
//     );
//   }
//   return tasks;
// }
// createTask(CreateTaskDto: CreateTaskDto): Task {
//   const { title, description } = CreateTaskDto;
//   const task: Task = {
//     id: uuidv1(),
//     title,
//     description,
//     status: TaskStatus.OPEN,
//   };
//   this.tasks.push(task);
//   return task;
// }
// updateTaskStatus(id: string, status: TaskStatus): Task {
//   const task = this.getTaskById(id); //holds refernce + runs valdations via getTaskById
//   task.status = status;
//   return task;
// }
// deleteTask(id: string): void {
//   const foundTask = this.getTaskById(id); //runs valdations via getTaskById
//   this.tasks = this.tasks.filter(task => task.id !== id);
// }
