import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';
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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status-API')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  //Create Multiple Status
  @Post('s-bulk')
  createBulk(@Body() createStatusDto: CreateStatusDto[]) {
    try {
      const status = this.statusService.createButlk(createStatusDto);
      return status;
    } catch (error) {
      return new HttpException('', 404);
    }
  }
  //Create One Status
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    try {
      const status = this.statusService.create(createStatusDto);
      return status;
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Get All Status
  @Get()
  findAll() {
    try {
      return this.statusService.findAll();
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Get One Status By Id
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.statusService.findOne(id);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Update one Status
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    try {
      return this.statusService.update(id, updateStatusDto);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Delete Multi Status
  @Delete(':s-bulk')
  removeBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.statusService.removeBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  //Delete Status By Id
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.statusService.remove(id);
    } catch (error) {
      return new HttpException('', 404);
    }
  }

  //Recouvrer Multi Status
  @Post('recover/s-bulk')
  @HttpCode(200)
  recoverBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.statusService.recoverBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  //Recouvrer One Status
  @Post(':id')
  @HttpCode(200)
  recover(@Param('id') id: string) {
    try {
      return this.statusService.recover(id);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }
}
