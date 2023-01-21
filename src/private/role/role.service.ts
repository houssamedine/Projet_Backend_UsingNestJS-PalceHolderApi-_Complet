import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Role } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { In, Repository } from 'typeorm';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repositoryRole: Repository<Role>,
  ) {}

  //Create multi Roles
  async createBulk(createRoleDto: CreateRoleDto[]): Promise<Role[]> {
    try {
      return await this.repositoryRole.save(createRoleDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Create One Role
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      return await this.repositoryRole.save(createRoleDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Find All Role
  async findAll(): Promise<Role[]> {
    try {
      return await this.repositoryRole.find();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Find One Role
  async findOne(id: string): Promise<Role> {
    try {
      return await this.repositoryRole.findOne({ where: { id } });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Update One Role
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      await this.findOne(id);
      const resul = await this.repositoryRole.update(id, updateRoleDto);
      if (resul.affected > 0) return await this.findOne(id);
      else throw new InternalServerErrorException();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Delete Multipe Status
  async removeBulk(deleted: DeleteManyIdsDto): Promise<boolean> {
    try {
      //Remove
      const users = await this.repositoryRole.find({
        where: { id: In(deleted.ids) },
      });

      await this.repositoryRole.softRemove(users);
      return users.length > 0 ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Delete One Role
  async remove(id: string): Promise<boolean> {
    try {
      const roleId = await this.findOne(id);
      await this.repositoryRole.softRemove(roleId);
      return roleId ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouvrer multi Role
  async recoverBulk(deleted: DeleteManyIdsDto): Promise<Role[]> {
    try {
      const roleId = await this.repositoryRole.find({
        where: { id: In(deleted.ids) },
        withDeleted: true,
      });
      await this.repositoryRole.recover(roleId);
      return roleId;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouvrer One Role
  async recover(id: string): Promise<Role> {
    try {
      const roleId = await this.repositoryRole.findOne({
        where: { id },
        withDeleted: true,
      });
      await this.repositoryRole.recover(roleId);
      return roleId;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
