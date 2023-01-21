import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Commantaire } from '../../commantaire/entities/commantaire.entity';
import { Status } from 'src/private/status/entities/status.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6, { message: 'title.minLength' })
  @MaxLength(30, { message: 'title.maxLength' })
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6, { message: 'description.minLength' })
  @MaxLength(30, { message: 'description.maxLength' })
  description: string;

  @ApiProperty({ type: () => User })
  @IsNotEmptyObject()
  user: User;

  @ApiProperty({ type: () => User, isArray: true })
  @IsArray()
  commant: Commantaire[];

  @ApiProperty({ type: () => Status, isArray: true })
  @IsArray()
  status: Status[];
}
