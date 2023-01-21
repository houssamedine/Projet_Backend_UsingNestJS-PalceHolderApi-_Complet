import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //Create Multi Users
  async createBulk(createUserDto: CreateUserDto[]): Promise<User[]> {
    try {
      let user: User[] = [];
      for (let i = 0; i < createUserDto.length - 1; i++) {
        Object.assign(user[i], createUserDto[i]);

        //generete salt
        user[i].salt = await this.generetSalt(10);

        //cryted pass with salt for the new password
        user[i].password = await this.hashPassword(
          user[i].salt,
          user[i].password,
        );
        user[i].isBlocked = false;
      }

      user = await this.userRepository.save(user);
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Create One User
  async create(createUserDto: CreateUserDto) {
    try {
      let user = new User();
      Object.assign(user, createUserDto);

      //generete salt
      user.salt = await this.generetSalt(10);

      //cryted pass with salt for the new password
      user.password = await this.hashPassword(user.salt, user.password);

      user.isBlocked = false;

      user = await this.userRepository.save(user);
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Find All Users
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Find One User By Id
  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Update One User
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.findOne(id);
      const result = await this.userRepository.update(id, updateUserDto);
      if (result.affected > 0) return await this.findOne(id);
      else throw new InternalServerErrorException();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Delete Multi User
  async removeBulk(deleted: DeleteManyIdsDto): Promise<boolean> {
    try {
      //Remove
      const users = await this.userRepository.find({
        where: { id: In(deleted.ids) },
      });

      await this.userRepository.softRemove(users);
      return users.length > 0 ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Delete One User By Id
  async remove(id: string): Promise<boolean> {
    try {
      const taskId = await this.findOne(id);
      await this.userRepository.softRemove(taskId);
      return taskId ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouver Multi User
  async recoverBulk(deleted: DeleteManyIdsDto): Promise<User[]> {
    try {
      let users = await this.userRepository.find({
        where: { id: In(deleted.ids) },
        withDeleted: true,
      });
      users = await this.userRepository.recover(users);
      return users;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouver One User
  async recover(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        withDeleted: true,
      });
      await this.userRepository.recover(user);
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  //Recouver One User
  async getUserFromQuery(filter: string): Promise<User> {
    try {
      const res = this.userRepository.createQueryBuilder('users');
      const user = await res
        .select('*')
        .where('users.username= :username or users.email= :email', {
          username: filter,
          email: filter,
        })
        .getRawOne();
      if (!user) throw new NotFoundException();
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  /************************ Crypt-Password ************************/
  //Méthod Generet Salt
  async generetSalt(saltRounds) {
    return await bcrypt.genSaltSync(saltRounds);
  }

  //Méthod hash Password
  async hashPassword(salt, plainPassword) {
    return await bcrypt.hashSync(plainPassword, salt);
  }

  //Méthod compare Password
  async comparePassword(plainPassword, cryptedPassword) {
    return await bcrypt.compareSync(plainPassword, cryptedPassword);
  }
  /************************ End Crypt-Password ************************/
}
