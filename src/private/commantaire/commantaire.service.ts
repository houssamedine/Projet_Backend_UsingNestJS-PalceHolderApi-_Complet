import { Injectable } from '@nestjs/common';
import { CreateCommantaireDto } from './dto/create-commantaire.dto';
import { UpdateCommantaireDto } from './dto/update-commantaire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commantaire } from './entities/commantaire.entity';
import { In, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';

@Injectable()
export class CommantaireService {
  constructor(
    @InjectRepository(Commantaire)
    private readonly repositoryCommantaire: Repository<Commantaire>,
  ) {}

  //Create Multi Commaintaire
  async createBulk(
    createCommantaireDto: CreateCommantaireDto[],
  ): Promise<Commantaire[]> {
    try {
      return await this.repositoryCommantaire.save(createCommantaireDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Create One Commaintaire
  async create(
    createCommantaireDto: CreateCommantaireDto,
  ): Promise<Commantaire> {
    try {
      return await this.repositoryCommantaire.save(createCommantaireDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Find All Commaintaires
  async findAll(): Promise<Commantaire[]> {
    try {
      return await this.repositoryCommantaire.find();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Find One Commaintaire
  async findOne(id: string): Promise<Commantaire> {
    try {
      return await this.repositoryCommantaire.findOne({ where: { id } });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Update One Commaintaire
  async update(
    id: string,
    updateCommantaireDto: UpdateCommantaireDto,
  ): Promise<Commantaire> {
    try {
      await this.findOne(id);
      const result = await this.repositoryCommantaire.update(
        id,
        updateCommantaireDto,
      );
      if (result.affected > 0) return await this.findOne(id);
      else throw new InternalServerErrorException();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Delete Multi Commaintaire
  async removeBulk(deleted: DeleteManyIdsDto): Promise<boolean> {
    try {
      const commId = await this.repositoryCommantaire.find({
        where: { id: In(deleted.ids) },
      });
      await this.repositoryCommantaire.softRemove(commId);
      return commId ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Delete One Commaintaire
  async remove(id: string): Promise<boolean> {
    try {
      const commId = await this.findOne(id);
      await this.repositoryCommantaire.softRemove(commId);
      return commId ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouver Multi Commaintaires
  async recoverBulk(deleted: DeleteManyIdsDto): Promise<Commantaire[]> {
    try {
      const commId = await this.repositoryCommantaire.find({
        where: { id: In(deleted.ids) },
        withDeleted: true,
      });
      await this.repositoryCommantaire.recover(commId);
      return commId;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouver One Commaintaire
  async recover(id: string): Promise<Commantaire> {
    try {
      const commId = await this.repositoryCommantaire.findOne({
        where: { id },
        withDeleted: true,
      });
      await this.repositoryCommantaire.recover(commId);
      return commId;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
