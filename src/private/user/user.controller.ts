import { JwtAuthGuard } from './../../commun/guards/jwt.groud';
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
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';

@ApiTags('User-API')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Create Multi Users
  @Post('u-bulk')
  createBulk(
    //@CurrentUser currentUser: string,
    @Body() createUserDto: CreateUserDto[],
  ) {
    try {
      return this.userService.createBulk(createUserDto);
      //console.log(currentUser);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Create One User
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Find All Users
  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Find User By Id
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //update One User
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Delete Multi User
  @Delete(':u-bulk')
  removeBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.userService.removeBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  //Delete One User By Id
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(id);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Recouver Multi Users
  @Post(':recover/u-bulk')
  @HttpCode(200)
  recoverBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.userService.recoverBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  //Recouver One User
  @Post(':id')
  @HttpCode(200)
  recover(@Param('id') id: string) {
    try {
      return this.userService.recover(id);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }
}
