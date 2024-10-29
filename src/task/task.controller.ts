import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {TaskService} from "./task.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {Task} from "./task.entity";
import {UpdateTaskDto} from "./dto/update.task.dto";

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) {
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto)
    }

    @Get()
    getTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Get(":id")
    getTaskById(@Param("id") id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Patch("/update/:id")
    updateTask(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.updateTaskById(id, updateTaskDto);
    }

    @Delete(":id")
    @HttpCode(204)
    deleteTask(@Param("id") id: string): Promise<void> {
        return this.taskService.deleteTaskById(id);
    }
}
