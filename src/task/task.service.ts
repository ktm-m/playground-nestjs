import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { UpdateTaskDto } from './dto/update.task.dto';
import { User } from '../user/user.entity';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const taskRepository: Repository<Task> =
      this.dataSource.getRepository(Task);
    const task: Task = taskRepository.create({
      title,
      description,
      user,
    });

    try {
      await taskRepository.save(task);
      return task;
    } catch (err: any) {
      throw new NotFoundException({
        message: [`Failed to create task: ${err.message}`],
      });
    }
  }

  async getTasks(user: User, searchTaskDto: SearchTaskDto): Promise<Task[]> {
    const taskRepository: Repository<Task> =
      this.dataSource.getRepository(Task);
    const { search } = searchTaskDto;
    try {
      const query: SelectQueryBuilder<Task> =
        taskRepository.createQueryBuilder('task');
      query.where({ user: user });

      if (search) {
        query.andWhere(
          '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
          {
            search: `%${search}%`,
          },
        );
      }

      return await query.getMany();
    } catch (err: any) {
      throw new ConflictException({
        message: [`Failed to get tasks: ${err.message}`],
      });
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const taskRepository: Repository<Task> =
      this.dataSource.getRepository(Task);
    try {
      return taskRepository.findOne({
        where: { id: id, user: user },
      });
    } catch (err: any) {
      throw new ConflictException({
        message: [`Failed to get task by id: ${err.message}`],
      });
    }
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const taskRepository: Repository<Task> =
      this.dataSource.getRepository(Task);
    try {
      const task: Task = await this.getTaskById(id, user);
      const { title, description } = updateTaskDto;

      if (title) {
        task.title = title;
      }

      if (description) {
        task.description = description;
      }

      await taskRepository.save(task);
      return task;
    } catch (err: any) {
      throw new ConflictException({
        message: [`Failed to update task by id: ${err.message}`],
      });
    }
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const taskRepository: Repository<Task> =
      this.dataSource.getRepository(Task);
    try {
      await taskRepository.delete({ id: id, user: user });
    } catch (err: any) {
      throw new ConflictException({
        message: [`Failed to delete task by id: ${err.message}`],
      });
    }
  }
}
