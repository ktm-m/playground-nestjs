import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update.task.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { TaskInterceptor } from './interceptors/task.interceptor';
import { SearchTaskDto } from './dto/search-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TaskInterceptor)
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Request() { user }: any,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(
    @Request() { user }: any,
    @Query() searchTaskDto: SearchTaskDto,
  ): Promise<Task[]> {
    return this.taskService.getTasks(user, searchTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTaskById(
    @Param('id') id: string,
    @Request() { user }: any,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() { user }: any,
  ): Promise<Task> {
    return this.taskService.updateTaskById(id, updateTaskDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteTask(@Param('id') id: string, @Request() { user }: any): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }
}
