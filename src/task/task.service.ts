import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {Task} from "./task.entity";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {UpdateTaskDto} from "./dto/update.task.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource
    ) {
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;

        const taskRepository: Repository<Task> = this.dataSource.getRepository(Task);
        const task: Task = taskRepository.create({
            title,
            description
        });

        try {
            await taskRepository.save(task);
            return task;
        } catch (err: any) {
            throw new NotFoundException({
                message: [`[SERVICE] Failed to create task: ${err.message}`],
            });
        }
    }

    async getTasks(): Promise<Task[]> {
        const taskRepository: Repository<Task> = this.dataSource.getRepository(Task);

        try {
            return await taskRepository.find();
        } catch (err: any) {
            throw new ConflictException({
                message: [`[SERVICE] Failed to get tasks: ${err.message}`],
            });
        }
    }


    async getTaskById(id: string): Promise<Task> {
        const taskRepository: Repository<Task> = this.dataSource.getRepository(Task);

        try {
            return taskRepository.findOne({
                where: {id: id}
            });
        } catch (err: any) {
            throw new ConflictException({
                message: [`[SERVICE] Failed to get task by id: ${err.message}`],
            });
        }
    }

    async updateTaskById(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const taskRepository: Repository<Task> = this.dataSource.getRepository(Task);

        try {
            const task: Task = await this.getTaskById(id);
            const {title, description} = updateTaskDto;

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
                message: [`[SERVICE] Failed to update task by id: ${err.message}`],
            });
        }
    }

    async deleteTaskById(id: string): Promise<void> {
        const taskRepository: Repository<Task> = this.dataSource.getRepository(Task);

        try {
            await taskRepository.delete(id);
        } catch (err: any) {
            throw new ConflictException({
                message: [`[SERVICE] Failed to delete task by id: ${err.message}`],
            });
        }
    }
}
