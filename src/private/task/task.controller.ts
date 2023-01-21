import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';

@ApiTags('Task-API')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //Create Multi Tasks
  @Post('t-bulk')
  createBulk(@Body() createTaskDto: CreateTaskDto[]) {
    try {
      return this.taskService.createBulk(createTaskDto);
    } catch (error) {
      return new HttpException('', 404);
    }
  }
  //Create Task
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return this.taskService.create(createTaskDto);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  @Get()
  findAll() {
    try {
      return this.taskService.findAll();
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.taskService.findOne(id);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return this.taskService.update(id, updateTaskDto);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Delete Multi Tasks
  @Delete('t-bulk')
  removeBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.taskService.removeBulk(deleted);
    } catch (e) {
      return new HttpException('', 404);
    }
  }
  //Delete one Task
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.taskService.remove(id);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Recouvrer Multi Task
  @Post('recover/t-bulk')
  @HttpCode(200)
  recoverBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.taskService.recoverBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  //Recouvrer one Task
  @Post(':id')
  @HttpCode(200)
  recover(@Param('id') id: string) {
    try {
      return this.taskService.recover(id);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }
}
