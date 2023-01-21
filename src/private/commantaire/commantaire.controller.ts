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
import { CommantaireService } from './commantaire.service';
import { CreateCommantaireDto } from './dto/create-commantaire.dto';
import { UpdateCommantaireDto } from './dto/update-commantaire.dto';
import { DeleteManyIdsDto } from '../../commun/generiques/delete-many-status-dto';
@ApiTags('Commantaire-API')
@Controller('commantaire')
export class CommantaireController {
  constructor(private readonly commantaireService: CommantaireService) {}

  //Create Multi commantaire
  @Post()
  createBulk(@Body() createCommantaireDto: CreateCommantaireDto[]) {
    try {
      return this.commantaireService.createBulk(createCommantaireDto);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Create one commantaire
  @Post('c-bulk')
  create(@Body() createCommantaireDto: CreateCommantaireDto) {
    try {
      return this.commantaireService.create(createCommantaireDto);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Find All commantaires
  @Get()
  findAll() {
    try {
      return this.commantaireService.findAll();
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Find one commantaire
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.commantaireService.findOne(id);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Update one commantaire
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommantaireDto: UpdateCommantaireDto,
  ) {
    try {
      return this.commantaireService.update(id, updateCommantaireDto);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Delete Multi commantaire
  @Delete(':c-bulk')
  removeBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.commantaireService.removeBulk(deleted);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Delete one commantaire
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.commantaireService.remove(id);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Recouver Multi Commanitaires
  @Post('c-bulk')
  @HttpCode(200)
  recoverBulk(@Body() deleted: DeleteManyIdsDto) {
    try {
      return this.commantaireService.recoverBulk(deleted);
    } catch (e) {
      return new HttpException('', 404);
    }
  }

  //Recouver One Commanitaire
  @Post(':id')
  @HttpCode(200)
  recover(@Param('id') id: string) {
    try {
      return this.commantaireService.recover(id);
    } catch (e) {
      return new HttpException('', 404);
    }
  }
}
