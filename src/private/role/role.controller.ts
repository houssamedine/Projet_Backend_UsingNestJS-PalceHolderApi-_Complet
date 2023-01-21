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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';

@ApiTags('Role-API')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  //Create Multi Roles
  @Post('r-bulk')
  createBulk(@Body() createRoleDto: CreateRoleDto[]) {
    try {
      return this.roleService.createBulk(createRoleDto);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Create One Role
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return this.roleService.create(createRoleDto);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Find All Role
  @Get()
  findAll() {
    try {
      return this.roleService.findAll();
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Find One Role
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.roleService.findOne(id);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Update One Role
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return this.roleService.update(id, updateRoleDto);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Delete Multi Roles
  @Delete(':r-bulk')
  removeBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.roleService.removeBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  //Delete One Role
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.roleService.remove(id);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Recouvrer Multi Roles
  @Post('recover/r-bulk')
  @HttpCode(200)
  recoverBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.roleService.recoverBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  //Recouvrer One Role
  @Post(':id')
  @HttpCode(200)
  recover(@Param('id') id: string) {
    try {
      return this.roleService.recover(id);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }
}
