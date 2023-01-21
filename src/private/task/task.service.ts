import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { In, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repositoryTask: Repository<Task>,
  ) {}
  //Create Multi Tasks
  async createBulk(createTaskDto: CreateTaskDto[]): Promise<Task[]> {
    try {
      return await this.repositoryTask.save(createTaskDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Create One Task
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.repositoryTask.save(createTaskDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Find All Tasks
  async findAll(): Promise<Task[]> {
    try {
      return await this.repositoryTask.find();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Find One Task
  async findOne(id: string): Promise<Task> {
    try {
      return await this.repositoryTask.findOne({ where: { id } });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Update One Task
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      await this.findOne(id);
      const result = await this.repositoryTask.update(id, updateTaskDto);
      if (result.affected > 0) return await this.findOne(id);
      else throw new InternalServerErrorException();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Delete Multi Task
  async removeBulk(deleted: DeleteManyIdsDto): Promise<boolean> {
    try {
      const users = await this.repositoryTask.find({
        where: { id: In(deleted.ids) },
      });
      await this.repositoryTask.softRemove(users);
      return users.length > 0 ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }
  //Delete One Task
  async remove(id: string): Promise<boolean> {
    try {
      const userId = await this.findOne(id);
      await this.repositoryTask.remove(userId);
      return userId ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouvrer Multipe Tasks
  async recoverBulk(deleted: DeleteManyIdsDto): Promise<Task[]> {
    try {
      const taskId = await this.repositoryTask.find({
        where: { id: In(deleted.ids) },
        withDeleted: true,
      });
      await this.repositoryTask.recover(taskId);
      return taskId;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouvrer One Task
  async recover(id: string): Promise<Task> {
    try {
      const taskId = await this.repositoryTask.findOne({
        where: { id },
        withDeleted: true,
      });
      await this.repositoryTask.recover(taskId);
      return taskId;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
