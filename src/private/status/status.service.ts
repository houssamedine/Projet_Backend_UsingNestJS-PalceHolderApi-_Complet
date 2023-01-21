import { Status } from './entities/status.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { In, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private repositoryStatus: Repository<Status>,
  ) {}

  //Create Multiple Status
  async createButlk(createStatusDto: CreateStatusDto[]): Promise<Status[]> {
    try {
      const status = await this.repositoryStatus.save(createStatusDto);
      return status;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  //Create one Status
  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    try {
      const status = await this.repositoryStatus.save(createStatusDto);
      return status;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Get All Statuss
  async findAll(): Promise<Status[]> {
    try {
      return await this.repositoryStatus.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Get One Status
  async findOne(id: string): Promise<Status> {
    try {
      return await this.repositoryStatus.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Update Status
  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
    try {
      await this.findOne(id);
      const result = await this.repositoryStatus.update(id, updateStatusDto);
      if (result.affected > 0) return await this.findOne(id);
      else throw new InternalServerErrorException();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Delete Multipe Status
  async removeBulk(deleted: DeleteManyIdsDto): Promise<boolean> {
    try {
      //Remove
      const users = await this.repositoryStatus.find({
        where: { id: In(deleted.ids) },
      });

      await this.repositoryStatus.softRemove(users);
      return users.length > 0 ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Delete One Status
  async remove(id: string): Promise<boolean> {
    try {
      const statusId = await this.findOne(id);
      await this.repositoryStatus.softRemove(statusId);
      return statusId ? true : false;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Recouvrer Multipe Status
  async recoverBulk(deleted: DeleteManyIdsDto): Promise<Status[]> {
    try {
      const statusID = await this.repositoryStatus.find({
        where: { id: In(deleted.ids) },
        withDeleted: true,
      });
      await this.repositoryStatus.recover(statusID);
      return statusID;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouvrer One Status
  async recover(id: string): Promise<Status> {
    try {
      const statusID = await this.repositoryStatus.findOne({
        where: { id },
        withDeleted: true,
      });
      await this.repositoryStatus.recover(statusID);
      return statusID;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
